from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Created from:
# https://fastapi.tiangolo.com/tutorial/sql-databases/

SQLALCHEMY_DATABASE_URL = "sqlite:///db.sqlite3"
# SQLALCHEMY_DATABASE_URL = "postgresql://user:password@postgresserver/db"

engine = create_engine(
    # Note: check_same_thread is only needed for sqlite!
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)
SessionLocal = sessionmaker(bind=engine, autoflush=True)

Base = declarative_base()


def db():
    db = SessionLocal()
    try:
        return db
    finally:
        db.close()
