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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gooeyToast } from "@/components/ui/goey-toaster";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const productQuery = query.trim();

    gooeyToast.success("Starting product check", {
      description: productQuery
        ? `Analyzing "${productQuery}" for price, reviews, and value.`
        : "Opening the search experience with demo product signals.",
      preset: "smooth",
    });

    if (productQuery) {
      router.push(`/search?q=${encodeURIComponent(productQuery)}`);
    } else {
      router.push("/search");
    }
  };

  const showComingSoon = (label: string) => {
    gooeyToast.info(`${label} is coming soon`, {
      description: "For now, search by product name or paste a product URL.",
      preset: "subtle",
    });
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
        <Badge
          variant="outline"
          className="mb-8 h-auto max-w-full rounded-full border-surface-variant bg-white px-3 py-1.5 text-xs font-medium text-secondary shadow-sm sm:px-4 sm:text-sm"
        >
          <Sparkles
            data-icon="inline-start"
            className="size-[18px] text-primary-container"
            aria-hidden="true"
          />
          AI-Powered Shopping Advisor
        </Badge>
        <h1 className="mx-auto mb-6 max-w-[12ch] break-words text-4xl font-bold leading-tight tracking-tight text-on-surface sm:max-w-none sm:text-5xl md:text-6xl">
          <span className="text-primary-container">Know</span> before you buy.
        </h1>
        <p className="mx-auto mb-10 max-w-[32ch] break-words text-base leading-relaxed text-secondary sm:max-w-2xl sm:text-lg md:text-xl">
          Paste a product link, search by name, or scan a barcode. IsItABuy AI
          analyzes price history, review quality, specs, and alternatives to
          give you a clear verdict.
        </p>
        <Badge
          variant="outline"
          className="shimmer-effect h-auto w-full max-w-[340px] cursor-default justify-center rounded-full border-surface-variant/40 bg-white px-3 py-2.5 text-on-surface shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-shadow hover:shadow-md sm:w-auto sm:max-w-full sm:gap-2.5 sm:px-5"
        >
          <ShieldCheck
            data-icon="inline-start"
            className="size-5 shrink-0 text-primary-container"
            aria-hidden="true"
          />
          <span className="min-w-0 text-center text-xs font-semibold leading-5 tracking-tight text-slate-700 sm:text-left sm:text-sm">
            100% Independent &amp; Commission-Free Scores
          </span>
        </Badge>
      </section>

      {/* Search card */}
      <section className="relative z-10 mx-auto mb-32 w-full max-w-4xl">
        <div className="group relative flex w-full flex-col items-center gap-3 rounded-3xl border border-surface-variant/50 bg-white p-2 transition-all hover:shadow-md hover:shadow-premium-hover md:flex-row md:rounded-full">
          <InputGroup className="h-14 w-full flex-1 rounded-2xl border-0 bg-transparent shadow-none md:h-16 md:rounded-full">
            <InputGroupAddon className="pl-4">
              <Search
                className="size-5 text-secondary/60 transition-colors group-focus-within:text-primary-container md:size-6"
                aria-hidden="true"
              />
            </InputGroupAddon>
            <InputGroupInput
              className="h-full px-0 text-sm text-on-surface placeholder:text-secondary/50 sm:text-base"
              placeholder="Search product or paste URL"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <InputGroupAddon
              align="inline-end"
              className="hidden gap-1 pr-3 md:flex"
            >
              <InputGroupButton
                size="icon-sm"
                className="text-secondary hover:bg-surface-container hover:text-primary-container"
                title="Scan barcode"
                onClick={() => showComingSoon("Barcode scan")}
              >
                <ScanBarcode className="size-6" aria-hidden="true" />
              </InputGroupButton>
              <InputGroupButton
                size="icon-sm"
                className="text-secondary hover:bg-surface-container hover:text-primary-container"
                title="Upload image"
                onClick={() => showComingSoon("Image upload")}
              >
                <ImagePlus className="size-6" aria-hidden="true" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <Button
            type="button"
            onClick={handleSearch}
            size="lg"
            className="z-10 h-14 w-full rounded-2xl bg-primary-container px-10 text-sm font-bold text-white shadow-sm hover:bg-amber-600 md:h-16 md:w-auto md:rounded-full"
          >
            Check Product
          </Button>
        </div>
      </section>
    </>
  );
}
