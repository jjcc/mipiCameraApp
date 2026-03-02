"use client";

import { useEffect, useState } from "react";

interface NoOfLensFilterProps {
  value: string | null;
  onChange: (noOfLens: string | null) => void;
  disabled?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export default function NoOfLensFilter({ value, onChange, disabled = false }: NoOfLensFilterProps) {
  const [noOfLensValues, setNoOfLensValues] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNoOfLensValues() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/no_of_lens`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setNoOfLensValues(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchNoOfLensValues();
  }, []);

  return (
    <div className="no-of-lens-filter">
      <select
        id="no-of-lens-select"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled || loading}
        className="no-of-lens-select"
      >
        <option value="">All Lens Counts</option>
        {noOfLensValues.map((noOfLens) => (
          <option key={noOfLens} value={noOfLens}>
            {noOfLens}
          </option>
        ))}
      </select>
      {error && <span className="error">Error loading lens counts</span>}
    </div>
  );
}