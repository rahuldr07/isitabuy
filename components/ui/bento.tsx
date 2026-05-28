import * as React from "react";

import { cn } from "@/lib/utils";

type BentoVariant = "default" | "muted" | "accent" | "success" | "warning";

function BentoGrid({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "grid-flow-dense grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4",
        className,
      )}
      {...props}
    />
  );
}

function BentoCard({
  className,
  featured = false,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  featured?: boolean;
  variant?: BentoVariant;
}) {
  return (
    <div
      className={cn(
        "group/bento relative min-w-0 overflow-hidden rounded-2xl border bg-white text-foreground shadow-[0_14px_34px_rgba(15,23,42,0.07)] transition-[background-color,border-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-[#f3d7ba] hover:bg-[#fffaf4] hover:shadow-[0_20px_44px_rgba(15,23,42,0.12)]",
        variant === "default" && "border-border/80",
        variant === "muted" && "border-slate-200 bg-[#f8fafc]",
        variant === "accent" && "border-[#e5d6f2] bg-[#fbf7ff]",
        variant === "success" && "border-[#c7ead1] bg-[#f4fbf6]",
        variant === "warning" && "border-[#fde0b5] bg-[#fff8ec]",
        featured && "xl:col-span-2",
        className,
      )}
      {...props}
    />
  );
}

export { BentoCard, BentoGrid };
