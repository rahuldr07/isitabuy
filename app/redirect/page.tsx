import Link from "next/link";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const retailerLabels: Record<string, string> = {
  bestbuy: "Best Buy",
  "best-buy": "Best Buy",
  amazon: "Amazon",
  walmart: "Walmart",
  target: "Target",
  ebay: "eBay",
  "home-depot": "Home Depot",
  flipkart: "Flipkart",
  myntra: "Myntra",
  meesho: "Meesho",
};

export default async function RedirectPage({
  searchParams,
}: {
  searchParams?: Promise<{ retailer?: string | string[]; product?: string | string[] }>;
}) {
  const params = await searchParams;
  const retailerParam = Array.isArray(params?.retailer) ? params?.retailer[0] : params?.retailer;
  const productParam = Array.isArray(params?.product) ? params?.product[0] : params?.product;
  const retailer = retailerLabels[retailerParam ?? ""] ?? "retailer";
  const product = productParam?.replaceAll("-", " ") ?? "this product";

  return (
    <main className="grid min-h-screen place-items-center bg-[#f7f9fc] px-4 py-10 text-[var(--isitabuy-ink)]">
      <Card className="w-full max-w-lg rounded-[1.35rem] border border-[var(--isitabuy-line)] bg-white shadow-[var(--isitabuy-card-shadow)]">
        <CardContent className="p-6 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[var(--isitabuy-green-soft)] text-emerald-700">
            <ExternalLink className="size-6" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-bold">Retailer redirect preview</h1>
          <p className="mt-3 text-sm font-semibold leading-6 text-[var(--isitabuy-muted)]">
            IsItABuy would open {retailer} for {product}. This prototype keeps you on a safe preview page.
          </p>
          <div className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-bold text-[var(--isitabuy-muted)]">
            <ShieldCheck className="size-4 text-emerald-600" aria-hidden="true" />
            Scores and recommendations are not based on commission.
          </div>
          <Button asChild className="mt-6 h-11 rounded-full bg-[var(--isitabuy-orange)] px-5 text-sm font-bold text-white hover:bg-[var(--isitabuy-orange-dark)]">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
