from flask import (
    Blueprint,
    render_template,
    current_app,
    request,
    redirect,
    send_from_directory,
    Response,
)
import os, subprocess, trimesh
import trimesh.viewer
import html
from .models import MeshSettings, MeshForm
from pydantic import ValidationError
from PIL import Image


base = Blueprint("base", __name__)


def get_files_path(app=current_app):
    return app.config["FILES_PATH"]


@base.route("/uploads/<filename>")
def get_file(filename):
    return send_from_directory(get_files_path(), filename)


@base.route("/download/<filename>")
def download_file(filename):
    return send_from_directory(get_files_path(), filename, as_attachment=True)


def get_full_filepath(filename):
    filepath = os.path.join(get_files_path(), filename)
    return filepath


def change_extension(filepath, new_extension):
    base = os.path.splitext(filepath)[0]
    return f"{base}.{new_extension}"


@base.post("/upload")
def upload_file():
    file = request.files["heightmap"]
    current_app.config["HEIGHTMAP_FILE"] = file.filename

    filepath = get_full_filepath(file.filename)
    if not os.path.exists(filepath):
        file.save(filepath)

    with Image.open(file) as image:
        current_app.config["HEIGHTMAP_SIZE"] = image.size

    return render_template("result_heightmap.html", filename=file.filename)


@base.app_template_global()
def ready_to_create_mesh():
    ready = False
    if current_app.config["HEIGHTMAP_FILE"]:
        ready = True
    return ready


def load_mesh_scene(filename, show_edges=False):
    mesh = trimesh.load(filename)
    color = [128, 176, 255, 255]
    mesh.visual.face_colors = color
    geometries = [mesh]
    if show_edges:
        edges = mesh.face_adjacency_edges
        path = trimesh.path.Path3D(
            **trimesh.path.exchange.misc.edges_to_path(edges, mesh.vertices.copy())
        )
        geometries.append(path)
    scene = trimesh.Scene(geometries)
    return scene, mesh


def get_user_inputs():
    form_data = request.form.to_dict()
    user_inputs = {k: v for k, v in form_data.items() if v.strip()}
    return user_inputs


@base.post("/check_input")
def check_input():
    mesh_form = MeshForm()
    user_inputs = get_user_inputs()

    try:
        mesh_settings = MeshSettings(**user_inputs)
    except ValidationError as e:
        for error in e.errors():
            field_name = error["loc"][0]
            input_field = getattr(mesh_form, field_name)
            input_field.is_valid = False
            input_field.msg = error["msg"]

    return render_template("settings.html", mesh_form=mesh_form)


@base.post("/create_mesh")
def create_mesh():
    filename = current_app.config["HEIGHTMAP_FILE"]
    filename_stl = change_extension(filename, "stl")
    input = get_full_filepath(filename)
    output = get_full_filepath(filename_stl)

    image_width, image_heigth = current_app.config["HEIGHTMAP_SIZE"]
    inputs = {
        "image_width": image_width,
        "image_height": image_heigth,
    }
    user_inputs = get_user_inputs()

    try:
        mesh_settings = MeshSettings(**user_inputs, **inputs)
    except:
        mesh_settings = MeshSettings(**inputs)  # use default values

    cmd = [
        "hmm",
        input,
        output,
        "-z",
        mesh_settings.hmm_z(),
        "-t",
        mesh_settings.hmm_t(),
        "-b",
        mesh_settings.hmm_b(),
        "-e",
        "0.0000001",
    ]
    cmd = cmd + mesh_settings.hmm_extra_options()

    print(image_width)
    print(" ".join(cmd))
    result = subprocess.run(cmd, check=True, capture_output=True, text=True)

    scene, mesh = load_mesh_scene(output)
    scene_html = trimesh.viewer.notebook.scene_to_html(scene)
    scene_html = html.escape(scene_html)
    return render_template(
        "result_mesh.html", scene_html=scene_html, filename_stl=filename_stl
    )


@base.get("/")
def index():
    return render_template("index.html", mesh_form=MeshForm())
