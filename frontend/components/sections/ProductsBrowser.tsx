"use client";

import { useMemo, useState } from "react";
import CameraCard from "@/components/CameraCard";
import ModuleModal from "@/components/ModuleModal";
import PixelFilter from "@/components/PixelFilter";
import ChipSizeFilter from "@/components/ChipSizeFilter";
import FOVFilter from "@/components/FOVFilter";
import EFLFilter from "@/components/EFLFilter";
import FNoFilter from "@/components/FNoFilter";
import TVDFilter from "@/components/TVDFilter";
import NoOfLensFilter from "@/components/NoOfLensFilter";
import { CameraModule, CameraModuleListResponse } from "@/components/types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://127.0.0.1:8000";

export default function ProductsBrowser() {
  const [query, setQuery] = useState("");
  const [pixel, setPixel] = useState<string | null>(null);
  const [chipSize, setChipSize] = useState<string | null>(null);
  const [fov, setFOV] = useState<string | null>(null);
  const [efl, setEFL] = useState<string | null>(null);
  const [fNo, setFNo] = useState<string | null>(null);
  const [tvD, setTvD] = useState<string | null>(null);
  const [noOfLens, setNoOfLens] = useState<string | null>(null);
  const [data, setData] = useState<CameraModuleListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedModule, setSelectedModule] = useState<CameraModule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();
    params.set("limit", "100");
    const q = query.trim();
    if (q) params.set("q", q);
    if (pixel) params.set("pixel", pixel);
    if (chipSize) params.set("chip_size", chipSize);
    if (fov) params.set("fov", fov);
    if (efl) params.set("efl", efl);
    if (fNo) params.set("f_no", fNo);
    if (tvD) params.set("tv_d", tvD);
    if (noOfLens) params.set("no_of_lens", noOfLens);
    return `${API_BASE}/api/modules?${params.toString()}`;
  }, [query, pixel, chipSize, fov, efl, fNo, tvD, noOfLens]);

  async function search() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint, { cache: "no-store" });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = (await res.json()) as CameraModuleListResponse;
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function handleCardClick(module: CameraModule) {
    setSelectedModule(module);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setSelectedModule(null);
  }

  return (
    <section id="browse" className="catalog-section">
      <div className="catalog-inner">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2
            className="text-brand-dark mb-3"
            style={{ margin: "0 0 0.75rem" }}
          >
            Browse All Modules
          </h2>
          <p
            className="text-brand-text"
            style={{ fontFamily: "Inter, sans-serif", fontSize: "1.05rem" }}
          >
            Filter our full catalog by sensor or optics specifications.
          </p>
        </div>

        {/* Filters */}
        <div className="controls">
          <div className="filters-section">
            <div className="filter-group">
              <div className="filter-group-label">Sensor Features</div>
              <div className="filters-row sensor-filters">
                <div className="filter-container">
                  <label htmlFor="pixel-select" className="filter-label">Pixel</label>
                  <PixelFilter value={pixel} onChange={setPixel} disabled={loading} />
                </div>
                <div className="filter-container">
                  <label htmlFor="chip-size-select" className="filter-label">Chip Size</label>
                  <ChipSizeFilter value={chipSize} onChange={setChipSize} disabled={loading} />
                </div>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-group-label">Optics Features</div>
              <div className="filters-row optics-filters">
                <div className="filter-container">
                  <label htmlFor="fov-select" className="filter-label">FOV</label>
                  <FOVFilter value={fov} onChange={setFOV} disabled={loading} />
                </div>
                <div className="filter-container">
                  <label htmlFor="efl-select" className="filter-label">Focal Length</label>
                  <EFLFilter value={efl} onChange={setEFL} disabled={loading} />
                </div>
                <div className="filter-container">
                  <label htmlFor="f-no-select" className="filter-label">Aperture</label>
                  <FNoFilter value={fNo} onChange={setFNo} disabled={loading} />
                </div>
                <div className="filter-container">
                  <label htmlFor="tv-d-select" className="filter-label">TV Distortion</label>
                  <TVDFilter value={tvD} onChange={setTvD} disabled={loading} />
                </div>
                <div className="filter-container">
                  <label htmlFor="no-of-lens-select" className="filter-label">Lens Count</label>
                  <NoOfLensFilter value={noOfLens} onChange={setNoOfLens} disabled={loading} />
                </div>
              </div>
            </div>
          </div>

          <div className="search-row">
            <button onClick={search} disabled={loading} className="catalog-btn">
              {loading ? "Loading…" : "Search"}
            </button>
          </div>
        </div>

        {/* Results */}
        {error && <p className="row">Error: {error}</p>}
        {!error && !data && (
          <p className="row" style={{ marginTop: "1rem" }}>
            Use the filters above and click Search to load modules.
          </p>
        )}
        {data && (
          <p className="row" style={{ marginTop: "0.5rem" }}>
            Total: {data.total} module{data.total !== 1 ? "s" : ""}
          </p>
        )}

        <section className="grid" style={{ marginTop: "1rem" }}>
          {data?.items.map((m) => (
            <CameraCard key={m.id} module={m} onClick={handleCardClick} />
          ))}
        </section>
      </div>

      <ModuleModal module={selectedModule} isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}
