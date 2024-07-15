from flask import Blueprint, render_template, current_app, request, redirect

base = Blueprint("base", __name__)


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
