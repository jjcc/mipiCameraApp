"use client";

import { useEffect, useState } from "react";

interface PixelFilterProps {
  value: string | null;
  onChange: (pixel: string | null) => void;
  disabled?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export default function PixelFilter({ value, onChange, disabled = false }: PixelFilterProps) {
  const [pixels, setPixels] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPixels() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/pixels`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setPixels(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchPixels();
  }, []);

  return (
    <div className="pixel-filter">
      <select
        id="pixel-select"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled || loading}
        className="pixel-select"
      >
        <option value="">All Pixels</option>
        {pixels.map((pixel) => (
          <option key={pixel} value={pixel}>
            {pixel}
          </option>
        ))}
      </select>
      {error && <span className="error">Error loading pixels</span>}
    </div>
  );
}