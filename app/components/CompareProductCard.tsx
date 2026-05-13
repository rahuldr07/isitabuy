"use client";

import Link from "next/link";

export interface CompareProduct {
  id: number;
  brand: string;
  category: string;
  name: string;
  image: string;
  prices: { retailer: string; price: number; highlight?: boolean }[];
  description: string;
  verdict: "buy" | "wait" | "avoid" | "better";
  aiScore: number;
  trust: string;
  value: string;
  bestMatch?: boolean;
}

interface CompareProductCardProps {
  product: CompareProduct;
  isSelected: boolean;
  onSelect: (id: number) => void;
}

export default function CompareProductCard({
  product,
  isSelected,
  onSelect,
}: CompareProductCardProps) {
  const verdictConfig = {
    buy: {
      label: "Buy",
      color: "text-[#16A34A]",
      icon: "check_circle",
      bg: "bg-surface-container-lowest",
      border: "border-surface-variant",
      btnBg: "bg-[#622395]",
      btnText: "text-white",
      scoreColor: "text-on-surface",
    },
    wait: {
      label: "Wait",
      color: "text-[#F59E0B]",
      icon: "schedule",
      bg: "bg-surface-container-lowest",
      border: "border-surface-variant",
      btnBg: "bg-primary",
      btnText: "text-on-primary",
      scoreColor: "text-on-surface",
    },
    avoid: {
      label: "Avoid",
      color: "text-[#DC2626]",
      icon: "warning",
      bg: "bg-surface-container-lowest",
      border: "border-surface-variant",
      btnBg: "bg-[#DC2626]",
      btnText: "text-white",
      scoreColor: "text-on-surface",
    },
    better: {
      label: "Better\nAlternative",
      color: "text-[#16A34A]",
      icon: "auto_awesome",
      bg: "bg-[#111827]",
      border: "border-gray-800",
      btnBg: "bg-white",
      btnText: "text-gray-900",
      scoreColor: "text-white",
    },
  };

  const config = verdictConfig[product.verdict];
  const isDark = product.verdict === "better";

  return (
    <div
      className={`${config.bg} rounded-xl p-6 shadow-ambient-low flex flex-col lg:flex-row gap-6 relative border ${config.border} group hover:shadow-ambient-high transition-all ${
        product.verdict === "avoid" ? "opacity-80" : ""
      }`}
    >
      {product.bestMatch && (
        <div className="absolute top-0 right-0 bg-[#16A34A] text-white font-label-sm text-[12px] px-4 py-1 rounded-bl-lg font-bold z-10">
          Best overall match
        </div>
      )}

      {/* Left: Image + Compare */}
      <div className="flex items-start gap-4 shrink-0">
        <div className="flex flex-col items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(product.id)}
              className={`w-5 h-5 rounded border-surface-variant text-primary-container focus:ring-primary-container form-checkbox ${
                isDark ? "border-gray-700 bg-gray-900" : ""
              }`}
            />
            <span
              className={`text-[12px] font-semibold ${
                isDark ? "text-gray-400" : "text-secondary"
              }`}
            >
              Compare
            </span>
          </label>
          <div
            className={`w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 ${
              isDark ? "bg-white p-2" : "bg-surface-container-low"
            }`}
          >
            {product.image ? (
              <img
                alt={product.name}
                className={`w-full h-full ${
                  isDark ? "object-contain" : "object-cover mix-blend-multiply"
                }`}
                src={product.image}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span
                  className={`material-symbols-outlined text-[48px] ${
                    isDark ? "text-gray-400" : "text-secondary"
                  }`}
                >
                  headphones
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Middle: Info */}
      <div className="flex-grow flex flex-col">
        <div
          className={`font-label-sm text-label-sm mb-1 ${
            isDark ? "text-gray-400" : "text-secondary"
          }`}
        >
          {product.brand} • {product.category}
        </div>
        <h2
          className={`font-headline-md text-headline-md mb-2 ${
            isDark ? "text-white" : "text-on-surface"
          }`}
        >
          {product.name}
        </h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {product.prices.map((p, i) => (
            <span
              key={i}
              className={`inline-flex items-center px-2.5 py-1 rounded-md text-[13px] font-semibold border ${
                isDark
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-surface-container text-on-surface border-surface-variant"
              }`}
            >
              {p.retailer}{" "}
              <span
                className={`ml-1.5 font-bold ${
                  p.highlight === false
                    ? "text-secondary"
                    : product.verdict === "avoid"
                    ? "text-[#DC2626]"
                    : "text-[#16A34A]"
                }`}
              >
                ${p.price}
              </span>
            </span>
          ))}
        </div>
        <p
          className={`font-body-md text-body-md leading-relaxed max-w-2xl ${
            isDark ? "text-gray-300" : "text-on-surface-variant"
          }`}
        >
          {product.description}
        </p>
      </div>

      {/* Right: Verdict + Score */}
      <div
        className={`shrink-0 lg:w-56 flex flex-col items-center justify-between gap-4 lg:border-l ${
          isDark ? "border-gray-800" : "border-surface-variant"
        } lg:pl-6`}
      >
        <div className="text-center w-full">
          <div className={`${config.color} font-bold flex flex-col items-center`}>
            <span
              className="material-symbols-outlined text-[40px] mb-1"
              style={{
                fontVariationSettings:
                  product.verdict === "buy" || product.verdict === "better"
                    ? "'FILL' 1"
                    : "'FILL' 0",
              }}
            >
              {config.icon}
            </span>
            <span
              className={`${
                product.verdict === "better"
                  ? "text-[18px] leading-tight"
                  : "text-[24px] leading-none"
              } uppercase tracking-widest whitespace-pre-line`}
            >
              {config.label}
            </span>
          </div>
          <div className="mt-4 flex flex-col items-center">
            <span
              className={`text-[40px] font-bold leading-none ${config.scoreColor}`}
            >
              {product.aiScore}
            </span>
            <span
              className={`font-label-sm text-label-sm ${
                isDark ? "text-gray-400" : "text-secondary"
              }`}
            >
              AI Buy Score
            </span>
          </div>
        </div>

        <div className="w-full grid grid-cols-2 gap-2">
          <div
            className={`p-2 rounded-lg text-center ${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : product.verdict === "avoid"
                ? "bg-error-container/20"
                : "bg-surface-container-low"
            }`}
          >
            <div
              className={`text-[10px] uppercase font-bold ${
                product.verdict === "avoid" ? "text-error" : isDark ? "text-gray-400" : "text-secondary"
              }`}
            >
              Trust
            </div>
            <div
              className={`text-[14px] font-bold ${
                product.verdict === "avoid" ? "text-error" : isDark ? "text-white" : "text-on-surface"
              }`}
            >
              {product.trust}
            </div>
          </div>
          <div
            className={`p-2 rounded-lg text-center ${
              isDark
                ? "bg-gray-800 border border-gray-700"
                : "bg-surface-container-low"
            }`}
          >
            <div
              className={`text-[10px] uppercase font-bold ${
                isDark ? "text-gray-400" : "text-secondary"
              }`}
            >
              Value
            </div>
            <div
              className={`text-[14px] font-bold ${
                isDark ? "text-white" : "text-on-surface"
              }`}
            >
              {product.value}
            </div>
          </div>
        </div>

        <Link
          href="/product"
          className={`w-full font-label-sm text-label-sm px-4 py-3 rounded-xl transition-all font-bold shadow-sm text-center ${config.btnBg} ${config.btnText} hover:opacity-90`}
        >
          View AI Analysis
        </Link>
      </div>
    </div>
  );
}
