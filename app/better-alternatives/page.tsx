import type { Metadata } from "next";
import Link from "next/link";

import SimpleNav from "../components/SimpleNav";

export const metadata: Metadata = {
  title: "Better Alternatives for Sony WH-1000XM5",
};

export default function BetterAlternativesPage() {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <SimpleNav variant="sticky" />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md">
        {/* Breadcrumbs */}
        <nav className="text-sm text-on-surface-variant mb-8 flex items-center gap-2">
          <Link className="hover:underline" href="/">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <a className="hover:underline" href="#">Electronics</a>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <a className="hover:underline" href="#">Headphones</a>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <a className="hover:underline" href="#">Sony WH-1000XM5</a>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="font-semibold text-on-surface">Better Alternatives</span>
        </nav>

        {/* Page Header */}
        <div className="mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="font-display-xl text-display-xl text-on-surface mb-2">Better alternatives</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Compare smarter options based on AI analysis.</p>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-full border border-outline-variant">
            <span className="material-symbols-outlined text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Recommendations are not based on commission</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
          {/* Left Column (Canvas) */}
          <div className="lg:col-span-8 flex flex-col gap-stack-lg">
            {/* Current Product Summary */}
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant flex flex-col sm:flex-row items-center gap-6">
              <img
                alt="Sony WH-1000XM5"
                className="w-24 h-24 object-cover rounded-lg bg-surface-container-low"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCDrOXaVy3CN5LWrJ81COV_ZIBdV3RCkwAKlaDDLreXOdoEGzYPPnI5k4URFa8sVgJcza1PoHGCOxGwQeSz1TqpcmSwX9mFM-zwuW7XLKONMSD8ce5rA_IINh5386J4QOpCCYbEvWiKXWBjfLu4zuQGHMaS_IHSRfR5yMdCO470dNXsgD685CtEJCFfJwf-s99OIDsoMjETU6cnwOKiCXH5X7toiMsy7cI_vcdPs58JYHAxlgFY8l068hQqpsIsgJmt7ZAkne51z4"
              />
              <div className="flex-grow text-center sm:text-left">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Current Subject</p>
                <h2 className="font-headline-md text-headline-md text-on-surface">Sony WH-1000XM5</h2>
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                  <span className="font-body-lg text-body-lg text-on-surface font-semibold">$299</span>
                  <span className="text-outline-variant">|</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">AI Buy Score: <strong>86</strong></span>
                </div>
              </div>
              <div className="shrink-0 flex items-center justify-center bg-[#16A34A] text-white px-6 py-3 rounded-lg font-label-sm text-label-sm gap-2">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                Verdict: Buy
              </div>
            </section>

            {/* Hero Alternative */}
            <section className="bg-[#111827] rounded-xl p-8 shadow-lg relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <span className="material-symbols-outlined text-[120px]">auto_awesome</span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-[#16A34A]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                  <span className="font-label-sm text-label-sm text-[#16A34A] uppercase tracking-wider">Best Alternative Found</span>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="w-full md:w-1/3">
                    <img
                      alt="Sennheiser Momentum 4"
                      className="w-full aspect-square object-cover rounded-lg bg-surface-container"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUrImIw32V1CciVqZeH2dSgC9ZwjyHF2hpicrDD3fJ42qra7LfUcIzNIKCarCaSv1Q6xkQWlwovPSdikPp7or4nOJnpt88CAIiqY-hw2KLx4uvDzuTjQBL0c3_0gy9tXA13yCQPXrXiG2BvFw7sNvba5Ub2RVyL-FADv_FyDCMA33mVrg0XWoE-tkiDzWIKHDbTw6wHbWm1wJFByyr61RflxP7I84jNCDalDJviWln6bNSqDLwiNqdjrk9LIoJlWk-5uVNzr04r-w"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-display-xl text-display-xl mb-4">Sennheiser Momentum 4</h3>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-1">Price</p>
                        <p className="font-headline-md text-headline-md">$279</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-sm text-gray-400 mb-1">Savings</p>
                        <p className="font-headline-md text-headline-md text-[#16A34A]">Save $20</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4 col-span-2 flex justify-between items-center">
                        <span className="text-sm text-gray-400">AI Score</span>
                        <span className="font-headline-lg text-headline-lg text-[#16A34A]">88<span className="text-lg text-gray-400">/100</span></span>
                      </div>
                    </div>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-[#16A34A] text-[18px]">check</span>
                        Superior battery life (60 hours)
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <span className="material-symbols-outlined text-[#16A34A] text-[18px]">check</span>
                        More analytical sound profile
                      </li>
                    </ul>
                    <button className="bg-primary-container text-white px-6 py-3 rounded-lg font-label-sm text-label-sm hover:bg-amber-600 transition-colors w-full sm:w-auto">
                      View Full Details
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Category Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
              <button className="shrink-0 bg-surface-container-high text-on-surface px-4 py-2 rounded-full font-label-sm text-label-sm border border-transparent">Best Match</button>
              <button className="shrink-0 bg-surface-container-lowest text-on-surface-variant px-4 py-2 rounded-full font-label-sm text-label-sm border border-outline-variant hover:bg-surface-container-low transition-colors">Similar Price</button>
              <button className="shrink-0 bg-surface-container-lowest text-on-surface-variant px-4 py-2 rounded-full font-label-sm text-label-sm border border-outline-variant hover:bg-surface-container-low transition-colors">Slightly More</button>
              <button className="shrink-0 bg-surface-container-lowest text-on-surface-variant px-4 py-2 rounded-full font-label-sm text-label-sm border border-outline-variant hover:bg-surface-container-low transition-colors">Cheaper Option</button>
              <button className="shrink-0 bg-surface-container-lowest text-on-surface-variant px-4 py-2 rounded-full font-label-sm text-label-sm border border-outline-variant hover:bg-surface-container-low transition-colors">Premium Upgrade</button>
            </div>

            {/* 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-surface-container px-2 py-1 rounded text-xs text-on-surface-variant font-semibold">Best similar-price</span>
                  <span className="font-headline-md text-headline-md text-[#16A34A]">88</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-1">Sennheiser Momentum 4</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">$279 <span className="text-[#16A34A] text-sm ml-2">Save $20</span></p>
                <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
                  <a className="text-primary hover:underline font-label-sm text-label-sm flex items-center gap-1" href="#">Compare <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
                </div>
              </div>
              {/* Card 2 */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-surface-container px-2 py-1 rounded text-xs text-on-surface-variant font-semibold">Slightly More</span>
                  <span className="font-headline-md text-headline-md text-on-surface">84</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-1">Bose QuietComfort Ultra</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">$379 <span className="text-error text-sm ml-2">+$80</span></p>
                <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
                  <a className="text-primary hover:underline font-label-sm text-label-sm flex items-center gap-1" href="#">Compare <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-surface-container px-2 py-1 rounded text-xs text-on-surface-variant font-semibold">Cheaper Option</span>
                  <span className="font-headline-md text-headline-md text-on-surface">81</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-1">Soundcore Space Q45</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">$129 <span className="text-[#16A34A] text-sm ml-2">Save $170</span></p>
                <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
                  <a className="text-primary hover:underline font-label-sm text-label-sm flex items-center gap-1" href="#">Compare <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
                </div>
              </div>
              {/* Card 4 */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-surface-container px-2 py-1 rounded text-xs text-on-surface-variant font-semibold">Premium Upgrade</span>
                  <span className="font-headline-md text-headline-md text-on-surface">79</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-1">Bowers &amp; Wilkins Px8</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-4">$599 <span className="text-error text-sm ml-2">+$300</span></p>
                <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center">
                  <a className="text-primary hover:underline font-label-sm text-label-sm flex items-center gap-1" href="#">Compare <span className="material-symbols-outlined text-[16px]">arrow_forward</span></a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Sticky Context) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-[88px] flex flex-col gap-6">
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-surface-variant">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4 border-b border-outline-variant pb-2">Best Pick Summary</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    alt="Sennheiser Momentum 4"
                    className="w-16 h-16 rounded object-cover bg-surface-container"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxx6mkjMlSWowtEWBGI5mCbNiwevlRBzkY7g9geugI8t8cOcdi_dpEVq6kg0ogCvRXJkl3ozljcBu1sX2lCbx0xn3SFgAFxwi6vv2FPU36DjuOoEClLB4jspVxBkvVfPA8W55hr6F8r3MLVHS_nUaR83zmqAOq-7IGPXNRE6vADB3EK9qzAT_RncPGaY5g5qslpCgfd7IHOVduOnfOp8uHwjosEvoPf3wOet4PR4mF1i0R1HmdmNGzUvds7JDpALPchXa-zcsXo3M"
                  />
                  <div>
                    <h4 className="font-body-md text-body-md font-semibold text-on-surface">Sennheiser Momentum 4</h4>
                    <p className="text-sm text-on-surface-variant">$279</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <a className="flex items-center justify-between p-3 border border-outline-variant rounded-lg hover:border-primary transition-colors" href="#">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant">storefront</span>
                      <span className="text-sm font-semibold">Amazon</span>
                    </span>
                    <span className="text-sm">$279</span>
                  </a>
                  <a className="flex items-center justify-between p-3 border border-outline-variant rounded-lg hover:border-primary transition-colors" href="#">
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant">storefront</span>
                      <span className="text-sm font-semibold">Best Buy</span>
                    </span>
                    <span className="text-sm">$279</span>
                  </a>
                </div>
                <div className="text-xs text-center text-on-surface-variant flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">info</span>
                  Non-affiliate link available
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-stack-lg">
        <div className="w-full py-stack-md px-gutter max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center opacity-80 hover:opacity-100">
          <div className="text-headline-md font-headline-md text-on-surface-variant mb-4 md:mb-0">
            IsItABuy AI
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a className="text-on-surface-variant font-body-md text-body-md hover:text-primary underline transition-all" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant font-body-md text-body-md hover:text-primary underline transition-all" href="#">Terms of Service</a>
            <a className="text-on-surface-variant font-body-md text-body-md hover:text-primary underline transition-all" href="#">Contact Support</a>
            <a className="text-on-surface-variant font-body-md text-body-md hover:text-primary underline transition-all" href="#">About AI Verdicts</a>
          </nav>
          <div className="mt-4 md:mt-0 font-body-md text-body-md text-secondary text-center md:text-right">
            © 2026 IsItABuy AI Advisor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
