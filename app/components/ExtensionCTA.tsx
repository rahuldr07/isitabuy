"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Clock3,
  ExternalLink,
  ShieldCheck,
  Star,
  TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { gooeyToast } from "@/components/ui/goey-toaster";
import { Separator } from "@/components/ui/separator";

interface StatCard {
  icon: LucideIcon;
  iconClass: string;
  label: string;
  sub: string;
  subClass?: string;
}

const statCards: StatCard[] = [
  {
    icon: TrendingDown,
    iconClass: "bg-emerald-500/12 text-emerald-400",
    label: "Price near low",
    sub: "$299 / 12-mo low",
  },
  {
    icon: ShieldCheck,
    iconClass: "bg-sky-500/14 text-sky-300",
    label: "Review trust",
    sub: "Verified / 4.7 / 5",
  },
  {
    icon: Clock3,
    iconClass: "bg-orange-500/14 text-orange-300",
    label: "AI verdict",
    sub: "Buy now",
    subClass: "text-emerald-400",
  },
];

export default function ExtensionCTA() {
  const showInstallToast = () => {
    gooeyToast.info("Chrome extension coming soon", {
      description: "The Chrome Web Store link will be added here.",
      duration: 2600,
      preset: "subtle",
      showProgress: false,
      showTimestamp: false,
    });
  };

  const showHowItWorksToast = () => {
    gooeyToast.info("Extension checks product pages automatically", {
      description: "It reads price history, review quality, trust signals, and alternatives before you buy.",
      preset: "subtle",
    });
  };

  return (
    <section id="extension" className="mb-14 w-full scroll-mt-28 md:mb-16">
      <div
        className="relative w-full overflow-hidden rounded-[28px] border border-white/10 bg-[#0c0c10] px-5 py-8 shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:px-8 md:px-10 md:py-10"
        style={{
          background:
            "radial-gradient(circle at 88% 12%, rgba(251,146,60,0.24), transparent 34%), radial-gradient(circle at 12% 92%, rgba(20,184,166,0.11), transparent 36%), linear-gradient(135deg, #0c0c10 0%, #15110d 46%, #090a0f 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.55'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10">
          <Badge
            variant="outline"
            className="mb-5 h-auto gap-2 rounded-full border-white/12 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-white/55 backdrop-blur-md hover:bg-white/[0.08]"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-orange-500 opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
            </span>
            Browser extension
          </Badge>

          <div className="mb-8 grid items-center gap-6 md:grid-cols-[1.05fr_0.95fr]">
            <h2 className="text-[44px] font-extrabold leading-[0.96] tracking-normal text-[#f8f4ee] sm:text-[54px] lg:text-[58px]">
              Shop
              <br />
              smarter.
              <br />
              <span className="inline-block whitespace-nowrap bg-[linear-gradient(135deg,#fb923c_0%,#f59e0b_100%)] bg-clip-text text-transparent">
                Way faster.
              </span>
            </h2>

            <div className="flex flex-col gap-4">
              <p className="text-base font-normal leading-relaxed text-[#f8f4ee]/55">
                Get AI-powered buy, wait, or avoid signals the moment you land
                on a product page, backed by price history, review quality, and
                trust signals.
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  type="button"
                  size="lg"
                  className="h-11 rounded-[10px] bg-orange-500 px-5 text-[15px] font-bold text-white hover:-translate-y-px hover:bg-orange-600 hover:shadow-[0_10px_24px_rgba(249,115,22,0.3)]"
                  onClick={showInstallToast}
                >
                  Add to Chrome
                  <ArrowRight
                    data-icon="inline-end"
                    className="size-4"
                    aria-hidden="true"
                  />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="h-11 rounded-[10px] border-white/14 bg-transparent px-[18px] text-[15px] font-semibold text-[#f8f4ee]/55 hover:bg-white/[0.04] hover:text-[#f8f4ee]/80"
                  onClick={showHowItWorksToast}
                >
                  How it works
                  <ExternalLink
                    data-icon="inline-end"
                    className="size-3.5"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {statCards.map((card) => {
              const Icon = card.icon;

              return (
                <div
                  key={card.label}
                  className="flex cursor-default items-center gap-3 rounded-2xl border border-white/9 bg-white/[0.038] px-4 py-3 transition duration-200 hover:-translate-y-0.5 hover:border-white/15 hover:bg-white/[0.065]"
                >
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-[10px] ${card.iconClass}`}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>

                  <div className="min-w-0">
                    <p className="mb-0.5 text-[13px] font-bold leading-tight text-[#f8f4ee]/75">
                      {card.label}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        card.subClass ?? "text-[#f8f4ee]/32"
                      }`}
                    >
                      {card.sub}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Separator className="my-7 bg-white/7" />

          <div className="flex flex-wrap items-center justify-between gap-4 text-[13px] font-medium text-[#f8f4ee]/30">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Free</span>
              <span>No account needed</span>
              <span>Works on 50+ sites</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-0.5 text-primary-container">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-3.5 fill-current"
                    aria-hidden="true"
                  />
                ))}
              </div>
              <span>4,200+ users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
