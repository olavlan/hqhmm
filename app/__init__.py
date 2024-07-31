import os

from flask import Flask


def create_app(config_object=None):
    app = Flask(__name__)
    app.config.from_object("app.default_settings")

    # set up db
    # with app.app_context():
    #     from . import db

    #     db.init()

    from .base import get_files_path

    os.makedirs(get_files_path(app), exist_ok=True)

    # register blueprint
    from .base import base as base

    app.register_blueprint(base)

    return app
