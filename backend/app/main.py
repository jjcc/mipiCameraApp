from typing import Any
from fastapi import Depends, FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlite3 import Connection

from .database import get_db
from .schemas import CameraModule, CameraModuleListResponse, Specification

app = FastAPI(title="MIPI Camera Modules API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
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
