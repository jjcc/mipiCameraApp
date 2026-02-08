"use client";

import { useMemo, useState } from "react";
import CameraCard from "@/components/CameraCard";
import PixelFilter from "@/components/PixelFilter";
import ChipSizeFilter from "@/components/ChipSizeFilter";
import FOVFilter from "@/components/FOVFilter";
import { CameraModuleListResponse } from "@/components/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [pixel, setPixel] = useState<string | null>(null);
  const [chipSize, setChipSize] = useState<string | null>(null);
  const [fov, setFOV] = useState<string | null>(null);
  const [data, setData] = useState<CameraModuleListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();
    params.set("limit", "100");
    
    const q = query.trim();
    if (q) params.set("q", q);
    if (pixel) params.set("pixel", pixel);
    if (chipSize) params.set("chip_size", chipSize);
    if (fov) params.set("fov", fov);
    
    const queryString = params.toString();
    return queryString ? `${API_BASE}/api/modules?${queryString}` : `${API_BASE}/api/modules?limit=100`;
  }, [query, pixel, chipSize, fov]);

  async function search() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const json = (await res.json()) as CameraModuleListResponse;
      setData(json);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>MIPI Camera Modules</h1>
      <div className="controls">
        <div className="filters-row">
          <div className="filter-container">
            <label htmlFor="pixel-select" className="filter-label">Pixel</label>
            <PixelFilter
              value={pixel}
              onChange={setPixel}
              disabled={loading}
            />
          </div>
          <div className="filter-container">
            <label htmlFor="chip-size-select" className="filter-label">Chip Size</label>
            <ChipSizeFilter
              value={chipSize}
              onChange={setChipSize}
              disabled={loading}
            />
          </div>
          <div className="filter-container">
            <label htmlFor="fov-select" className="filter-label">FOV</label>
            <FOVFilter
              value={fov}
              onChange={setFOV}
              disabled={loading}
            />
          </div>
        </div>
        <div className="search-row">
          <input
            placeholder="Search model, sensor, features..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") search();
            }}
          />
          <button onClick={search} disabled={loading}>
            {loading ? "Loading..." : "Search"}
          </button>
        </div>
      </div>

      {error && <p className="row">Error: {error}</p>}
      {!error && !data && <p className="row">Run a search to load modules.</p>}
      {data && <p className="row">Total: {data.total}</p>}

      <section className="grid">
        {data?.items.map((m) => (
          <CameraCard key={m.id} module={m} />
        ))}
      </section>
    </main>
  );
}
