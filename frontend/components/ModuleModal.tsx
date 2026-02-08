import { CameraModule } from "./types";
import yaml from "js-yaml";

interface ModuleModalProps {
  module: CameraModule | null;
  isOpen: boolean;
  onClose: () => void;
}

interface TreeNode {
  content: string;
  level: number;
  children: TreeNode[];
}

export default function ModuleModal({ module, isOpen, onClose }: ModuleModalProps) {
  if (!isOpen || !module) return null;

  const spec = module.specification;

  // Function to get indentation level (number of leading spaces)
  const getIndentLevel = (line: string): number => {
    let spaces = 0;
    for (const char of line) {
      if (char === ' ') {
        spaces++;
      } else {
        break;
      }
    }
    return Math.floor(spaces / 2); // Assume 2 spaces = 1 level
  };

  // Function to check if line is a list item
  const isListItem = (line: string): boolean => {
    return line.trim().startsWith("- ");
  };

  // Function to parse YAML-like structure with proper hierarchy
  const parseYamlLines = (featuresText: string): TreeNode[] => {
    const lines = featuresText.split("\n");
    const root: TreeNode = { content: "", level: -1, children: [] };
    const stack: TreeNode[] = [root];

    for (const line of lines) {
      if (!line.trim()) continue; // Skip empty lines

      const indentLevel = getIndentLevel(line);
      const trimmedContent = line.trim();
      
      // Remove leading "- " if present
      const content = isListItem(line) ? trimmedContent.substring(2) : trimmedContent;

      const node: TreeNode = {
        content,
        level: indentLevel,
        children: []
      };

      // Pop stack until we find parent
      while (stack.length > 1 && stack[stack.length - 1].level >= indentLevel) {
        stack.pop();
      }

      // Add as child of current parent
      stack[stack.length - 1].children.push(node);
      stack.push(node);
    }

    return root.children;
  };

  // Recursive function to render tree nodes
  const renderTreeNode = (node: TreeNode, key: string, isLast: boolean): JSX.Element => {
    const hasChildren = node.children.length > 0;
    const isListItem = node.level >= 0;

    if (hasChildren) {
      // Parent node with children
      return (
        <div key={key} className="modal-feature-parent" style={{ marginLeft: `${node.level * 1}rem` }}>
          <div className="modal-feature-section">
            {isListItem && <span className="modal-bullet-point">•</span>}
            <strong>{node.content}</strong>
          </div>
          <div className="modal-feature-children">
            {node.children.map((child, idx) => 
              renderTreeNode(child, `${key}-${idx}`, idx === node.children.length - 1)
            )}
          </div>
        </div>
      );
    } else {
      // Leaf node (no children)
      return (
        <div 
          key={key} 
          className="modal-feature-item"
          style={{ marginLeft: `${node.level * 1}rem` }}
        >
          {isListItem ? (
            <>
              <span className="modal-bullet-point">•</span>
              <span>{node.content}</span>
            </>
          ) : (
            <p className="modal-feature-paragraph">{node.content}</p>
          )}
        </div>
      );
    }
  };

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

    // Parse with proper hierarchy
    const tree = parseYamlLines(featuresText);
    
    return (
      <div className="modal-features-text">
        {tree.map((node, index) => renderTreeNode(node, index.toString(), index === tree.length - 1))}
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