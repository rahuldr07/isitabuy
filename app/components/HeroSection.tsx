"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/search");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <>
      {/* Hero text */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-surface-variant text-secondary text-sm font-medium mb-8 shadow-sm">
          <span className="material-symbols-outlined text-[18px] text-primary-container">
            auto_awesome
          </span>
          AI-Powered Shopping Advisor
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-on-surface tracking-tight leading-tight">
          <span className="text-primary-container">Know</span> before you buy.
        </h1>
        <p className="text-lg md:text-xl text-secondary mb-10 leading-relaxed max-w-2xl mx-auto">
          Paste a product link, search by name, scan a barcode, or use our
          browser extension. IsItABuy analyzes price history, review quality,
          specs, and alternatives to give you a clear verdict.
        </p>
        <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white border border-surface-variant/40 text-on-surface shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow cursor-default shimmer-effect">
          <span className="material-symbols-outlined filled text-[20px] text-primary-container">
            verified_user
          </span>
          <span className="text-sm font-semibold tracking-tight text-slate-700">
            100% Independent &amp; Commission-Free Scores
          </span>
        </div>
      </section>

      {/* Search card */}
      <section className="max-w-4xl mx-auto mb-32 relative z-10">
        <div className="relative flex flex-col md:flex-row items-center gap-4 group bg-white rounded-full p-2 border border-surface-variant/50 hover:shadow-md hover:shadow-premium-hover transition-all">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-secondary/60 text-[24px] transition-colors group-focus-within:text-primary-container">
              search
            </span>
            <input
              className="w-full h-16 pl-14 pr-28 border-none bg-transparent text-base text-on-surface focus:ring-0 focus:outline-none placeholder:text-secondary/50 transition-all rounded-full"
              placeholder="Search product or paste URL"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <div className="absolute top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 right-2 mr-2">
              <button
                className="p-2 text-secondary hover:text-primary-container hover:bg-surface-container rounded-lg transition-all"
                title="Scan Barcode/Camera"
              >
                <span className="material-symbols-outlined text-[24px]">
                  barcode_scanner
                </span>
              </button>
              <button
                className="p-2 text-secondary hover:text-primary-container hover:bg-surface-container rounded-lg transition-all"
                title="Upload Image/Attachment"
              >
                <span className="material-symbols-outlined text-[24px]">
                  add_photo_alternate
                </span>
              </button>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="w-full md:w-auto h-16 px-10 bg-primary-container text-white font-bold text-sm hover:bg-amber-600 transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap z-10 rounded-full"
          >
            Check Product
          </button>
        </div>
      </section>
    </>
  );
}
