import Link from "next/link";
import SearchHeader from "../components/SearchHeader";
import Footer from "../components/Footer";

export const metadata = {
  title: "Preferences | IsItABuy AI",
};

export default function PreferencesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <SearchHeader />
      {/* Save State Floating Indicator */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] pointer-events-none">
        <div className="flex items-center gap-2 bg-verdict-wait/10 border border-verdict-wait/20 text-verdict-wait px-4 py-2 rounded-full shadow-lg backdrop-blur-md animate-bounce">
          <span className="material-symbols-outlined text-sm">pending_actions</span>
          <span className="text-xs font-bold uppercase tracking-wider">Unsaved changes</span>
        </div>
      </div>

      <main className="max-w-container-max mx-auto px-gutter py-stack-md flex gap-gutter w-full">
        {/* Left Sidebar */}
        <aside className="hidden md:block w-64 shrink-0">
          <div className="sticky top-24 flex flex-col gap-unit">
            <div className="bg-white p-4 flex flex-col gap-1 rounded-2xl shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-3 mb-6 p-2">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold text-sm">AJ</div>
                <div>
                  <p className="text-sm font-bold">Alex Johnson</p>
                  <p className="text-xs text-on-surface-variant">Pro Member</p>
                </div>
              </div>
              <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all" href="#">
                <span className="material-symbols-outlined text-xl">dashboard</span>
                <span className="text-sm font-medium">Overview</span>
              </a>
              <a className="flex items-center gap-3 p-3 bg-primary/5 text-primary rounded-xl font-bold" href="/preferences">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
                <span className="text-sm">Preferences</span>
              </a>
              <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all" href="/watchlist">
                <span className="material-symbols-outlined text-xl">visibility</span>
                <span className="text-sm font-medium">Watchlist</span>
              </a>
              <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all" href="#">
                <span className="material-symbols-outlined text-xl">shopping_bag</span>
                <span className="text-sm font-medium">Order History</span>
              </a>
              <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-low rounded-xl transition-all" href="#">
                <span className="material-symbols-outlined text-xl">shield</span>
                <span className="text-sm font-medium">Security</span>
              </a>
              <div className="mt-4 pt-4 border-t border-outline-variant/30">
                <a className="flex items-center gap-3 p-3 text-on-surface-variant hover:bg-surface-container-low rounded-xl" href="#">
                  <span className="material-symbols-outlined text-xl">help</span>
                  <span className="text-sm font-medium">Help Center</span>
                </a>
              </div>
            </div>
            <div className="bg-surface-container-low p-6 rounded-2xl mt-4">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase text-on-surface-variant">Profile completion</span>
                <span className="text-xs font-bold text-verdict-buy">72%</span>
              </div>
              <div className="w-full bg-white h-1.5 rounded-full mb-4">
                <div className="bg-verdict-buy h-1.5 rounded-full w-[72%]"></div>
              </div>
              <button className="w-full py-2.5 bg-white border border-outline-variant text-on-surface text-xs font-bold rounded-xl hover:bg-white/80 transition-all shadow-sm">Complete now</button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 max-w-4xl">
          {/* Trust Banner */}
          <div className="mb-8 bg-primary/5 border border-primary/10 p-4 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <p className="text-sm text-on-surface font-medium">
              Your preferences improve personalization. AI scores and recommendations are <span className="font-bold underline decoration-primary/30">not based on commission.</span>
            </p>
          </div>

          {/* Header Section */}
          <div className="mb-stack-md">
            <nav className="flex items-center text-xs text-on-surface-variant gap-2 mb-4">
              <Link href="/" className="hover:text-primary">Account</Link>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface font-bold">Preferences</span>
            </nav>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <h1 className="text-3xl font-bold text-on-surface tracking-tight mb-2">Shopping Preferences</h1>
                <p className="text-on-surface-variant text-sm max-w-xl leading-relaxed">Customize your AI shopping agent&apos;s decision-making logic and filtering criteria.</p>
              </div>
              <div className="flex gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none px-6 py-2.5 border border-outline-variant text-on-surface-variant rounded-xl font-bold text-sm hover:bg-surface-container-high transition-all">Discard</button>
                <button className="flex-1 md:flex-none px-6 py-2.5 bg-verdict-wait text-white rounded-xl font-bold text-sm shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Save changes
                </button>
              </div>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex border-b border-outline-variant mb-10 gap-8 overflow-x-auto whitespace-nowrap">
            <button className="pb-4 border-b-2 border-primary text-primary font-bold text-sm">Shopping Engine</button>
            <button className="pb-4 text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm">Personal Info</button>
            <button className="pb-4 text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm">Alerts &amp; Rules</button>
            <button className="pb-4 text-on-surface-variant hover:text-on-surface transition-colors font-medium text-sm">Privacy &amp; Data</button>
          </div>

          <div className="space-y-12">
            {/* Section: Preferred Budget */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-on-surface">Preferred Budget</h2>
                <span className="text-xs font-bold text-on-surface-variant bg-surface-container-high px-2 py-1 rounded">Monthly Cycle</span>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/30">
                <div className="mb-10">
                  <div className="flex justify-between items-center mb-6">
                    <label className="text-sm font-bold text-on-surface">Total target range</label>
                    <span className="text-lg font-bold text-primary">$250 — $800</span>
                  </div>
                  <div className="relative h-2 bg-surface-container-high rounded-full w-full">
                    <div className="absolute left-[12.5%] right-[60%] h-full bg-primary rounded-full"></div>
                    <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" max="2000" min="0" step="50" type="range" value="800" readOnly />
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    <span>$0</span>
                    <span>$2,000+</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="relative flex flex-col p-4 border-2 border-primary bg-primary/5 rounded-2xl cursor-pointer">
                    <input defaultChecked className="absolute top-4 right-4 text-primary focus:ring-primary h-4 w-4" name="budget-logic" type="radio" />
                    <span className="font-bold text-sm mb-1">Hard Stop Filter</span>
                    <span className="text-xs text-on-surface-variant">Strictly hide results exceeding thresholds.</span>
                  </label>
                  <label className="relative flex flex-col p-4 border border-outline-variant hover:border-primary/50 rounded-2xl cursor-pointer transition-all">
                    <input className="absolute top-4 right-4 text-primary focus:ring-primary h-4 w-4" name="budget-logic" type="radio" />
                    <span className="font-bold text-sm mb-1">Visual Warnings</span>
                    <span className="text-xs text-on-surface-variant">Show all items but badge over-budget items.</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Section: Preferred Retailers */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-6">Preferred Retailers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Amazon */}
                <div className="bg-white p-5 rounded-2xl border-2 border-verdict-buy relative group cursor-pointer shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold">A</div>
                    <div className="w-6 h-6 bg-verdict-buy text-white rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-1">Amazon</h3>
                  <p className="text-[11px] text-on-surface-variant mb-4 leading-relaxed">Prime membership active. Prioritize free shipping.</p>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-[9px] font-bold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">NEW ONLY</span>
                  </div>
                </div>
                {/* Best Buy */}
                <div className="bg-white p-5 rounded-2xl border-2 border-verdict-buy relative group cursor-pointer shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-[#0046be] text-white rounded-full flex items-center justify-center font-bold">B</div>
                    <div className="w-6 h-6 bg-verdict-buy text-white rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-1">Best Buy</h3>
                  <p className="text-[11px] text-on-surface-variant mb-4 leading-relaxed">In-store pickup preferred for electronics.</p>
                  <div className="flex gap-1.5 flex-wrap">
                    <span className="text-[9px] font-bold text-on-surface-variant bg-surface-container-high px-2 py-0.5 rounded">LOCAL</span>
                  </div>
                </div>
                {/* Walmart */}
                <div className="bg-white p-5 rounded-2xl border border-outline-variant hover:border-verdict-buy/50 transition-all relative group cursor-pointer shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-[#ffc220] text-on-secondary rounded-full flex items-center justify-center font-bold">W</div>
                    <div className="w-6 h-6 border border-outline-variant rounded-full flex items-center justify-center group-hover:border-verdict-buy/50">
                      <span className="material-symbols-outlined text-[16px] text-transparent group-hover:text-verdict-buy/30">check</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-1">Walmart</h3>
                  <p className="text-[11px] text-on-surface-variant mb-4 leading-relaxed">Currently excluding from automated searches.</p>
                </div>
                {/* eBay */}
                <div className="bg-white p-5 rounded-2xl border-2 border-verdict-buy relative group cursor-pointer shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center font-bold">E</div>
                    <div className="w-6 h-6 bg-verdict-buy text-white rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-sm mb-1">eBay</h3>
                  <p className="text-[11px] text-on-surface-variant mb-4 leading-relaxed">Only verified refurbished or 98%+ rated sellers.</p>
                </div>
              </div>
            </section>

            {/* Section: Blocked Brands */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <h2 className="text-xl font-bold text-on-surface">Blocked Brands</h2>
                <span className="material-symbols-outlined text-verdict-avoid" style={{ fontVariationSettings: "'FILL' 1" }}>block</span>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/30">
                <p className="text-sm text-on-surface-variant mb-6">Excluded brands will be completely hidden from all comparisons and verdict engines.</p>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">do_not_disturb_on</span>
                    <input className="w-full pl-12 pr-4 py-3 bg-surface-container-low border-0 rounded-2xl focus:ring-2 focus:ring-verdict-avoid focus:bg-white transition-all text-sm" placeholder="Search brands to block..." type="text" />
                  </div>
                  <button className="px-6 py-3 bg-surface-container-high text-on-surface font-bold rounded-2xl text-sm hover:bg-outline-variant/30 transition-all">Add Brand</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["GENRICTECH", "BUDGETMAX", "ULTRALOW"].map((brand) => (
                    <div key={brand} className="flex items-center gap-2 px-4 py-2 bg-verdict-avoid/5 border border-verdict-avoid/10 text-verdict-avoid rounded-xl text-xs font-bold">
                      {brand} <button className="hover:text-verdict-avoid/70 transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section: Shopping Categories & Personalized Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Categories */}
              <section>
                <h2 className="text-xl font-bold text-on-surface mb-6">Shopping Categories</h2>
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-2xl">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">devices</span>
                      <span className="text-sm font-bold">Electronics</span>
                    </div>
                    <div className="w-11 h-6 bg-verdict-buy rounded-full relative shadow-inner">
                      <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-2xl">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">face_6</span>
                      <span className="text-sm font-bold">Beauty</span>
                    </div>
                    <div className="w-11 h-6 bg-verdict-buy rounded-full relative shadow-inner">
                      <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-2xl">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">stroller</span>
                      <span className="text-sm font-bold text-on-surface-variant">Baby &amp; Kids</span>
                    </div>
                    <div className="w-11 h-6 bg-outline-variant/30 rounded-full relative shadow-inner">
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full shadow-sm"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border-2 border-dashed border-outline-variant rounded-2xl opacity-60">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">restaurant</span>
                      <span className="text-sm font-bold text-on-surface-variant">Dietary Restrictions</span>
                    </div>
                    <span className="text-[9px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full">COMING SOON</span>
                  </div>
                </div>
              </section>

              {/* Beauty Profile */}
              <section>
                <h2 className="text-xl font-bold text-on-surface mb-6">Beauty Profile</h2>
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 h-full">
                  <label className="block text-sm font-bold text-on-surface mb-4">What is your skin type?</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="px-4 py-3 text-xs font-bold border-2 border-primary bg-primary/5 text-primary rounded-xl">Oily</button>
                    <button className="px-4 py-3 text-xs font-bold border border-outline-variant hover:border-primary/30 rounded-xl">Dry</button>
                    <button className="px-4 py-3 text-xs font-bold border border-outline-variant hover:border-primary/30 rounded-xl">Combination</button>
                    <button className="px-4 py-3 text-xs font-bold border border-outline-variant hover:border-primary/30 rounded-xl">Sensitive</button>
                  </div>
                  <p className="mt-6 text-[11px] text-on-surface-variant leading-relaxed">This profile helps our AI filter skincare and cosmetics specifically for your biological needs, avoiding ingredients that might cause irritation.</p>
                </div>
              </section>
            </div>

            {/* Section: Security & Visibility */}
            <section>
              <h2 className="text-xl font-bold text-on-surface mb-6">Security &amp; Visibility</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 flex gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary">notifications_active</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Dynamic Alerts</h4>
                    <p className="text-xs text-on-surface-variant mb-4">Notify me via push when a &quot;Buy&quot; recommendation matches 100% of my criteria.</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-verdict-buy">ROBUST MODE ACTIVE</span>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-outline-variant/30 flex gap-4">
                  <div className="w-12 h-12 bg-verdict-buy/10 rounded-2xl flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-verdict-buy">privacy_tip</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm mb-1">Privacy Shield</h4>
                    <p className="text-xs text-on-surface-variant mb-4">Preferences are stored locally. Retailers only see aggregated, anonymous intents.</p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-verdict-buy">PRIVATE ENCLAVE ENABLED</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="hidden lg:flex flex-col gap-6 w-80 shrink-0">
          <div className="sticky top-24 space-y-6">
            {/* Recommendation Profile */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-outline-variant/30">
              <h4 className="font-bold text-sm mb-6 flex items-center justify-between">
                Recommendation Profile
                <span className="material-symbols-outlined text-primary text-lg">psychology</span>
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant">Efficiency Focus</span>
                  <span className="text-xs font-bold text-primary">HIGH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant">Min. Rating</span>
                  <span className="text-xs font-bold text-primary">4.2★</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant">Price Sensitivity</span>
                  <span className="text-xs font-bold text-primary">MEDIUM</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-outline-variant/30">
                <button className="w-full py-2.5 text-xs font-bold bg-surface-container-high rounded-xl hover:bg-outline-variant/30 transition-all">Re-calibrate AI</button>
              </div>
            </div>

            {/* Preview Panel */}
            <div className="bg-inverse-surface text-white p-6 rounded-3xl shadow-xl overflow-hidden relative">
              <div className="relative z-10">
                <h4 className="text-[10px] font-bold text-primary-fixed-dim uppercase tracking-widest mb-6">Personalization Preview</h4>
                <div className="bg-white/10 p-4 rounded-2xl mb-6">
                  <p className="text-[10px] text-white/50 mb-1 uppercase">Test Query</p>
                  <p className="text-sm font-bold">&quot;High-end headphones&quot;</p>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3 items-center">
                    <span className="material-symbols-outlined text-sm text-verdict-buy">check_circle</span>
                    <p className="text-[11px] text-white/80">Filtered to Prime Shipping</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="material-symbols-outlined text-sm text-verdict-buy">check_circle</span>
                    <p className="text-[11px] text-white/80">Auto-blocked &apos;BudgetMax&apos;</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <span className="material-symbols-outlined text-sm text-verdict-buy">check_circle</span>
                    <p className="text-[11px] text-white/80">Capped at $800 monthly limit</p>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-white/5 text-[140px]" style={{ fontVariationSettings: "'FILL' 1" }}>insights</span>
            </div>

            {/* Affiliate Disclosure */}
            <div className="p-6 bg-surface-container-low rounded-3xl text-center border border-outline-variant/30">
              <p className="text-[10px] leading-relaxed text-on-surface-variant/80">
                We may earn a commission when you buy through links on our site. <span className="font-bold">This never influences our AI verdicts.</span>
              </p>
            </div>
          </div>
        </aside>
      </main>
      <Footer />
    </div>
  );
}
