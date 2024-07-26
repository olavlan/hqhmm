import os

from flask import Flask


def create_app(config_object=None):
    app = Flask(__name__)
    app.config.from_object("app.default_settings")

    # set up db
    # with app.app_context():
    #     from . import db

    #     db.init()

    files_path = app.config["FILES_PATH"]
    os.makedirs(files_path, exist_ok=True)

    # register blueprints
    from .base import base as base

    app.register_blueprint(base)

    return app
