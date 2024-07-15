import os

from flask import Flask


def create_app(config_object=None):
    app = Flask(__name__)
    app.config.from_object("hqhmm.default_settings")

    # set up db
    with app.app_context():
        from . import db

        db.init()

    # register blueprints
    from .base import base as base

    app.register_blueprint(base)

    return app
