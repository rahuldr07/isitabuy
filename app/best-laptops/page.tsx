"use client";

import Link from "next/link";

import SimpleNav from "../components/SimpleNav";

export default function BestLaptopsPage() {
  return (
    <div className="bg-background text-[#111827] min-h-screen pt-20">
      {/* TopNavBar */}
      <SimpleNav variant="fixed" />

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter flex flex-col lg:flex-row gap-8 relative pt-8 pb-16">
        {/* SideNavBar */}
        <aside className="hidden lg:flex flex-col gap-stack-sm w-64 flex-shrink-0 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pr-4 pb-8">
          <div className="mb-6">
            <h2 className="font-headline-md text-headline-md font-bold text-[#0f172a]">
              Filters
            </h2>
            <p className="font-body-md text-body-md text-[#64748b] mt-1">
              Refine your search
            </p>
          </div>
          <nav className="flex flex-col gap-2 font-label-sm text-label-sm">
            {/* Budget */}
            <div className="bg-surface-container-lowest border border-surface-variant/50 rounded-2xl overflow-hidden shadow-sm mb-2">
              <a
                className="bg-surface-container-low/50 text-[#0f172a] p-4 flex items-center gap-3 font-semibold border-b border-surface-variant/50"
                href="#"
              >
                <span
                  className="material-symbols-outlined text-primary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  payments
                </span>
                Budget
              </a>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      className="w-full px-3 py-2 bg-surface border border-surface-variant/50 rounded-lg text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                      placeholder="Min"
                      type="number"
                    />
                  </div>
                  <span className="text-outline text-sm font-bold">to</span>
                  <div className="flex-1">
                    <input
                      className="w-full px-3 py-2 bg-surface border border-surface-variant/50 rounded-lg text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container"
                      placeholder="Max"
                      type="number"
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Verdict Filters */}
            <div className="flex flex-col gap-2 mb-2">
              <div className="text-[#475569] hover:bg-surface-container-low rounded-xl p-3 flex items-center gap-3 transition-colors cursor-pointer active:scale-98 font-medium">
                <span className="material-symbols-outlined text-[#94a3b8]">
                  task_alt
                </span>
                AI Verdict
              </div>
              <div className="pl-11 pr-3 pb-3 flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                    type="checkbox"
                  />
                  <span className="font-body-md text-body-md text-[#475569] group-hover:text-[#0f172a] transition-colors">
                    Buy
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                    type="checkbox"
                  />
                  <span className="font-body-md text-body-md text-[#475569] group-hover:text-[#0f172a] transition-colors">
                    Wait
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                    type="checkbox"
                  />
                  <span className="font-body-md text-body-md text-[#475569] group-hover:text-[#0f172a] transition-colors">
                    Avoid
                  </span>
                </label>
              </div>
            </div>
            {/* Use-Case Filters */}
            <div className="flex flex-col gap-2 mb-2">
              <div className="text-[#475569] hover:bg-surface-container-low rounded-xl p-3 flex items-center gap-3 transition-colors cursor-pointer active:scale-98 font-medium">
                <span className="material-symbols-outlined text-[#94a3b8]">
                  laptop_mac
                </span>
                Use-Case
              </div>
              <div className="pl-11 pr-3 pb-3 flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    defaultChecked
                    className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                    type="checkbox"
                  />
                  <span className="font-body-md text-body-md text-[#475569] group-hover:text-[#0f172a] transition-colors font-medium">
                    Student
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    defaultChecked
                    className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                    type="checkbox"
                  />
                  <span className="font-body-md text-body-md text-[#475569] group-hover:text-[#0f172a] transition-colors font-medium">
                    Everyday use
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                    type="checkbox"
                  />
                  <span className="font-body-md text-body-md text-[#475569] group-hover:text-[#0f172a] transition-colors">
                    Gaming
                  </span>
                </label>
              </div>
            </div>
            {/* Retailer Filters */}
            <div className="flex flex-col gap-2 mb-2">
              <div className="text-[#475569] hover:bg-surface-container-low rounded-xl p-3 flex items-center gap-3 transition-colors cursor-pointer active:scale-98 font-medium">
                <span className="material-symbols-outlined text-[#94a3b8]">
                  storefront
                </span>
                Retailers
              </div>
              <div className="pl-11 pr-3 pb-3 flex flex-col gap-3">
                {["Amazon", "Walmart", "Best Buy", "Target", "eBay"].map(
                  (r) => (
                    <label
                      key={r}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <input
                        className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                        type="checkbox"
                      />
                      <span className="font-body-md text-body-md text-[#475569] group-hover:text-[#0f172a] transition-colors">
                        {r}
                      </span>
                    </label>
                  )
                )}
              </div>
            </div>
            {/* Review Trust Filters */}
            <div className="flex flex-col gap-2 mb-6">
              <div className="text-[#475569] hover:bg-surface-container-low rounded-xl p-3 flex items-center gap-3 transition-colors cursor-pointer active:scale-98 font-medium">
                <span className="material-symbols-outlined text-[#94a3b8]">
                  reviews
                </span>
                Review Trust
              </div>
              <div className="pl-11 pr-3 pb-3 flex flex-col gap-3">
                {["Strong", "Medium", "Low"].map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                      type="checkbox"
                    />
                    <span className="font-body-md text-body-md text-[#475569] group-hover:text-[#0f172a] transition-colors">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <button className="mt-auto bg-surface-container-lowest hover:bg-surface-container-low text-[#0f172a] font-label-sm text-label-sm py-3 px-4 rounded-xl transition-colors text-center w-full border border-surface-variant/50 shadow-sm font-semibold">
              Apply Filters
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0">
          {/* Hero Section */}
          <section className="mb-stack-lg">
            <nav className="flex items-center gap-2 text-[#64748b] font-body-md text-sm mb-6 whitespace-nowrap overflow-x-auto pb-2">
              <Link className="hover:text-[#0f172a] transition-colors" href="/">
                Home
              </Link>
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <span className="hover:text-[#0f172a] transition-colors cursor-pointer">
                Best Products
              </span>
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <span className="hover:text-[#0f172a] transition-colors cursor-pointer">
                Laptops
              </span>
              <span className="material-symbols-outlined text-[16px]">
                chevron_right
              </span>
              <span className="text-[#0f172a] font-semibold">Under $800</span>
            </nav>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <h1 className="font-display-xl text-display-xl md:text-display-xl text-[#0f172a] mb-4 font-bold tracking-tight">
                  Best laptops under $800
                </h1>
                <p className="font-body-lg text-body-lg text-[#475569] max-w-2xl leading-relaxed">
                  AI-ranked laptops based on value, quality, price history,
                  review trust, specs, and real trade-offs.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 font-label-sm text-label-sm mb-8">
              <div className="flex items-center gap-2 bg-[#F0FDF4] px-4 py-2.5 rounded-full border border-[#16A34A]/20 shadow-sm">
                <span className="material-symbols-outlined text-[#16A34A] text-[18px]">
                  verified_user
                </span>
                <span className="text-[#166534] font-semibold">
                  Rankings are not based on commission
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#64748b] px-2">
                <span className="material-symbols-outlined text-[18px]">
                  update
                </span>
                <span>Prices refreshed 4 minutes ago</span>
              </div>
            </div>
          </section>

          {/* Quick Answer Card */}
          <section className="mb-stack-lg">
            <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0px_8px_30px_rgba(0,0,0,0.04)] border border-surface-variant/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-primary-container to-[#fbbf24]"></div>
              <h2 className="font-headline-md text-headline-md mb-4 flex items-center gap-2 text-[#0f172a]">
                <span className="material-symbols-outlined text-primary-container text-[28px]">
                  bolt
                </span>
                Quick Answer
              </h2>
              <p className="font-body-lg text-body-lg text-[#334155] mb-6 leading-relaxed">
                For most people looking for a laptop under $800, the{" "}
                <strong className="text-[#0f172a] font-bold">
                  Lenovo IdeaPad Slim 5
                </strong>{" "}
                is the best overall choice. It offers the best balance of
                performance, build quality, and battery life in this price tier.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors px-4 py-2.5 rounded-full font-label-sm text-label-sm flex items-center gap-2 border border-surface-variant/60 shadow-sm text-[#334155]"
                  href="#rank-1"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container shadow-sm"></span>
                  Best Overall: Lenovo IdeaPad Slim 5
                </a>
                <a
                  className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors px-4 py-2.5 rounded-full font-label-sm text-label-sm flex items-center gap-2 border border-surface-variant/60 shadow-sm text-[#334155]"
                  href="#rank-2"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shadow-sm"></span>
                  Best Value: Acer Swift Go 14
                </a>
                <a
                  className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors px-4 py-2.5 rounded-full font-label-sm text-label-sm flex items-center gap-2 border border-surface-variant/60 shadow-sm text-[#334155]"
                  href="#rank-4"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6] shadow-sm"></span>
                  Best Budget: ASUS VivoBook 15
                </a>
                <a
                  className="bg-surface-container-lowest hover:bg-surface-container-low transition-colors px-4 py-2.5 rounded-full font-label-sm text-label-sm flex items-center gap-2 border border-surface-variant/60 shadow-sm text-[#334155]"
                  href="#rank-3"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6] shadow-sm"></span>
                  Best Premium: HP Envy x360 14
                </a>
              </div>
            </div>
          </section>

          {/* Top Picks Grid */}
          <section className="mb-stack-lg">
            <h2 className="font-headline-lg text-headline-lg mb-6 text-[#0f172a] tracking-tight">
              Top Picks
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Card 1: Best Overall */}
              <div
                className="bg-surface-container-lowest rounded-[32px] overflow-hidden shadow-[0px_10px_40px_rgba(0,0,0,0.06)] border border-surface-variant/40 flex flex-col relative group transition-all hover:shadow-[0px_15px_50px_rgba(0,0,0,0.08)]"
                id="rank-1"
              >
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <div className="bg-[#0f172a] text-white px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold flex items-center justify-center shadow-md">
                    #1
                  </div>
                  <div className="bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1.5 shadow-md border border-surface-variant/20 text-[#0f172a]">
                    <span className="material-symbols-outlined text-primary-container text-[18px]">
                      military_tech
                    </span>
                    Best Overall
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <label className="flex items-center gap-2 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface-variant/50 shadow-sm cursor-pointer group/cb">
                    <input
                      className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                      type="checkbox"
                    />
                    <span className="font-label-sm text-xs font-semibold text-[#475569] group-hover/cb:text-[#0f172a]">
                      Compare
                    </span>
                  </label>
                </div>
                <div className="aspect-[4/3] bg-surface-container-low relative overflow-hidden flex items-center justify-center p-8 group-hover:bg-[#f1f5f9] transition-colors">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent z-0"></div>
                  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-surface-variant/20 flex items-center justify-center z-10 relative transition-transform duration-500 group-hover:scale-[1.02]">
                    <span className="material-symbols-outlined text-[#cbd5e1] text-[80px]">
                      laptop_mac
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col bg-white">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#f1f5f9] text-[#475569] text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        Best for Students
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-headline-md text-2xl font-bold text-[#0f172a] leading-tight mb-1 group-hover:text-primary-container transition-colors">
                          Lenovo IdeaPad Slim 5
                        </h3>
                        <p className="font-body-md text-sm text-[#64748b] font-medium">
                          16&quot; • AMD Ryzen 7 • 16GB RAM
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-headline-md text-2xl font-bold text-[#0f172a]">
                          $699.99
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Buy Score
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">92</span>
                    </div>
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Trust
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">8.5</span>
                    </div>
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Value
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">A-</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-1.5 bg-[#16A34A]/10 text-[#166534] px-3 py-1.5 rounded-lg border border-[#16A34A]/20">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="font-label-sm text-sm font-bold">
                        Verdict: Buy
                      </span>
                    </div>
                  </div>
                  <div className="mb-8 flex-1">
                    <p className="font-body-md text-[#334155] leading-relaxed">
                      Excellent build quality and reliable performance make this
                      the safest bet under $800. The keyboard is best-in-class,
                      though the screen could be brighter.
                    </p>
                  </div>
                  <Link
                    href="/product"
                    className="w-full bg-primary-container hover:bg-amber-600 text-on-primary font-label-sm text-base py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg font-bold flex items-center justify-center gap-2 text-center"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      analytics
                    </span>
                    View AI Analysis
                  </Link>
                </div>
              </div>

              {/* Card 2: Best Value */}
              <div
                className="bg-surface-container-lowest rounded-[32px] overflow-hidden shadow-[0px_8px_30px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col relative group transition-all hover:shadow-[0px_15px_50px_rgba(0,0,0,0.08)]"
                id="rank-2"
              >
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <div className="bg-[#475569] text-white px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold flex items-center justify-center shadow-md">
                    #2
                  </div>
                  <div className="bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1.5 shadow-md border border-surface-variant/20 text-[#0f172a]">
                    <span className="material-symbols-outlined text-[#16A34A] text-[18px]">
                      savings
                    </span>
                    Best Value
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <label className="flex items-center gap-2 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface-variant/50 shadow-sm cursor-pointer group/cb">
                    <input
                      className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                      type="checkbox"
                    />
                    <span className="font-label-sm text-xs font-semibold text-[#475569] group-hover/cb:text-[#0f172a]">
                      Compare
                    </span>
                  </label>
                </div>
                <div className="aspect-[4/3] bg-surface-container-low relative overflow-hidden flex items-center justify-center p-8 group-hover:bg-[#f1f5f9] transition-colors">
                  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-surface-variant/20 flex items-center justify-center z-10 relative transition-transform duration-500 group-hover:scale-[1.02]">
                    <span className="material-symbols-outlined text-[#cbd5e1] text-[80px]">
                      laptop_mac
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col bg-white">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#f1f5f9] text-[#475569] text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        Best for Media
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-headline-md text-2xl font-bold text-[#0f172a] leading-tight mb-1 group-hover:text-primary-container transition-colors">
                          Acer Swift Go 14
                        </h3>
                        <p className="font-body-md text-sm text-[#64748b] font-medium">
                          14&quot; OLED • Intel Core i5 • 16GB RAM
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-headline-md text-2xl font-bold text-[#0f172a]">
                          $599.99
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Buy Score
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">89</span>
                    </div>
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Trust
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">7.8</span>
                    </div>
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Value
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">A+</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-1.5 bg-[#16A34A]/10 text-[#166534] px-3 py-1.5 rounded-lg border border-[#16A34A]/20">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="font-label-sm text-sm font-bold">
                        Verdict: Buy
                      </span>
                    </div>
                  </div>
                  <div className="mb-8 flex-1">
                    <p className="font-body-md text-[#334155] leading-relaxed">
                      Unbeatable specs for the price, featuring a stunning OLED
                      screen rarely seen under $800. Battery life is merely
                      average, however.
                    </p>
                  </div>
                  <Link
                    href="/product"
                    className="w-full bg-surface-container-lowest border-2 border-surface-variant text-[#0f172a] hover:border-[#cbd5e1] hover:bg-[#f8fafc] font-label-sm text-base py-3.5 px-6 rounded-xl transition-all font-bold flex items-center justify-center gap-2 shadow-sm text-center"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#64748b]">
                      analytics
                    </span>
                    View AI Analysis
                  </Link>
                </div>
              </div>

              {/* Card 3: Best Budget */}
              <div
                className="bg-surface-container-lowest rounded-[32px] overflow-hidden shadow-[0px_8px_30px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col relative group transition-all hover:shadow-[0px_15px_50px_rgba(0,0,0,0.08)]"
                id="rank-3"
              >
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <div className="bg-[#475569] text-white px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold flex items-center justify-center shadow-md">
                    #3
                  </div>
                  <div className="bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1.5 shadow-md border border-surface-variant/20 text-[#0f172a]">
                    <span className="material-symbols-outlined text-[#3B82F6] text-[18px]">
                      account_balance_wallet
                    </span>
                    Best Budget
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <label className="flex items-center gap-2 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface-variant/50 shadow-sm cursor-pointer group/cb">
                    <input
                      className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                      type="checkbox"
                    />
                    <span className="font-label-sm text-xs font-semibold text-[#475569] group-hover/cb:text-[#0f172a]">
                      Compare
                    </span>
                  </label>
                </div>
                <div className="aspect-[4/3] bg-surface-container-low relative overflow-hidden flex items-center justify-center p-8 group-hover:bg-[#f1f5f9] transition-colors">
                  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-surface-variant/20 flex items-center justify-center z-10 relative transition-transform duration-500 group-hover:scale-[1.02]">
                    <span className="material-symbols-outlined text-[#cbd5e1] text-[80px]">
                      laptop_mac
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col bg-white">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#f1f5f9] text-[#475569] text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        Best for Basic Use
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-headline-md text-2xl font-bold text-[#0f172a] leading-tight mb-1 group-hover:text-primary-container transition-colors">
                          ASUS VivoBook 15
                        </h3>
                        <p className="font-body-md text-sm text-[#64748b] font-medium">
                          15.6&quot; • Intel Core i3 • 8GB RAM
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-headline-md text-2xl font-bold text-[#0f172a]">
                          $349.99
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Buy Score
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">78</span>
                    </div>
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Trust
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">8.1</span>
                    </div>
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Value
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">B+</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-1.5 bg-[#FEF3C7] text-[#B45309] px-3 py-1.5 rounded-lg border border-[#F59E0B]/30">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        schedule
                      </span>
                      <span className="font-label-sm text-sm font-bold">
                        Verdict: Wait
                      </span>
                    </div>
                  </div>
                  <div className="mb-8 flex-1">
                    <p className="font-body-md text-[#334155] leading-relaxed">
                      Solid basics for a very low price. However, prices often
                      drop below $300 during sales events, so waiting might save
                      you more.
                    </p>
                  </div>
                  <Link
                    href="/product"
                    className="w-full bg-surface-container-lowest border-2 border-surface-variant text-[#0f172a] hover:border-[#cbd5e1] hover:bg-[#f8fafc] font-label-sm text-base py-3.5 px-6 rounded-xl transition-all font-bold flex items-center justify-center gap-2 shadow-sm text-center"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#64748b]">
                      analytics
                    </span>
                    View AI Analysis
                  </Link>
                </div>
              </div>

              {/* Card 4: Best Premium */}
              <div
                className="bg-surface-container-lowest rounded-[32px] overflow-hidden shadow-[0px_8px_30px_rgba(0,0,0,0.04)] border border-surface-variant/40 flex flex-col relative group transition-all hover:shadow-[0px_15px_50px_rgba(0,0,0,0.08)]"
                id="rank-4"
              >
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <div className="bg-[#475569] text-white px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold flex items-center justify-center shadow-md">
                    #4
                  </div>
                  <div className="bg-surface-container-lowest/95 backdrop-blur-md px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1.5 shadow-md border border-surface-variant/20 text-[#0f172a]">
                    <span className="material-symbols-outlined text-[#8B5CF6] text-[18px]">
                      diamond
                    </span>
                    Best Premium
                  </div>
                </div>
                <div className="absolute top-4 right-4 z-20">
                  <label className="flex items-center gap-2 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface-variant/50 shadow-sm cursor-pointer group/cb">
                    <input
                      className="w-4 h-4 rounded border-surface-variant text-primary-container focus:ring-primary-container"
                      type="checkbox"
                    />
                    <span className="font-label-sm text-xs font-semibold text-[#475569] group-hover/cb:text-[#0f172a]">
                      Compare
                    </span>
                  </label>
                </div>
                <div className="aspect-[4/3] bg-surface-container-low relative overflow-hidden flex items-center justify-center p-8 group-hover:bg-[#f1f5f9] transition-colors">
                  <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-surface-variant/20 flex items-center justify-center z-10 relative transition-transform duration-500 group-hover:scale-[1.02]">
                    <span className="material-symbols-outlined text-[#cbd5e1] text-[80px]">
                      laptop_mac
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col bg-white">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#f1f5f9] text-[#475569] text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                        Best for Creatives
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-headline-md text-2xl font-bold text-[#0f172a] leading-tight mb-1 group-hover:text-primary-container transition-colors">
                          HP Envy x360 14
                        </h3>
                        <p className="font-body-md text-sm text-[#64748b] font-medium">
                          14&quot; Touch • Ryzen 5 • 8GB RAM
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-headline-md text-2xl font-bold text-[#0f172a]">
                          $749.99
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Buy Score
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">85</span>
                    </div>
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Trust
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">9.0</span>
                    </div>
                    <div className="bg-[#f8fafc] border border-[#e2e8f0] p-3 rounded-xl flex flex-col items-center justify-center text-center">
                      <span className="text-[#64748b] text-[10px] font-bold uppercase tracking-wider mb-1">
                        Value
                      </span>
                      <span className="text-[#0f172a] text-xl font-bold">B</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex items-center gap-1.5 bg-[#16A34A]/10 text-[#166534] px-3 py-1.5 rounded-lg border border-[#16A34A]/20">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <span className="font-label-sm text-sm font-bold">
                        Verdict: Buy
                      </span>
                    </div>
                  </div>
                  <div className="mb-8 flex-1">
                    <p className="font-body-md text-[#334155] leading-relaxed">
                      Premium aluminum chassis and versatile 2-in-1 design feel
                      much more expensive than the price tag. The 8GB RAM limits
                      heavy multitasking.
                    </p>
                  </div>
                  <Link
                    href="/product"
                    className="w-full bg-surface-container-lowest border-2 border-surface-variant text-[#0f172a] hover:border-[#cbd5e1] hover:bg-[#f8fafc] font-label-sm text-base py-3.5 px-6 rounded-xl transition-all font-bold flex items-center justify-center gap-2 shadow-sm text-center"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#64748b]">
                      analytics
                    </span>
                    View AI Analysis
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Avoid List */}
          <section className="mb-stack-lg border-t border-surface-variant/50 pt-12">
            <h2 className="font-headline-lg text-headline-lg mb-2 text-[#0f172a] tracking-tight">
              Laptops to Avoid
            </h2>
            <p className="font-body-md text-[#475569] mb-8">
              Products that currently offer poor value or have known critical
              issues at this price point.
            </p>
            <div className="bg-[#FEF2F2] rounded-3xl p-6 md:p-8 border border-[#FCA5A5]/50 flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#FCA5A5]/30 shrink-0">
                <span className="material-symbols-outlined text-[#DC2626] text-[48px]">
                  block
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-headline-md text-xl font-bold text-[#7F1D1D]">
                    Dell Inspiron 15 (3000 Series)
                  </h3>
                  <span className="bg-[#DC2626]/10 text-[#DC2626] text-xs font-bold px-2 py-1 rounded border border-[#DC2626]/20 uppercase tracking-wider">
                    Avoid
                  </span>
                </div>
                <p className="font-body-md text-[#991B1B]">
                  Despite the recognizable brand name, this model uses an
                  outdated chassis with poor thermal management and a dim,
                  low-contrast screen. At $550, it is severely outclassed by
                  alternatives from Acer and Lenovo.
                </p>
              </div>
              <button className="w-full md:w-auto bg-white border border-[#FCA5A5] text-[#DC2626] hover:bg-[#FEF2F2] font-label-sm text-sm py-2.5 px-5 rounded-xl transition-colors font-bold whitespace-nowrap">
                Read full warning
              </button>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full mt-stack-lg bg-surface-container-high border-t border-surface-variant/50 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-gutter max-w-container-max mx-auto gap-8">
          <div className="font-headline-md text-xl font-bold text-[#0f172a]">
            IsItABuy AI
          </div>
          <nav className="flex flex-wrap justify-center gap-6 font-label-sm text-sm font-medium">
            <a
              className="text-[#475569] hover:text-[#0f172a] hover:underline transition-all"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-[#475569] hover:text-[#0f172a] hover:underline transition-all"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-[#475569] hover:text-[#0f172a] hover:underline transition-all"
              href="#"
            >
              Contact Us
            </a>
            <a
              className="text-[#475569] hover:text-[#0f172a] hover:underline transition-all"
              href="#"
            >
              About Our AI
            </a>
          </nav>
          <p className="font-body-md text-sm text-[#64748b] text-center md:text-right max-w-md leading-relaxed">
            &copy; 2024 IsItABuy AI. All rights reserved.
            <br />
            <strong className="text-[#475569]">Affiliate Disclosure:</strong> We
            may earn a commission from some links. Our rankings, AI scores, and
            recommendations are not based on commission.
          </p>
        </div>
      </footer>
    </div>
  );
}
