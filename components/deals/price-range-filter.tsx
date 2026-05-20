"use client";

import { useMemo, useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 1000;

export default function PriceRangeFilter() {
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const maxPercent = useMemo(
    () => ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100,
    [maxPrice],
  );

  return (
    <section>
      <h3 className="mb-3 text-xs font-extrabold text-foreground">
        Price Range <span className="text-muted-foreground">(i)</span>
      </h3>

      <div className="relative mb-4 h-6">
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-border" />
        <div
          className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-value"
          style={{ width: `${maxPercent}%` }}
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-1/2 z-10 size-3 -translate-y-1/2 rounded-full bg-value"
        />
        <input
          aria-label="Maximum deal price"
          className="deal-price-range"
          max={MAX_PRICE}
          min={MIN_PRICE}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          step="100"
          type="range"
          value={maxPrice}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex h-9 items-center gap-2 rounded-md border border-border bg-white px-3 text-xs font-extrabold text-foreground">
          <span className="font-extrabold text-muted-foreground">$</span>
          {MIN_PRICE}
        </div>
        <div className="flex h-9 items-center gap-2 rounded-md border border-border bg-white px-3 text-xs font-extrabold text-foreground">
          <span className="font-extrabold text-muted-foreground">$</span>
          {maxPrice === MAX_PRICE ? "1000+" : maxPrice}
        </div>
      </div>

      <style>{`
        .deal-price-range {
          appearance: none;
          background: transparent;
          height: 24px;
          left: 0;
          margin: 0;
          position: absolute;
          top: 0;
          width: 100%;
        }

        .deal-price-range:focus {
          outline: none;
        }

        .deal-price-range::-webkit-slider-runnable-track {
          background: transparent;
          border: 0;
          height: 4px;
        }

        .deal-price-range::-webkit-slider-thumb {
          appearance: none;
          background: #ffffff;
          border: 4px solid #6d28d9;
          border-radius: 999px;
          cursor: pointer;
          height: 14px;
          margin-top: -7px;
          width: 14px;
        }

        .deal-price-range::-moz-range-track {
          background: transparent;
          border: 0;
          height: 4px;
        }

        .deal-price-range::-moz-range-thumb {
          background: #ffffff;
          border: 4px solid #6d28d9;
          border-radius: 999px;
          cursor: pointer;
          height: 14px;
          width: 14px;
        }
      `}</style>
    </section>
  );
}
