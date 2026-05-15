import Link from "next/link";
import { RefreshCw, ShieldCheck, ShoppingBag } from "lucide-react";

export default function DealsWorthSection() {
  return (
    <section className="mx-auto mb-24 w-full max-w-5xl">
      <div className="max-w-4xl">
        <h2 className="mb-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-on-surface sm:text-5xl md:text-6xl">
          Deals that are actually worth it
        </h2>
        <p className="mb-8 max-w-4xl text-base leading-relaxed text-on-surface-variant sm:text-lg md:text-xl">
          AI-ranked deals based on price history, current retailer offers, AI Buy
          Score, review trust, and real value - not inflated discounts.
        </p>

        <div className="mb-9 flex flex-col gap-4 text-sm font-semibold text-on-surface sm:flex-row sm:items-center">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-surface-variant bg-white px-5 py-3 shadow-sm">
            <ShieldCheck className="size-5 text-verdict-buy" aria-hidden="true" />
            <span>Deal scores are not based on commission.</span>
          </div>
          <div className="inline-flex items-center gap-3 px-1 py-2 text-on-surface-variant">
            <RefreshCw className="size-5 text-on-surface-variant" aria-hidden="true" />
            <span>Prices refreshed 4 minutes ago</span>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex min-h-16 flex-1 items-center rounded-2xl border border-surface-variant bg-white shadow-sm">
            <ShoppingBag
              className="absolute left-5 size-5 text-on-surface-variant"
              aria-hidden="true"
            />
            <input
              className="h-16 w-full rounded-2xl border-none bg-transparent pl-14 pr-5 text-base text-on-surface outline-none placeholder:text-on-surface-variant/70"
              placeholder="Search deals by product, category, or store..."
              type="text"
            />
          </div>
          <Link
            href="/deals"
            className="inline-flex h-16 items-center justify-center rounded-2xl bg-primary-container px-9 text-base font-bold text-white shadow-sm transition-colors hover:bg-amber-600"
          >
            Search deals
          </Link>
        </div>
      </div>
    </section>
  );
}
