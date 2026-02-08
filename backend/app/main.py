from typing import Any
from fastapi import Depends, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlite3 import Connection

from .database import get_db
from .schemas import CameraModule, CameraModuleListResponse, Specification

app = FastAPI(title="MIPI Camera Modules API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/modules", response_model=CameraModuleListResponse)
def list_modules(
    q: str | None = Query(default=None, description="Search by model/sensor/features"),
    pixel: str | None = Query(default=None, description="Filter by pixel value"),
    chip_size: str | None = Query(default=None, description="Filter by chip size value"),
    fov: str | None = Query(default=None, description="Filter by FOV value"),
    efl: str | None = Query(default=None, description="Filter by EFL value"),
    f_no: str | None = Query(default=None, description="Filter by F/No value"),
    tv_d: str | None = Query(default=None, description="Filter by TV Distortion value"),
    no_of_lens: str | None = Query(default=None, description="Filter by number of lenses value"),
    limit: int = Query(default=20, ge=1, le=100),
    offset: int = Query(default=0, ge=0),
    db: Connection = Depends(get_db),
) -> CameraModuleListResponse:
    params: list[Any] = []
    where_clauses = []

    if q:
        where_clauses.append(
            "m.model_no LIKE ? OR m.sensor_model LIKE ? OR m.features_en LIKE ? OR m.features_cn LIKE ?"
        )
        like = f"%{q}%"
        params.extend([like, like, like, like])

    if pixel:
        where_clauses.append("s.pixel = ?")
        params.append(pixel)

    if chip_size:
        where_clauses.append("s.chip_size = ?")
        params.append(chip_size)

    if fov:
        where_clauses.append("s.fov = ?")
        params.append(fov)

    if efl:
        where_clauses.append("s.efl = ?")
        params.append(efl)

    if f_no:
        where_clauses.append("s.f_no = ?")
        params.append(f_no)

    if tv_d:
        where_clauses.append("s.tv_d = ?")
        params.append(tv_d)

    if no_of_lens:
        where_clauses.append("s.no_of_lens = ?")
        params.append(no_of_lens)

    where = f"WHERE {' AND '.join(where_clauses)}" if where_clauses else ""

    total_sql = f"""
        SELECT COUNT(*)
        FROM camera_modules m
        LEFT JOIN specifications s ON s.module_id = m.id
        {where}
    """
    total = db.execute(total_sql, params).fetchone()[0]

    list_sql = f"""
        SELECT
            m.id,
            m.model_no,
            m.sensor_model,
            m.features_en,
            m.features_cn,
            m.interface_method,
            m.application_platform,
            m.system_adoption,
            m.price_rmb,
            m.price_usd,
            m.model_size,
            s.pixel,
            s.chip_size,
            s.fov,
            s.no_of_lens,
            s.efl,
            s.f_no,
            s.tv_d
        FROM camera_modules m
        LEFT JOIN specifications s ON s.module_id = m.id
        {where}
        ORDER BY m.id ASC
        LIMIT ? OFFSET ?
    """
    rows = db.execute(list_sql, [*params, limit, offset]).fetchall()

    items = [
        CameraModule(
            id=row["id"],
            model_no=row["model_no"],
            sensor_model=row["sensor_model"],
            features_en=row["features_en"],
            features_cn=row["features_cn"],
            interface_method=row["interface_method"],
            application_platform=row["application_platform"],
            system_adoption=row["system_adoption"],
            price_rmb=row["price_rmb"],
            price_usd=row["price_usd"],
            model_size=row["model_size"],
            specification=Specification(
                pixel=row["pixel"],
                chip_size=row["chip_size"],
                fov=row["fov"],
                no_of_lens=row["no_of_lens"],
                efl=row["efl"],
                f_no=row["f_no"],
                tv_d=row["tv_d"],
            ),
        )
        for row in rows
    ]

    return CameraModuleListResponse(total=total, items=items)


