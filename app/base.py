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

base = Blueprint("base", __name__)


@base.route("/uploads/<filename>")
def get_file(filename):
    return send_from_directory(current_app.config["FILES_PATH"], filename)


@base.route("/uploads/download/<filename>")
def download_file(filename):
    return send_from_directory(
        current_app.config["FILES_PATH"], filename, as_attachment=True
    )


def get_full_filepath(filename):
    path = current_app.config["FILES_PATH"]
    filepath = os.path.join(path, filename)
    return filepath


def change_extension(filepath, new_extension):
    base = os.path.splitext(filepath)[0]
    return f"{base}.{new_extension}"


@base.post("/upload")
def upload_file():
    file = request.files["heightmap"]
    current_app.config["HEIGHTMAP_FILE"] = file.filename
    path = current_app.config["FILES_PATH"]
    filepath = os.path.join(path, file.filename)
    if not os.path.exists(filepath):
        file.save(filepath)
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


@base.post("/create_mesh")
def create_mesh():
    filename = current_app.config["HEIGHTMAP_FILE"]
    filename_stl = change_extension(filename, "stl")
    input = get_full_filepath(filename)
    output = get_full_filepath(filename_stl)
    displacement = 200
    num_vertices = 50000
    base_height = 2
    cmd = [
        "hmm",
        input,
        output,
        "-z",
        str(displacement),
        "-p",
        str(num_vertices),
        "-b",
        str(base_height),
    ]
    result = subprocess.run(
        cmd,
        check=True,
        capture_output=True,
        text=True,
    )

    scene, mesh = load_mesh_scene(output)
    scene_html = trimesh.viewer.notebook.scene_to_html(scene)
    scene_html = html.escape(scene_html)
    return render_template(
        "result_mesh.html", scene_html=scene_html, filename_stl=filename_stl
    )


@base.post("/set_theme")
def set_theme():
    theme = request.form.get("theme")
    current_app.config["CUSTOM_THEME"] = theme
    return render_template("theme_switcher.html")


@base.get("/")
def index():
    return render_template("index.html")


@base.get("/new")
def new():
    return render_template("new.html")
