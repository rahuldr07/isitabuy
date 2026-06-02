"use client";

import {
  BadgeCheck,
  Bell,
  CheckCircle2,
  ScanLine,
  SearchCheck,
  Sparkles,
} from "lucide-react";
import { gooeyToast, type GooeyToastOptions } from "@/components/ui/goey-toaster";

const toastClassNames: GooeyToastOptions["classNames"] = {
  wrapper: "font-sans",
  header: "!items-center !gap-2",
  title:
    "font-heading !text-[13px] !font-bold !leading-none !tracking-normal !text-slate-900",
  description:
    "!mt-3 max-w-[255px] !text-[12px] !leading-[1.55] !text-slate-500",
  icon: "shrink-0 bg-transparent",
  actionButton:
    "rounded-full bg-slate-950 px-3 py-1.5 text-[11px] font-bold text-white",
};

const sharedToast: GooeyToastOptions = {
  classNames: toastClassNames,
  fillColor: "#fffdfa",
  borderColor: "#eee7dc",
  borderWidth: 1,
  duration: 3000,
  preset: "smooth",
  spring: true,
  bounce: 0.12,
  showProgress: false,
  showTimestamp: false,
};

function showToast(title: string, options: GooeyToastOptions) {
  gooeyToast.dismiss();
  return gooeyToast(title, {
    ...sharedToast,
    ...options,
    classNames: {
      ...toastClassNames,
      ...options.classNames,
    },
  });
}

export function showChromeToast() {
  return showToast("Chrome extension is coming soon", {
    description: "We will add the Chrome Web Store link here.",
    icon: <BadgeCheck className="size-4 text-[#1459D9]" aria-hidden="true" />,
  });
}

export function showProductSearchToast(productQuery: string) {
  return showToast("Checking product", {
    description: productQuery
      ? `Analyzing ${productQuery} for price, reviews, and value.`
      : "Opening product search with demo buying signals.",
    icon: <SearchCheck className="size-4 text-emerald-600" aria-hidden="true" />,
  });
}

export function showFeatureSoonToast(label: string) {
  return showToast(`${label} coming soon`, {
    description: "For now, search by product name or paste a product URL.",
    icon: <ScanLine className="size-4 text-sky-600" aria-hidden="true" />,
  });
}

export function showBuyVerdictToast() {
  return showToast("Strong buy selected", {
    description: "This demo product currently looks good at $299.",
    icon: <CheckCircle2 className="size-4 text-emerald-600" aria-hidden="true" />,
  });
}

export function showAiAnalysisToast() {
  return showToast("AI analysis ready", {
    description: "Price, trust, quality, and value all support the buy verdict.",
    icon: <Sparkles className="size-4 text-value" aria-hidden="true" />,
  });
}

export function showPriceAlertToast() {
  return showToast("Price alert preview", {
    description: "Demo alert: notify me if the price drops below $279.",
    icon: <Bell className="size-4 text-amber-600" aria-hidden="true" />,
  });
}

export function showCompareToast(title: string, description: string) {
  return showToast(title, {
    description,
    icon: <Sparkles className="size-4 text-value" aria-hidden="true" />,
  });
}
