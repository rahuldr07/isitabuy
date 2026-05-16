import Link from "next/link";
import { Menu, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";

const mainNavItems = [
  { label: "How it Works", href: "/#how-it-works" },
  { label: "Deals", href: "/deals" },
  { label: "Best Products", href: "/best-laptops" },
  { label: "Compare", href: "/compare" },
  // { label: "Extension", href: "/#extension" },
];

interface SimpleNavProps {
  variant?: "fixed" | "sticky";
}

const positionClasses = {
  fixed: "fixed top-0",
  sticky: "sticky top-0",
};

export default function SimpleNav({ variant = "sticky" }: SimpleNavProps) {
  return (
    <header
      className={cn(
        positionClasses[variant],
        "w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm border-b border-surface-variant/50"
      )}
    >
      <div className="flex h-16 md:h-20 items-center justify-between max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
        <Link
          href="/"
          aria-label="IsItABuy AI home"
          className="flex min-w-0 items-center gap-2"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-primary-container/10 text-primary-container sm:size-9">
            <ShoppingBag className="size-4 sm:size-5" aria-hidden="true" />
          </span>
          <span className="truncate text-lg font-bold text-on-surface tracking-tight sm:text-xl">
            IsItABuy AI
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden lg:flex items-center gap-1 xl:gap-2"
        >
          {mainNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="font-label-sm text-label-sm text-secondary hover:text-on-surface hover:bg-surface-container-high px-3 py-2 rounded-lg transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          <details className="relative lg:hidden">
            <summary
              aria-label="Open navigation menu"
              className="flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg text-secondary hover:text-on-surface hover:bg-surface-container-high transition-colors [&::-webkit-details-marker]:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-12 z-50 w-56 rounded-xl border border-surface-variant/60 bg-surface p-2 shadow-premium">
              {mainNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-sm font-semibold text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/signin"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors sm:hidden"
              >
                Login
              </Link>
              <Link
                href="/search"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-secondary hover:bg-surface-container-high hover:text-on-surface transition-colors min-[420px]:hidden"
              >
                Get Started
              </Link>
            </div>
          </details>
          <Link
            href="/signin"
            className="hidden sm:inline-flex h-10 items-center rounded-lg px-4 text-sm font-semibold text-secondary hover:text-on-surface hover:bg-surface-container-high transition-colors"
          >
            Login
          </Link>
          <Link
            href="/search"
            className="hidden h-10 items-center rounded-lg bg-slate-900 px-3 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition-colors min-[420px]:inline-flex sm:px-5 sm:text-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}
