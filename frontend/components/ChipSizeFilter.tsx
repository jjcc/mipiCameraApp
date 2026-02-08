"use client";

import { useEffect, useState } from "react";

interface ChipSizeFilterProps {
  value: string | null;
  onChange: (chipSize: string | null) => void;
  disabled?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

export default function ChipSizeFilter({ value, onChange, disabled = false }: ChipSizeFilterProps) {
  const [chipSizes, setChipSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChipSizes() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/chip_sizes`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setChipSizes(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchChipSizes();
  }, []);

  return (
    <div className="chip-size-filter">
      <select
        id="chip-size-select"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled || loading}
        className="chip-size-select"
      >
        <option value="">All Chip Sizes</option>
        {chipSizes.map((chipSize) => (
          <option key={chipSize} value={chipSize}>
            {chipSize}
          </option>
        ))}
      </select>
      {error && <span className="error">Error loading chip sizes</span>}
    </div>
  );
}