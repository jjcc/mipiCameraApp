"use client";

import { useEffect, useState } from "react";

interface FOVFilterProps {
  value: string | null;
  onChange: (fov: string | null) => void;
  disabled?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

export default function FOVFilter({ value, onChange, disabled = false }: FOVFilterProps) {
  const [fovs, setFovs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFOVs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/fovs`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setFovs(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchFOVs();
  }, []);

  return (
    <div className="fov-filter">
      <select
        id="fov-select"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled || loading}
        className="fov-select"
      >
        <option value="">All FOVs</option>
        {fovs.map((fov) => (
          <option key={fov} value={fov}>
            {fov}
          </option>
        ))}
      </select>
      {error && <span className="error">Error loading FOVs</span>}
    </div>
  );
}