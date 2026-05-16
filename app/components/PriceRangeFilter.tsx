"use client";

import { useMemo, useState } from "react";

const MIN_PRICE = 0;
const MAX_PRICE = 100000;

function formatPrice(value: number) {
  return `INR ${value.toLocaleString("en-IN")}`;
}

export default function PriceRangeFilter() {
  const [maxPrice, setMaxPrice] = useState(10000);

  const maxPercent = useMemo(
    () => ((maxPrice - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100,
    [maxPrice],
  );

  return (
    <div>
      <div className="mb-3 text-base font-extrabold uppercase tracking-[0.02em] text-[#111827]">
        Price
      </div>
      <div className="relative pb-1">
        <div className="relative mb-4 h-6">
          <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#d1d5db]" />
          <div
            className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#ef4778]"
            style={{
              left: "0%",
              width: `${maxPercent}%`,
            }}
          />
          <span className="absolute left-0 top-1/2 z-10 size-4 -translate-y-1/2 rounded-full border-[5px] border-[#ef4778] bg-white" />
          <input
            aria-label="Maximum price"
            className="price-range-input"
            max={MAX_PRICE}
            min={MIN_PRICE}
            onChange={(event) => {
              setMaxPrice(Number(event.target.value));
            }}
            step="100"
            type="range"
            value={maxPrice}
          />
        </div>
        <p className="text-base font-extrabold text-[#111827]">
          {formatPrice(MIN_PRICE)} - {formatPrice(maxPrice)}
        </p>
      </div>

      <style>{`
        .price-range-input {
          appearance: none;
          background: transparent;
          height: 24px;
          left: 0;
          margin: 0;
          pointer-events: none;
          position: absolute;
          top: 0;
          width: 100%;
        }

        .price-range-input:focus {
          outline: none;
        }

        .price-range-input::-webkit-slider-runnable-track {
          background: transparent;
          border: 0;
          height: 4px;
        }

        .price-range-input::-webkit-slider-thumb {
          appearance: none;
          background: #ffffff;
          border: 5px solid #ef4778;
          border-radius: 999px;
          box-shadow: none;
          cursor: pointer;
          height: 16px;
          margin-top: -6px;
          pointer-events: auto;
          width: 16px;
        }

        .price-range-input::-moz-range-track {
          background: transparent;
          border: 0;
          height: 4px;
        }

        .price-range-input::-moz-range-thumb {
          background: #ffffff;
          border: 5px solid #ef4778;
          border-radius: 999px;
          box-shadow: none;
          cursor: pointer;
          height: 16px;
          pointer-events: auto;
          width: 16px;
        }
      `}</style>
    </div>
  );
}
