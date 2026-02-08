import { CameraModule } from "./types";

type Props = {
  module: CameraModule;
};

export default function CameraCard({ module }: Props) {
  const spec = module.specification;

  return (
    <article className="card">
      <h3>{module.model_no || "Unknown Model"}</h3>
      <p className="row">Sensor: {module.sensor_model || "N/A"}</p>
      <p className="row">Interface: {module.interface_method || "N/A"}</p>
      <p className="row">Platform: {module.application_platform || "N/A"}</p>
      <p className="row">Price: {module.price_usd || module.price_rmb || "N/A"}</p>
      <div className="row">
        <span className="badge">Pixel: {spec?.pixel || "-"}</span>
        <span className="badge">FOV: {spec?.fov || "-"}</span>
        <span className="badge">EFL: {spec?.efl || "-"}</span>
      </div>
    </article>
  );
}
