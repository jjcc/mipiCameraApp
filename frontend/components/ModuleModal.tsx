import { CameraModule } from "./types";
import yaml from "js-yaml";

interface ModuleModalProps {
  module: CameraModule | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModuleModal({ module, isOpen, onClose }: ModuleModalProps) {
  if (!isOpen || !module) return null;

  const spec = module.specification;

  // Function to parse and format features text
  const formatFeatures = (featuresText: string | null | undefined): JSX.Element => {
    if (!featuresText) {
      return <span>No features available</span>;
    }

    try {
      // Try to parse as YAML
      const parsed = yaml.load(featuresText);
      
      if (typeof parsed === "object" && parsed !== null) {
        // It's valid YAML object, render it structured
        return (
          <pre className="modal-yaml-content">
            {yaml.dump(parsed, { indent: 2 })}
          </pre>
        );
      }
    } catch {
      // Not valid YAML, treat as formatted text
    }

    // Split by newlines and render with proper formatting
    const lines = featuresText.split("\n").filter((line) => line.trim());
    
    return (
      <div className="modal-features-text">
        {lines.map((line, index) => {
          const trimmedLine = line.trim();
          
          // Check if it's a section header (ends with :)
          if (trimmedLine.endsWith(":")) {
            return (
              <div key={index} className="modal-feature-section">
                <strong>{trimmedLine}</strong>
              </div>
            );
          }
          
          // Check if it's a bullet point
          if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("• ")) {
            return (
              <div key={index} className="modal-feature-bullet">
                <span className="modal-bullet-point">•</span>
                <span>{trimmedLine.substring(2)}</span>
              </div>
            );
          }
          
          // Regular paragraph
          return (
            <p key={index} className="modal-feature-paragraph">
              {trimmedLine}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{module.model_no || "Unknown Model"}</h2>
          <button className="modal-close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="modal-body">
          <div className="modal-info-section">
            <h3>Basic Information</h3>
            <div className="modal-info-grid">
              <div className="modal-info-item">
                <span className="modal-info-label">Sensor:</span>
                <span className="modal-info-value">{module.sensor_model || "N/A"}</span>
              </div>
              <div className="modal-info-item">
                <span className="modal-info-label">Interface:</span>
                <span className="modal-info-value">{module.interface_method || "N/A"}</span>
              </div>

              <div className="modal-info-item">
                <span className="modal-info-label">Size:</span>
                <span className="modal-info-value">{module.model_size || "N/A"}</span>
              </div>
            </div>
          </div>

          <div className="modal-specs-section">
            <h3>Specifications</h3>
            <div className="modal-specs-grid">
              <div className="modal-spec-item">
                <span className="modal-spec-label">Pixel:</span>
                <span className="modal-spec-value">{spec?.pixel || "-"}</span>
              </div>
              <div className="modal-spec-item">
                <span className="modal-spec-label">Chip Size:</span>
                <span className="modal-spec-value">{spec?.chip_size || "-"}</span>
              </div>
              <div className="modal-spec-item">
                <span className="modal-spec-label">FOV:</span>
                <span className="modal-spec-value">{spec?.fov || "-"}</span>
              </div>
              <div className="modal-spec-item">
                <span className="modal-spec-label">Lens Count:</span>
                <span className="modal-spec-value">{spec?.no_of_lens || "-"}</span>
              </div>
              <div className="modal-spec-item">
                <span className="modal-spec-label">EFL:</span>
                <span className="modal-spec-value">{spec?.efl || "-"}</span>
              </div>
              <div className="modal-spec-item">
                <span className="modal-spec-label">F/No:</span>
                <span className="modal-spec-value">{spec?.f_no || "-"}</span>
              </div>
              <div className="modal-spec-item">
                <span className="modal-spec-label">TV Distortion:</span>
                <span className="modal-spec-value">{spec?.tv_d || "-"}</span>
              </div>
            </div>
          </div>

          <div className="modal-features-section">
            <h3>Features</h3>
            {formatFeatures(module.features_en)}
          </div>
        </div>
      </div>
    </div>
  );
}