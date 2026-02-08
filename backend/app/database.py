from pathlib import Path
from sqlite3 import Connection, Row
import sqlite3
from typing import Generator

BASE_DIR = Path(__file__).resolve().parents[2]
DB_PATH = BASE_DIR / "camera_modules.db"


def get_connection() -> Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = Row
    return conn


def get_db() -> Generator[Connection, None, None]:
    conn = get_connection()
    try:
        yield conn
    finally:
        conn.close()
