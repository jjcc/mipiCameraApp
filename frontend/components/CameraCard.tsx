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
        <span className="badge">Aperture: {spec?.f_no || "-"}</span>
        <span className="badge">No of Lens: {spec?.no_of_lens || "-"}</span>
        <span className="badge">Distortion: {spec?.tv_d || "-"}</span>
        <span className="badge">Module Size: {module.model_size|| "-"}</span>
      </div>
      <div className="card-click-hint">
        <span className="hint-text">Click for detail features</span>
      </div>
    </article>
  );
}