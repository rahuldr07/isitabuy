"use client";

import Link from "next/link";
import { CompareProduct } from "./CompareProductCard";

interface CompareTrayProps {
  selectedProducts: CompareProduct[];
  onClear: () => void;
}

export default function CompareTray({ selectedProducts, onClear }: CompareTrayProps) {
  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-surface-variant shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-50 transform translate-y-0 transition-transform">
      <div className="max-w-container-max mx-auto px-gutter py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="font-label-sm text-label-sm text-on-surface font-bold">
            {selectedProducts.length} product{selectedProducts.length > 1 ? "s" : ""} selected
          </div>
          <div className="hidden sm:flex gap-2">
            {selectedProducts.map((p) => (
              <div
                key={p.id}
                className="w-10 h-10 bg-surface-container rounded border border-surface-variant overflow-hidden"
              >
                {p.image ? (
                  <img
                    alt={p.name}
                    className="w-full h-full object-cover"
                    src={p.image}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[20px]">
                      headphones
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClear}
            className="px-4 py-2 font-label-sm text-label-sm text-secondary hover:text-on-surface transition-colors"
          >
            Clear
          </button>
          <Link href="/compare-items" className="bg-primary-container text-on-primary font-label-sm text-label-sm px-6 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold text-center">
            Compare Items
          </Link>
        </div>
      </div>
    </div>
  );
}
