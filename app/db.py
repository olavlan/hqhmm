import os

from flask import current_app
from sqlmodel import Session, SQLModel, create_engine


def new_session():
    return Session(current_app.config["DATABASE_ENGINE"])


def update_engine():
    db_path = current_app.config["DATABASE_PATH"]
    if current_app.testing:
        db_path = os.path.join(db_path, "test")
    try:
        os.makedirs(db_path)
    except OSError:
        pass
    database_file = os.path.join(db_path, "meshes.sqlite")
    sqlite_url = f"sqlite:///{database_file}"
    engine = create_engine(sqlite_url, echo=True)
    current_app.config["DATABASE_ENGINE"] = engine
    return database_file, engine


def init():
    database_file, engine = update_engine()
    if current_app.testing:
        open(database_file, "w").close()
        SQLModel.metadata.create_all(engine)
    else:
        if not os.path.isfile(database_file):
            SQLModel.metadata.create_all(engine)
