"use client";

import { useEffect, useState } from "react";

interface EFLFilterProps {
  value: string | null;
  onChange: (efl: string | null) => void;
  disabled?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

export default function EFLFilter({ value, onChange, disabled = false }: EFLFilterProps) {
  const [efls, setEfls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEfls() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/efls`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setEfls(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchEfls();
  }, []);

  return (
    <div className="efl-filter">
      <select
        id="efl-select"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled || loading}
        className="efl-select"
      >
        <option value="">All EFLs</option>
        {efls.map((efl) => (
          <option key={efl} value={efl}>
            {efl}
          </option>
        ))}
      </select>
      {error && <span className="error">Error loading EFLs</span>}
    </div>
  );
}