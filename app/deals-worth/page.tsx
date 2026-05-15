import type { Metadata } from "next";
import Link from "next/link";

import SimpleNav from "../components/SimpleNav";

export const metadata: Metadata = {
  title: "Deals that are actually worth it - IsItABuy AI",
};

export default function DealsWorthPage() {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col pt-20">
      {/* TopNavBar */}
      <SimpleNav variant="fixed" />

      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter pt-stack-sm pb-stack-lg">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-2 text-label-sm text-on-surface-variant mb-stack-md">
          <Link className="hover:text-primary" href="/">Home</Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="text-on-surface font-semibold">Deals</span>
        </nav>

        {/* Hero Section */}
        <section className="flex flex-col md:flex-row gap-stack-md items-start justify-between mb-stack-lg">
          <div className="max-w-2xl w-full">
            <h1 className="font-display-xl text-display-xl text-on-surface mb-4">Deals that are actually worth it</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-6">AI-ranked deals based on price history, current retailer offers, AI Buy Score, review trust, and real value — not inflated discounts.</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-8">
              <div className="flex items-center text-label-sm bg-surface-container-lowest px-4 py-2 rounded-full shadow-sm border border-surface-variant">
                <span className="material-symbols-outlined text-[18px] text-verdict-buy mr-2" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                Deal scores are not based on commission.
              </div>
              <div className="flex items-center text-label-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] mr-2">update</span>
                Prices refreshed 4 minutes ago
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="relative flex-grow">
                <span className="material-symbols-outlined absolute left-4 top-1/2 transform -translate-y-1/2 text-on-surface-variant">shopping_bag</span>
                <input className="w-full pl-12 pr-4 h-14 bg-surface-container-lowest border border-surface-variant rounded-xl shadow-inner focus:ring-2 focus:ring-primary-container focus:border-transparent text-body-md" placeholder="Search deals by product, category, or store..." type="text" />
              </div>
              <button className="bg-primary-container text-white h-14 px-8 rounded-xl font-label-sm text-label-sm hover:bg-opacity-90 transition-colors shadow-sm whitespace-nowrap">
                Search deals
              </button>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="flex flex-col md:flex-row gap-gutter relative items-start">
          {/* Left Sidebar (Filters) */}
          <aside className="w-full md:w-72 shrink-0 sticky top-24 bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-surface-variant/40">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-surface-variant/20">
              <h2 className="font-headline-md text-[20px] text-on-surface tracking-tight">Filters</h2>
              <button className="text-label-sm text-primary hover:text-primary/80 transition-colors font-semibold">Clear all</button>
            </div>
            <div className="space-y-9">
              {/* Verdict Section */}
              <div>
                <h3 className="font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant/70 font-bold mb-5 flex items-center">
                  <span className="material-symbols-outlined text-[18px] mr-2 opacity-70">verified</span> Verdict
                </h3>
                <div className="space-y-4">
                  <label className="group flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="relative flex items-center justify-center">
                        <input defaultChecked className="peer appearance-none h-5 w-5 border-2 border-surface-variant rounded-md checked:bg-primary-container checked:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all cursor-pointer" type="checkbox" />
                        <span className="material-symbols-outlined absolute text-white text-[14px] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                      </div>
                      <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Buy</span>
                    </div>
                    <span className="text-[12px] font-semibold text-verdict-buy px-2 py-0.5 bg-verdict-buy/5 rounded border border-verdict-buy/10">84</span>
                  </label>
                  <label className="group flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="relative flex items-center justify-center">
                        <input className="peer appearance-none h-5 w-5 border-2 border-surface-variant rounded-md checked:bg-primary-container checked:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all cursor-pointer" type="checkbox" />
                        <span className="material-symbols-outlined absolute text-white text-[14px] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                      </div>
                      <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Wait</span>
                    </div>
                    <span className="text-[12px] font-semibold text-verdict-wait px-2 py-0.5 bg-verdict-wait/5 rounded border border-verdict-wait/10">12</span>
                  </label>
                  <label className="group flex items-center justify-between cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <div className="relative flex items-center justify-center">
                        <input className="peer appearance-none h-5 w-5 border-2 border-surface-variant rounded-md checked:bg-primary-container checked:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all cursor-pointer" type="checkbox" />
                        <span className="material-symbols-outlined absolute text-white text-[14px] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                      </div>
                      <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">Avoid</span>
                    </div>
                    <span className="text-[12px] font-semibold text-verdict-avoid px-2 py-0.5 bg-verdict-avoid/5 rounded border border-verdict-avoid/10">3</span>
                  </label>
                </div>
              </div>
              {/* AI Buy Score Section */}
              <div>
                <h3 className="font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant/70 font-bold mb-5 flex items-center">
                  <span className="material-symbols-outlined text-[18px] mr-2 opacity-70">auto_awesome</span> AI Buy Score
                </h3>
                <div className="flex p-1 bg-surface-container-low rounded-xl border border-surface-variant/20">
                  <button className="flex-1 py-2 px-1 rounded-lg text-label-sm text-on-surface-variant hover:text-on-surface transition-all">90+</button>
                  <button className="flex-1 py-2 px-1 rounded-lg bg-primary-container text-white shadow-sm font-bold text-label-sm transition-all transform scale-105">80+</button>
                  <button className="flex-1 py-2 px-1 rounded-lg text-on-surface-variant hover:text-on-surface transition-all">70+</button>
                </div>
              </div>
              {/* Retailer Section */}
              <div>
                <h3 className="font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant/70 font-bold mb-5 flex items-center">
                  <span className="material-symbols-outlined text-[18px] mr-2 opacity-70">storefront</span> Retailer
                </h3>
                <div className="space-y-4">
                  {["Amazon", "Walmart", "Best Buy", "Target"].map((store) => (
                    <label key={store} className="group flex items-center space-x-3 cursor-pointer">
                      <div className="relative flex items-center justify-center">
                        <input className="peer appearance-none h-5 w-5 border-2 border-surface-variant rounded-md checked:bg-primary-container checked:border-primary-container focus:ring-2 focus:ring-primary-container/20 transition-all cursor-pointer" type="checkbox" />
                        <span className="material-symbols-outlined absolute text-white text-[14px] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none">check</span>
                      </div>
                      <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">{store}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Price Section */}
              <div>
                <h3 className="font-label-sm text-[12px] uppercase tracking-widest text-on-surface-variant/70 font-bold mb-5 flex items-center">
                  <span className="material-symbols-outlined text-[18px] mr-2 opacity-70">payments</span> Price
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[14px] font-bold">$</span>
                      <input className="w-full pl-6 pr-3 py-2 bg-surface-container-low border border-surface-variant/30 rounded-lg focus:ring-2 focus:ring-primary-container text-body-md" placeholder="Min" type="number" />
                    </div>
                    <span className="text-on-surface-variant/30">—</span>
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[14px] font-bold">$</span>
                      <input className="w-full pl-6 pr-3 py-2 bg-surface-container-low border border-surface-variant/30 rounded-lg focus:ring-2 focus:ring-primary-container text-body-md" placeholder="Max" type="number" />
                    </div>
                  </div>
                  <button className="w-full py-2 bg-surface border border-surface-variant/40 rounded-lg text-label-sm font-semibold text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface transition-all">Apply Range</button>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Column (Deals) */}
          <div className="flex-grow flex flex-col space-y-stack-md w-full overflow-hidden">
            {/* Featured Deal */}
            <section>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Featured Best Deal</h2>
              <div className="bg-surface-container-lowest rounded-2xl shadow-md border-l-4 border-verdict-buy p-6 md:p-8 flex flex-col md:flex-row gap-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-verdict-buy/10 text-verdict-buy px-3 py-1 rounded-full flex items-center font-label-sm text-label-sm border border-verdict-buy/20">
                  <span className="material-symbols-outlined text-[16px] mr-1" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                  Great deal
                </div>
                <div className="w-full md:w-1/3 aspect-square rounded-xl bg-surface-container-low flex items-center justify-center relative overflow-hidden">
                  <div className="w-full h-full bg-surface-variant rounded-xl flex items-center justify-center text-on-surface-variant">
                    <span className="material-symbols-outlined text-4xl">headphones</span>
                  </div>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-0.5 bg-surface-container-low text-on-surface-variant text-[12px] font-semibold rounded uppercase tracking-wider">Electronics</span>
                  </div>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface mb-2">Sony WH-1000XM5</h3>
                  <div className="flex items-baseline space-x-3 mb-6">
                    <span className="font-display-xl text-[36px] text-on-surface font-bold">$299</span>
                    <span className="text-body-md text-on-surface-variant line-through">$398</span>
                    <span className="text-label-sm text-verdict-buy bg-verdict-buy/10 px-2 py-0.5 rounded-full border border-verdict-buy/20">25% off</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-surface p-4 rounded-xl border border-surface-variant/30 flex flex-col items-center justify-center text-center">
                      <div className="text-[12px] font-semibold text-on-surface-variant mb-1 flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">auto_awesome</span> AI Buy Score</div>
                      <div className="font-headline-md text-headline-md text-verdict-buy">86/100</div>
                    </div>
                    <div className="bg-surface p-4 rounded-xl border border-surface-variant/30 flex flex-col items-center justify-center text-center">
                      <div className="text-[12px] font-semibold text-on-surface-variant mb-1 flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">trending_down</span> Price Score</div>
                      <div className="font-headline-md text-headline-md text-verdict-buy">92/100</div>
                    </div>
                    <div className="bg-surface p-4 rounded-xl border border-surface-variant/30 flex flex-col items-center justify-center text-center">
                      <div className="text-[12px] font-semibold text-on-surface-variant mb-1 flex items-center"><span className="material-symbols-outlined text-[14px] mr-1">verified_user</span> Review Trust</div>
                      <div className="font-headline-md text-headline-md text-on-surface">88/100</div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-label-sm text-label-sm text-on-surface mb-2">Why this is a good deal:</h4>
                    <p className="text-body-md text-on-surface-variant">This is the lowest price seen in the last 6 months. It&apos;s a genuine discount, not an inflated MSRP trick. Reviews are highly verified and positive for noise cancellation and comfort.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-primary-container text-white h-12 px-8 rounded-xl font-label-sm text-label-sm hover:bg-opacity-90 transition-colors shadow-sm">
                      View Deal at Amazon
                    </button>
                    <button className="bg-surface text-on-surface h-12 px-8 rounded-xl font-label-sm text-label-sm border border-surface-variant hover:bg-surface-container-low transition-colors">
                      View AI Analysis
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Deal Tabs */}
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-margin-mobile px-margin-mobile md:mx-0 md:px-0">
              <button className="px-5 py-2 rounded-full bg-on-surface text-surface font-label-sm text-label-sm whitespace-nowrap">All deals</button>
              <button className="px-5 py-2 rounded-full bg-surface-container-lowest border border-surface-variant text-on-surface-variant hover:bg-surface-container-low font-label-sm text-label-sm whitespace-nowrap transition-colors">Electronics</button>
              <button className="px-5 py-2 rounded-full bg-surface-container-lowest border border-surface-variant text-on-surface-variant hover:bg-surface-container-low font-label-sm text-label-sm whitespace-nowrap transition-colors">Home</button>
              <button className="px-5 py-2 rounded-full bg-surface-container-lowest border border-surface-variant text-on-surface-variant hover:bg-surface-container-low font-label-sm text-label-sm whitespace-nowrap transition-colors">Beauty</button>
            </div>

            {/* Deal List */}
            <div className="space-y-6">
              {/* Good Deal */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-variant/50 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden transition-all hover:shadow-md">
                <div className="absolute top-4 right-4 bg-verdict-buy/10 text-verdict-buy px-2 py-1 rounded flex items-center font-bold text-[12px] border border-verdict-buy/20">
                  Buy
                </div>
                <div className="w-full md:w-40 aspect-square shrink-0 bg-surface-container-low rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">laptop_mac</span>
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-headline-md text-[20px] text-on-surface font-semibold mb-2">MacBook Air M3</h4>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-headline-md text-[24px] text-on-surface font-bold">$949</span>
                        <span className="text-body-md text-on-surface-variant line-through text-[14px]">$1049</span>
                      </div>
                      <span className="text-label-sm text-verdict-buy bg-verdict-buy/10 px-2 py-0.5 rounded-full border border-verdict-buy/20">10% drop</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-on-surface-variant">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5">30-Day Avg</span>
                        <span className="text-on-surface font-medium">$1029</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5">Lowest Rec.</span>
                        <span className="text-on-surface font-medium">$899</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5 text-verdict-buy">AI Score</span>
                        <span className="text-verdict-buy font-bold">82/100</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5">Store</span>
                        <span className="text-on-surface font-medium">Best Buy</span>
                      </div>
                    </div>
                    <p className="text-[14px] text-on-surface-variant mb-4">Solid discount on the latest M3 model. Price usually holds steady. Good value for current generation hardware.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-primary-container text-white px-6 py-2 rounded-lg font-label-sm text-label-sm hover:bg-opacity-90 transition-colors text-center">
                      View Deal
                    </button>
                    <button className="bg-surface border border-surface-variant px-6 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low transition-colors text-center text-on-surface-variant">
                      View AI Analysis
                    </button>
                    <button className="bg-surface border border-surface-variant px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px] mr-1">notifications</span> Alert
                    </button>
                  </div>
                </div>
              </div>

              {/* Wait Deal */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-variant/50 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden transition-all hover:shadow-md">
                <div className="absolute top-4 right-4 bg-verdict-wait/10 text-verdict-wait px-2 py-1 rounded flex items-center font-bold text-[12px] border border-verdict-wait/20">
                  Wait
                </div>
                <div className="w-full md:w-40 aspect-square shrink-0 bg-surface-container-low rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">vacuum</span>
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-headline-md text-[20px] text-on-surface font-semibold mb-2">Dyson V15 Detect</h4>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-headline-md text-[24px] text-on-surface font-bold">$549</span>
                        <span className="text-body-md text-on-surface-variant line-through text-[14px]">$649</span>
                      </div>
                      <span className="text-label-sm text-verdict-buy bg-verdict-buy/10 px-2 py-0.5 rounded-full border border-verdict-buy/20">15% drop</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-on-surface-variant">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5">30-Day Avg</span>
                        <span className="text-on-surface font-medium">$599</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5">Lowest Rec.</span>
                        <span className="text-on-surface font-medium">$499</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5 text-verdict-wait">AI Score</span>
                        <span className="text-verdict-wait font-bold">65/100</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5">Store</span>
                        <span className="text-on-surface font-medium">Amazon</span>
                      </div>
                    </div>
                    <p className="text-[14px] text-on-surface-variant mb-4">While discounted, this product frequently drops to $499 during major sales events. It&apos;s an okay price, but better deals exist.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-surface border border-surface-variant px-6 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low transition-colors text-center text-on-surface-variant">
                      Compare Alternatives
                    </button>
                    <button className="bg-surface border border-surface-variant px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined text-[18px] mr-1">notifications</span> Set Price Alert
                    </button>
                  </div>
                </div>
              </div>

              {/* Avoid Deal */}
              <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-verdict-avoid/30 p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden transition-all hover:shadow-md">
                <div className="absolute top-4 right-4 bg-verdict-avoid/10 text-verdict-avoid px-2 py-1 rounded flex items-center font-bold text-[12px] border border-verdict-avoid/20">
                  <span className="material-symbols-outlined text-[14px] mr-1">warning</span> Avoid
                </div>
                <div className="w-full md:w-40 aspect-square shrink-0 bg-surface-container-low rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant">videocam</span>
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="font-headline-md text-[20px] text-on-surface font-semibold mb-2">Generic 1080p Mini Projector</h4>
                    <div className="flex items-center space-x-4 mb-3">
                      <div className="flex items-baseline space-x-2">
                        <span className="font-headline-md text-[24px] text-on-surface font-bold">$129</span>
                        <span className="text-body-md text-on-surface-variant line-through text-[14px]">$399</span>
                      </div>
                      <span className="text-label-sm text-verdict-avoid bg-verdict-avoid/10 px-2 py-0.5 rounded-full border border-verdict-avoid/20">Inflated discount</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-on-surface-variant">
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5">30-Day Avg</span>
                        <span className="text-on-surface font-medium">$125</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5">Lowest Rec.</span>
                        <span className="text-on-surface font-medium">$99</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5 text-verdict-avoid">AI Score</span>
                        <span className="text-verdict-avoid font-bold">25/100</span>
                      </div>
                      <div>
                        <span className="block text-[11px] uppercase tracking-wider font-semibold mb-0.5">Store</span>
                        <span className="text-on-surface font-medium">Amazon</span>
                      </div>
                    </div>
                    <p className="text-[14px] text-on-surface-variant mb-4">Base price artificially raised before discount to simulate a deal. Actual normal price is $119. Low review trust score (32/100).</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-surface border border-surface-variant px-6 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low transition-colors text-center text-on-surface-variant">
                      View AI Analysis
                    </button>
                    <button className="bg-surface border border-surface-variant px-6 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-container-low transition-colors text-center text-on-surface-variant">
                      See Price History
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full mt-stack-lg bg-surface-container border-t border-surface-variant/30">
        <div className="w-full py-stack-md px-gutter flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto gap-6">
          <div className="font-headline-md text-headline-md font-bold text-on-surface">
            IsItABuy AI
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-on-surface-variant hover:underline hover:text-primary" href="#">Product</a>
            <a className="text-on-surface-variant hover:underline hover:text-primary" href="#">Company</a>
            <a className="text-on-surface-variant hover:underline hover:text-primary" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:underline hover:text-primary" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:underline hover:text-primary" href="#">Contact Support</a>
          </div>
          <div className="text-on-surface-variant text-center md:text-right max-w-lg text-[12px] leading-relaxed">
            © 2024 IsItABuy AI. All rights reserved.<br />
            <span className="font-semibold">Affiliate Disclosure:</span> We may earn a commission from some links. Our deal rankings, AI scores, and recommendations are not based on commission.
          </div>
        </div>
      </footer>
    </div>
  );
}
