"use client";

import {
  ImagePlus,
  ScanBarcode,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
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
      <section className="mx-auto mb-20 w-full max-w-3xl text-center">
        <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white border border-surface-variant px-3 py-1.5 text-xs font-medium text-secondary shadow-sm mb-8 sm:px-4 sm:text-sm">
          <Sparkles className="size-[18px] text-primary-container" aria-hidden="true" />
          AI-Powered Shopping Advisor
        </div>
        <h1 className="mx-auto mb-6 max-w-[12ch] break-words text-4xl font-bold leading-tight tracking-tight text-on-surface sm:max-w-none sm:text-5xl md:text-6xl">
          <span className="text-primary-container">Know</span> before you buy.
        </h1>
        <p className="mx-auto mb-10 max-w-[32ch] break-words text-base leading-relaxed text-secondary sm:max-w-2xl sm:text-lg md:text-xl">
          Paste a product link, search by name, scan a barcode, or use our
          browser extension. IsItABuy AI analyzes price history, review quality,
          specs, and alternatives to give you a clear verdict.
        </p>
        <div className="inline-flex w-full max-w-[340px] items-center justify-center gap-2 px-3 py-2.5 rounded-full bg-white border border-surface-variant/40 text-on-surface shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow cursor-default shimmer-effect sm:w-auto sm:max-w-full sm:gap-2.5 sm:px-5">
          <ShieldCheck className="size-5 text-primary-container" aria-hidden="true" />
          <span className="min-w-0 text-center text-xs font-semibold leading-5 tracking-tight text-slate-700 sm:text-left sm:text-sm">
            100% Independent &amp; Commission-Free Scores
          </span>
        </div>
      </section>

      {/* Search card */}
      <section className="relative z-10 mx-auto mb-32 w-full max-w-4xl">
        <div className="relative flex w-full flex-col md:flex-row items-center gap-4 group bg-white rounded-3xl md:rounded-full p-2 border border-surface-variant/50 hover:shadow-md hover:shadow-premium-hover transition-all">
          <div className="relative flex-1 w-full">
            <Search
              className="absolute left-5 top-1/2 size-6 -translate-y-1/2 text-secondary/60 transition-colors group-focus-within:text-primary-container"
              aria-hidden="true"
            />
            <input
              className="w-full h-16 pl-14 pr-4 md:pr-28 border-none bg-transparent text-sm sm:text-base text-on-surface focus:ring-0 focus:outline-none placeholder:text-secondary/50 transition-all rounded-full"
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
                <ScanBarcode className="size-6" aria-hidden="true" />
              </button>
              <button
                className="p-2 text-secondary hover:text-primary-container hover:bg-surface-container rounded-lg transition-all"
                title="Upload Image/Attachment"
              >
                <ImagePlus className="size-6" aria-hidden="true" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="w-full md:w-auto h-16 px-10 bg-primary-container text-white font-bold text-sm hover:bg-amber-600 transition-all flex items-center justify-center gap-2 shadow-sm whitespace-nowrap z-10 rounded-2xl md:rounded-full"
          >
            Check Product
          </button>
        </div>
      </section>
    </>
  );
}