@app.get("/api/pixels")
def get_unique_pixels(db: Connection = Depends(get_db)) -> list[str]:
    sql = """
        SELECT DISTINCT pixel
        FROM specifications
        WHERE pixel IS NOT NULL AND pixel != ''
        ORDER BY pixel
    """
    rows = db.execute(sql).fetchall()
    return [row["pixel"] for row in rows]


@app.get("/api/chip_sizes")
def get_unique_chip_sizes(db: Connection = Depends(get_db)) -> list[str]:
    sql = """
        SELECT DISTINCT chip_size
        FROM specifications
        WHERE chip_size IS NOT NULL AND chip_size != ''
        ORDER BY chip_size
    """
    rows = db.execute(sql).fetchall()
    return [row["chip_size"] for row in rows]


@app.get("/api/fovs")
def get_unique_fovs(db: Connection = Depends(get_db)) -> list[str]:
    sql = """
        SELECT DISTINCT fov
        FROM specifications
        WHERE fov IS NOT NULL AND fov != ''
        ORDER BY fov
    """
    rows = db.execute(sql).fetchall()
    return [row["fov"] for row in rows]


@app.get("/api/efls")
def get_unique_efls(db: Connection = Depends(get_db)) -> list[str]:
    sql = """
        SELECT DISTINCT efl
        FROM specifications
        WHERE efl IS NOT NULL AND efl != ''
        ORDER BY efl
    """
    rows = db.execute(sql).fetchall()
    return [row["efl"] for row in rows]


@app.get("/api/f_nos")
def get_unique_f_nos(db: Connection = Depends(get_db)) -> list[str]:
    sql = """
        SELECT DISTINCT f_no
        FROM specifications
        WHERE f_no IS NOT NULL AND f_no != ''
        ORDER BY f_no
    """
    rows = db.execute(sql).fetchall()
    return [row["f_no"] for row in rows]


@app.get("/api/tv_ds")
def get_unique_tv_ds(db: Connection = Depends(get_db)) -> list[str]:
    sql = """
        SELECT DISTINCT tv_d
        FROM specifications
        WHERE tv_d IS NOT NULL AND tv_d != ''
        ORDER BY tv_d
    """
    rows = db.execute(sql).fetchall()
    return [row["tv_d"] for row in rows]


@app.get("/api/no_of_lens")
def get_unique_no_of_lens(db: Connection = Depends(get_db)) -> list[str]:
    sql = """
        SELECT DISTINCT no_of_lens
        FROM specifications
        WHERE no_of_lens IS NOT NULL AND no_of_lens != ''
        ORDER BY no_of_lens
    """
    rows = db.execute(sql).fetchall()
    return [row["no_of_lens"] for row in rows]


@app.get("/api/modules/{module_id}", response_model=CameraModule)
def get_module(module_id: int, db: Connection = Depends(get_db)) -> CameraModule:
    row = db.execute(
        """
        SELECT
            m.id,
            m.model_no,
            m.sensor_model,
            m.features_en,
            m.features_cn,
            m.interface_method,
            m.application_platform,
            m.system_adoption,
            m.price_rmb,
            m.price_usd,
            m.model_size,
            s.pixel,
            s.chip_size,
            s.fov,
            s.no_of_lens,
            s.efl,
            s.f_no,
            s.tv_d
        FROM camera_modules m
        LEFT JOIN specifications s ON s.module_id = m.id
        WHERE m.id = ?
        """,
        [module_id],
    ).fetchone()

    if row is None:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="Module not found")

    return CameraModule(
        id=row["id"],
        model_no=row["model_no"],
        sensor_model=row["sensor_model"],
        features_en=row["features_en"],
        features_cn=row["features_cn"],
        interface_method=row["interface_method"],
        application_platform=row["application_platform"],
        system_adoption=row["system_adoption"],
        price_rmb=row["price_rmb"],
        price_usd=row["price_usd"],
        model_size=row["model_size"],
        specification=Specification(
            pixel=row["pixel"],
            chip_size=row["chip_size"],
            fov=row["fov"],
            no_of_lens=row["no_of_lens"],
            efl=row["efl"],
            f_no=row["f_no"],
            tv_d=row["tv_d"],
        ),
    )
