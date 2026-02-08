from pydantic import BaseModel


class Specification(BaseModel):
    pixel: str | None = None
    chip_size: str | None = None
    fov: str | None = None
    no_of_lens: str | None = None
    efl: str | None = None
    f_no: str | None = None
    tv_d: str | None = None


class CameraModule(BaseModel):
    id: int
    model_no: str | None = None
    sensor_model: str | None = None
    features_en: str | None = None
    features_cn: str | None = None
    interface_method: str | None = None
    application_platform: str | None = None
    system_adoption: str | None = None
    price_rmb: str | None = None
    price_usd: str | None = None
    model_size: str | None = None
    specification: Specification | None = None


class CameraModuleListResponse(BaseModel):
    total: int
    items: list[CameraModule]
