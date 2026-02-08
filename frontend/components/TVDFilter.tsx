"use client";

import { useEffect, useState } from "react";

interface TVDFilterProps {
  value: string | null;
  onChange: (tvD: string | null) => void;
  disabled?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

export default function TVDFilter({ value, onChange, disabled = false }: TVDFilterProps) {
  const [tvDs, setTvDs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTvDs() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/tv_ds`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setTvDs(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchTvDs();
  }, []);

  return (
    <div className="tv-d-filter">
      <select
        id="tv-d-select"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled || loading}
        className="tv-d-select"
      >
        <option value="">All TV Distortions</option>
        {tvDs.map((tvD) => (
          <option key={tvD} value={tvD}>
            {tvD}
          </option>
        ))}
      </select>
      {error && <span className="error">Error loading TV distortions</span>}
    </div>
  );
}