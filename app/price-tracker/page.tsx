"use client";

import Link from "next/link";

import SimpleNav from "../components/SimpleNav";

export default function PriceTrackerPage() {
  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <SimpleNav variant="sticky" />

      <main className="flex-grow max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md w-full flex flex-col gap-stack-lg">
        {/* Header & Breadcrumbs */}
        <section className="flex flex-col gap-stack-sm">
          <nav className="flex items-center gap-2 text-secondary font-label-sm text-label-sm">
            <Link className="hover:text-primary-container transition-colors" href="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="hover:text-primary-container transition-colors cursor-pointer">Electronics</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="hover:text-primary-container transition-colors cursor-pointer">Headphones</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <Link
              className="hover:text-primary-container transition-colors font-semibold"
              href="/product"
            >
              Sony WH-1000XM5
            </Link>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-on-surface font-semibold">Price History</span>
          </nav>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface-container-lowest p-6 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-surface-container-low">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-surface-container-low rounded-lg flex-shrink-0 border border-outline-variant/30 overflow-hidden">
                <img
                  alt="Sony WH-1000XM5"
                  className="w-full h-full object-cover mix-blend-multiply"
                  src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label-sm text-label-sm text-secondary bg-surface-container py-1 px-2 rounded-md">
                    Sony
                  </span>
                  <span className="font-label-sm text-label-sm text-secondary bg-surface-container py-1 px-2 rounded-md">
                    Electronics &gt; Headphones
                  </span>
                </div>
                <h1 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-2">
                  Sony WH-1000XM5 Wireless Noise Canceling Headphones
                </h1>
                <div className="flex items-center gap-2 text-secondary font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-sm">update</span>
                  Prices refreshed 4 minutes ago
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
              <Link
                href="/product"
                className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-full text-on-surface font-label-sm text-label-sm hover:bg-surface-container-low transition-colors whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to AI Verdict
              </Link>
              <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-full text-on-surface font-label-sm text-label-sm hover:bg-surface-container-low transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-sm">compare_arrows</span>
                Compare
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-outline-variant rounded-full text-on-surface font-label-sm text-label-sm hover:bg-surface-container-low transition-colors whitespace-nowrap">
                <span className="material-symbols-outlined text-sm">bookmark</span>
                Save
              </button>
            </div>
          </div>
        </section>

        {/* Main Price Verdict Hero */}
        <section className="flex flex-col gap-6">
          {/* Top Verdict Bar */}
          <div className="bg-surface-container-lowest rounded-2xl shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border-l-4 border-[#16A34A] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col gap-2">
              <div className="bg-[#16A34A]/10 text-[#16A34A] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5 font-label-sm text-label-sm font-bold w-fit">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Great deal
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Today is a strong time to buy.
              </h2>
              <p className="font-body-md text-secondary">
                Near its lowest recorded price. $42 below the 90-day average.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none px-8 py-3 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-xl hover:bg-primary-fixed-dim transition-colors shadow-sm flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">notifications_active</span>
                Set price alert
              </button>
              <button className="flex-1 md:flex-none px-8 py-3 bg-surface-container-low border border-outline-variant text-on-surface font-label-sm text-label-sm rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2">
                View best offer
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </button>
            </div>
          </div>

          {/* Price Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-low shadow-sm">
              <div className="text-secondary font-label-sm text-label-sm mb-1">Current Price</div>
              <div className="text-headline-lg font-bold text-on-surface font-display-xl">$299</div>
              <div className="text-[#16A34A] font-label-sm text-[12px] flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">trending_down</span>
                Best value
              </div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-low shadow-sm">
              <div className="text-secondary font-label-sm text-label-sm mb-1">30-Day Avg.</div>
              <div className="text-headline-lg font-bold text-on-surface">$319</div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-low shadow-sm">
              <div className="text-secondary font-label-sm text-label-sm mb-1">90-Day Avg.</div>
              <div className="text-headline-lg font-bold text-on-surface">$341</div>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-surface-container-low shadow-sm">
              <div className="text-secondary font-label-sm text-label-sm mb-1">Lowest Ever</div>
              <div className="text-headline-lg font-bold text-on-surface">$279</div>
            </div>
          </div>

          {/* Price Trend Chart Placeholder */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl border border-surface-container-low shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Price History Chart
              </h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-label-sm font-label-sm bg-surface-container rounded-md text-secondary">
                  1M
                </button>
                <button className="px-3 py-1 text-label-sm font-label-sm bg-primary-container text-on-primary rounded-md">
                  3M
                </button>
                <button className="px-3 py-1 text-label-sm font-label-sm bg-surface-container rounded-md text-secondary">
                  All
                </button>
              </div>
            </div>
            <div className="w-full h-64 bg-surface-container-low/30 rounded-xl border border-dashed border-outline-variant flex items-center justify-center relative overflow-hidden">
              <svg
                className="w-full h-full px-4"
                preserveAspectRatio="none"
                viewBox="0 0 100 100"
              >
                <path
                  d="M0,80 Q25,75 40,50 T70,40 T100,20"
                  fill="none"
                  stroke="#855300"
                  strokeWidth="2"
                />
                <path
                  d="M0,80 Q25,75 40,50 T70,40 T100,20 V100 H0 Z"
                  fill="url(#chartGradient)"
                  opacity="0.1"
                />
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0%"
                    x2="0%"
                    y1="0%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "#855300", stopOpacity: 1 }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "#855300", stopOpacity: 0 }}
                    />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-secondary/50 font-label-sm">
                Price over time visualization
              </div>
            </div>
          </div>

          {/* Retailer Comparison */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container-low shadow-sm overflow-hidden">
            <div className="p-6 border-b border-surface-container-low">
              <h3 className="font-headline-md text-headline-md text-on-surface">
                Compare Retailers
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="p-4 font-label-sm text-label-sm text-secondary">
                      Retailer
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-secondary">
                      Price
                    </th>
                    <th className="p-4 font-label-sm text-label-sm text-secondary">
                      Stock
                    </th>
                    <th className="p-4 text-right"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container-low">
                  <tr className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-[10px]">
                        AMZ
                      </div>
                      <span className="font-body-md text-on-surface">Amazon</span>
                    </td>
                    <td className="p-4 font-bold text-on-surface text-body-lg">
                      $299.00
                    </td>
                    <td className="p-4 text-[#16A34A] font-label-sm">In Stock</td>
                    <td className="p-4 text-right">
                      <button className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-sm text-label-sm hover:opacity-90 transition-opacity">
                        View Deal
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-[10px]">
                        BBY
                      </div>
                      <span className="font-body-md text-on-surface">Best Buy</span>
                    </td>
                    <td className="p-4 font-bold text-on-surface text-body-lg">
                      $329.99
                    </td>
                    <td className="p-4 text-[#16A34A] font-label-sm">In Stock</td>
                    <td className="p-4 text-right">
                      <button className="border border-outline text-primary px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low transition-colors">
                        View Deal
                      </button>
                    </td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center font-bold text-[10px]">
                        WMT
                      </div>
                      <span className="font-body-md text-on-surface">Walmart</span>
                    </td>
                    <td className="p-4 font-bold text-on-surface text-body-lg">
                      $329.00
                    </td>
                    <td className="p-4 text-secondary font-label-sm">Low Stock</td>
                    <td className="p-4 text-right">
                      <button className="border border-outline text-primary px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low transition-colors">
                        View Deal
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full mt-stack-lg bg-surface-container-lowest border-t border-outline-variant">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-gutter py-stack-md max-w-container-max mx-auto">
          <div className="flex flex-col gap-4 col-span-1 md:col-span-1">
            <span className="font-headline-md text-headline-md font-bold text-on-surface">
              IsItABuy AI
            </span>
            <p className="font-body-md text-body-md text-secondary">
              &copy; 2024 IsItABuy AI. All rights reserved.{" "}
              <br className="hidden md:block" />
              We may earn a commission from some links. Our price verdicts, AI
              scores, and recommendations are not based on commission.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <a
              className="text-secondary hover:text-primary-container font-body-md text-body-md transition-all"
              href="#"
            >
              How It Works
            </a>
            <a
              className="text-secondary hover:text-primary-container font-body-md text-body-md transition-all"
              href="#"
            >
              Browser Extension
            </a>
            <span className="text-on-surface font-semibold font-body-md text-body-md transition-all">
              Price Tracker
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              className="text-secondary hover:text-primary-container font-body-md text-body-md transition-all"
              href="/compare"
            >
              Compare
            </Link>
            <a
              className="text-secondary hover:text-primary-container font-body-md text-body-md transition-all"
              href="#"
            >
              About Us
            </a>
            <a
              className="text-secondary hover:text-primary-container font-body-md text-body-md transition-all"
              href="#"
            >
              Contact Support
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <a
              className="text-secondary hover:text-primary-container font-body-md text-body-md transition-all"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-secondary hover:text-primary-container font-body-md text-body-md transition-all"
              href="#"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
