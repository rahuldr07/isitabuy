"use client";

import { useState } from "react";

export default function CompareFilterSidebar() {
  const [verdict, setVerdict] = useState({ buy: true, wait: true, avoid: false });
  const [retailers, setRetailers] = useState({
    amazon: false,
    bestBuy: false,
    walmart: false,
  });
  const [scoreMin, setScoreMin] = useState(70);

  return (
    <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
      {/* Verdict Filter */}
      <div>
        <h3 className="font-label-sm text-label-sm text-on-surface mb-3 uppercase tracking-wider text-secondary">
          Verdict
        </h3>
        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={verdict.buy}
              onChange={() => setVerdict((p) => ({ ...p, buy: !p.buy }))}
              className="w-5 h-5 rounded border-surface-variant text-primary-container focus:ring-primary-container form-checkbox"
            />
            <span className="font-body-md text-body-md group-hover:text-primary-container transition-colors">
              Buy (12)
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={verdict.wait}
              onChange={() => setVerdict((p) => ({ ...p, wait: !p.wait }))}
              className="w-5 h-5 rounded border-surface-variant text-primary-container focus:ring-primary-container form-checkbox"
            />
            <span className="font-body-md text-body-md group-hover:text-primary-container transition-colors">
              Wait (8)
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={verdict.avoid}
              onChange={() => setVerdict((p) => ({ ...p, avoid: !p.avoid }))}
              className="w-5 h-5 rounded border-surface-variant text-primary-container focus:ring-primary-container form-checkbox"
            />
            <span className="font-body-md text-body-md group-hover:text-primary-container transition-colors">
              Avoid (4)
            </span>
          </label>
        </div>
      </div>

      {/* Retailer Filter */}
      <div>
        <h3 className="font-label-sm text-label-sm text-on-surface mb-3 uppercase tracking-wider text-secondary">
          Retailer
        </h3>
        <div className="space-y-2">
          {[
            { key: "amazon", label: "Amazon" },
            { key: "bestBuy", label: "Best Buy" },
            { key: "walmart", label: "Walmart" },
          ].map((r) => (
            <label key={r.key} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={retailers[r.key as keyof typeof retailers]}
                onChange={() =>
                  setRetailers((p) => ({ ...p, [r.key]: !p[r.key as keyof typeof p] }))
                }
                className="w-5 h-5 rounded border-surface-variant text-primary-container focus:ring-primary-container form-checkbox"
              />
              <span className="font-body-md text-body-md group-hover:text-primary-container transition-colors">
                {r.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* AI Buy Score Slider */}
      <div>
        <h3 className="font-label-sm text-label-sm text-on-surface mb-3 uppercase tracking-wider text-secondary">
          AI Buy Score
        </h3>
        <input
          type="range"
          min={0}
          max={100}
          value={scoreMin}
          onChange={(e) => setScoreMin(Number(e.target.value))}
          className="w-full accent-primary-container"
        />
        <div className="flex justify-between font-label-sm text-label-sm text-secondary mt-1">
          <span>{scoreMin}+</span>
          <span>100</span>
        </div>
      </div>
    </aside>
  );
}
