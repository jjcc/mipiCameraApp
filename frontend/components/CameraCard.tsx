import { CameraModule } from "./types";

type Props = {
  module: CameraModule;
  onClick: (module: CameraModule) => void;
};

export default function CameraCard({ module, onClick }: Props) {
  const spec = module.specification;

  return (
    <article className="card" onClick={() => onClick(module)}>
      <h3>{module.model_no || "Unknown Model"}</h3>
      <p className="row">Sensor: {module.sensor_model || "N/A"}</p>
      <p className="row">Interface: {module.interface_method || "N/A"}</p>
      <div className="row">
        <span className="badge">Pixel: {spec?.pixel || "-"}</span>
        <span className="badge">FOV: {spec?.fov || "-"}</span>
        <span className="badge">EFL: {spec?.efl || "-"}</span>
      </div>
      <div className="card-click-hint">
        <span className="hint-text">Click for details</span>
      </div>
    </article>
  );
}