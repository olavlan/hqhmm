from flask import (
    Blueprint,
    render_template,
    current_app,
    request,
    redirect,
    send_from_directory,
)

base = Blueprint("base", __name__)


@base.route("/uploads/<filename>")
def download_file(filename):
    return send_from_directory(current_app.config["DATABASE_PATH"], filename)


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
