"use client";

import { useEffect, useState } from "react";

interface FNoFilterProps {
  value: string | null;
  onChange: (fNo: string | null) => void;
  disabled?: boolean;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

export default function FNoFilter({ value, onChange, disabled = false }: FNoFilterProps) {
  const [fNos, setFNos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFNos() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/api/f_nos`, { cache: "no-store" });
        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }
        const data = await res.json();
        setFNos(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setError(msg);
      } finally {
        setLoading(false);
      }
    }

    fetchFNos();
  }, []);

  return (
    <div className="f-no-filter">
      <select
        id="f-no-select"
        value={value || ""}
        onChange={(e) => onChange(e.target.value || null)}
        disabled={disabled || loading}
        className="f-no-select"
      >
        <option value="">All F/Nos</option>
        {fNos.map((fNo) => (
          <option key={fNo} value={fNo}>
            {fNo}
          </option>
        ))}
      </select>
      {error && <span className="error">Error loading F/Nos</span>}
    </div>
  );
}