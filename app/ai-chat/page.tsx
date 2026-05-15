"use client";

import { useState } from "react";
import Link from "next/link";

export default function AIChatPage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface font-sans">
      {/* Left Sidebar */}
      <aside className="w-80 flex-shrink-0 bg-surface-container-lowest border-r border-outline-variant flex flex-col hidden md:flex">
        <div className="p-6 border-b border-outline-variant">
          <div className="flex flex-col mb-6">
            <Link href="/" className="text-on-surface text-xl font-bold leading-tight">IsItABuy AI</Link>
            <p className="text-primary text-sm font-medium">Decision Intelligence</p>
          </div>
          <button className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary h-12 rounded-xl font-bold tracking-tight hover:bg-amber-500 transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_box</span>
            New chat
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-6 space-y-8">
          {/* Recent Chats */}
          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-outline mb-4 px-2">Recent Intelligence</h3>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container hover:bg-surface-container-high cursor-pointer transition-colors group">
                <span className="material-symbols-outlined text-sm text-primary">analytics</span>
                <span className="text-sm font-medium truncate flex-1">Best laptop under $800</span>
              </div>
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container cursor-pointer transition-colors group">
                <span className="material-symbols-outlined text-sm text-outline">analytics</span>
                <span className="text-sm font-medium truncate flex-1">Sony vs Bose headphones</span>
              </div>
            </div>
          </section>
          {/* Saved Verdicts */}
          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-outline mb-4 px-2">Saved Verdicts</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer border border-outline-variant">
                <div className="w-10 h-10 rounded-lg bg-white overflow-hidden flex-shrink-0 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl text-on-surface-variant">laptop_mac</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">MacBook Air M2</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-verdict-buy/10 text-verdict-buy font-bold uppercase">Buy</span>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="p-4 border-t border-outline-variant">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center">
              <span className="material-symbols-outlined text-outline">person</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold">Alex Chen</p>
              <p className="text-xs text-outline">Premium Member</p>
            </div>
            <span className="material-symbols-outlined text-outline text-sm">settings</span>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-white relative h-full min-w-0">
        {/* Header */}
        <header className="h-16 border-b border-outline-variant bg-white/80 backdrop-blur-md flex items-center justify-between px-8 z-10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-bold text-on-surface">AI Shopping Assistant</h2>
            <span className="px-2 py-0.5 bg-primary-container/10 text-primary text-[10px] font-bold rounded uppercase">Active Analysis</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-sm font-bold px-4 py-2 rounded-lg hover:bg-surface-container transition-colors">History</button>
            <button className="bg-surface-container-low border border-outline-variant px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-sm">share</span>
              Share Chat
            </button>
          </div>
        </header>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-5xl mx-auto px-gutter py-stack-md space-y-12">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-surface-container-low text-on-surface px-6 py-4 rounded-2xl rounded-tr-none max-w-[70%] border border-outline-variant/30">
                <p className="text-body-md">Find me the best air fryer under $150.</p>
              </div>
            </div>

            {/* Assistant Response */}
            <div className="flex justify-start">
              <div className="max-w-[90%] w-full space-y-8">
                {/* Authority Card */}
                <div className="bg-white p-10 rounded-3xl shadow-premium border border-outline-variant/50 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-verdict-buy"></div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-verdict-buy/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-verdict-buy font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      </div>
                      <div>
                        <span className="text-verdict-buy text-sm font-extrabold uppercase tracking-widest">Primary Recommendation</span>
                        <h3 className="text-headline-lg">Ninja AF101 4-Quart Air Fryer</h3>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-outline uppercase font-bold mb-1">AI Confidence Score</p>
                      <div className="text-2xl font-bold text-verdict-buy">9.4<span className="text-sm text-outline">/10</span></div>
                    </div>
                  </div>
                  <div className="prose prose-sm max-w-none text-on-surface-variant leading-relaxed space-y-4 mb-8">
                    <p className="text-body-lg">After analyzing <span className="font-bold text-on-surface">1,402 verified purchase reviews</span> and comparing <span className="font-bold text-on-surface">18 retailers</span>, the Ninja AF101 is the definitive &quot;Buy&quot; for the sub-$150 price bracket.</p>
                    <p className="text-body-md">The deciding factor is its <span className="italic">ceramic-coated basket</span>, which consistently outperformed chemical-based non-stick surfaces in long-term durability tests (12+ months). While competitors like Cosori offer slightly more features, the Ninja provides the most stable heating cycle essential for crisp results.</p>
                  </div>
                  <div className="flex flex-wrap gap-4 mb-10">
                    <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-xl border border-outline-variant/30">
                      <span className="material-symbols-outlined text-verdict-buy text-lg">verified</span>
                      <span className="text-sm font-bold">Tested Heat Consistency</span>
                    </div>
                    <div className="flex items-center gap-2 bg-surface px-4 py-2 rounded-xl border border-outline-variant/30">
                      <span className="material-symbols-outlined text-verdict-buy text-lg">health_and_safety</span>
                      <span className="text-sm font-bold">PFAS-Free Coating</span>
                    </div>
                  </div>
                  {/* Expandable Citation */}
                  <button className="flex items-center gap-3 text-xs font-bold text-primary px-5 py-3 rounded-xl bg-primary-container/5 hover:bg-primary-container/10 border border-primary-container/20 transition-all group">
                    <span className="material-symbols-outlined text-sm group-hover:rotate-180 transition-transform">expand_more</span>
                    View 14 research sources and price data points
                  </button>
                </div>

                {/* Product Analysis Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  {/* Enhanced Product Card 1 - Buy */}
                  <div className="bg-white rounded-3xl p-6 border border-outline-variant/60 shadow-soft flex flex-col hover:border-primary/30 transition-colors">
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-on-surface-variant">blender</span>
                      <div className="absolute top-3 left-3 px-3 py-1 bg-verdict-buy text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">Buy</div>
                      <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-on-surface text-sm font-bold rounded-lg shadow-sm">$129.99</div>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Ninja AF101 4Qt</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-6 leading-relaxed">Top-tier durability with the best non-stick performance in its class.</p>
                    <div className="space-y-4 mb-8">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-outline">
                          <span>AI Buy Score</span>
                          <span className="text-verdict-buy">9.4/10</span>
                        </div>
                        <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-verdict-buy w-[94%]"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center bg-surface-container-low p-2 rounded-xl border border-outline-variant/30">
                        <div className="text-center flex-1 border-r border-outline-variant/30">
                          <p className="text-[9px] text-outline uppercase font-bold">Trust</p>
                          <p className="text-xs font-bold">96%</p>
                        </div>
                        <div className="text-center flex-1">
                          <p className="text-[9px] text-outline uppercase font-bold">Price</p>
                          <p className="text-xs font-bold text-verdict-buy">Low</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-auto">
                      <a href="/deals" className="w-full py-2.5 bg-primary-container text-on-primary text-xs font-bold rounded-xl hover:bg-amber-500 transition-colors flex items-center justify-center">View Best Offer</a>
                      <a href="/product" className="w-full py-2.5 bg-white border border-outline-variant text-xs font-bold rounded-xl hover:bg-surface-container transition-colors flex items-center justify-center">View AI Analysis</a>
                      <a href="/price-alerts" className="w-full flex items-center justify-center gap-2 py-2 text-outline hover:text-primary text-[11px] font-medium transition-colors">
                        <span className="material-symbols-outlined text-sm">notifications</span>
                        Set price alert
                      </a>
                    </div>
                  </div>

                  {/* Enhanced Product Card 2 - Wait */}
                  <div className="bg-white rounded-3xl p-6 border border-outline-variant/60 shadow-soft flex flex-col hover:border-primary/30 transition-colors">
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-on-surface-variant">microwave</span>
                      <div className="absolute top-3 left-3 px-3 py-1 bg-verdict-wait text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">Wait</div>
                      <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-on-surface text-sm font-bold rounded-lg shadow-sm">$99.99</div>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Cosori Pro LE</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-6 leading-relaxed">Quiet and stylish, but price often drops below $80. Recommend waiting.</p>
                    <div className="space-y-4 mb-8">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-outline">
                          <span>AI Buy Score</span>
                          <span className="text-verdict-wait">7.1/10</span>
                        </div>
                        <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-verdict-wait w-[71%]"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center bg-surface-container-low p-2 rounded-xl border border-outline-variant/30">
                        <div className="text-center flex-1 border-r border-outline-variant/30">
                          <p className="text-[9px] text-outline uppercase font-bold">Trust</p>
                          <p className="text-xs font-bold">89%</p>
                        </div>
                        <div className="text-center flex-1">
                          <p className="text-[9px] text-outline uppercase font-bold">Price</p>
                          <p className="text-xs font-bold text-verdict-wait">Mid</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-auto">
                      <a href="/deals" className="w-full py-2.5 bg-surface-container text-on-surface text-xs font-bold rounded-xl border border-outline-variant hover:bg-surface-container-high transition-colors flex items-center justify-center">View Best Offer</a>
                      <a href="/product" className="w-full py-2.5 bg-white border border-outline-variant text-xs font-bold rounded-xl hover:bg-surface-container transition-colors flex items-center justify-center">View AI Analysis</a>
                      <a href="/price-alerts" className="w-full flex items-center justify-center gap-2 py-2 text-primary text-[11px] font-bold transition-colors">
                        <span className="material-symbols-outlined text-sm">notifications</span>
                        Set price alert
                      </a>
                    </div>
                  </div>

                  {/* Enhanced Product Card 3 - Avoid */}
                  <div className="bg-surface-container-low/50 rounded-3xl p-6 border border-outline-variant/30 flex flex-col opacity-75 grayscale-[0.5]">
                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-surface-container flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-on-surface-variant">kitchen</span>
                      <div className="absolute top-3 left-3 px-3 py-1 bg-verdict-avoid text-white text-[10px] font-bold rounded-full uppercase tracking-tighter">Avoid</div>
                      <div className="absolute bottom-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-on-surface text-sm font-bold rounded-lg shadow-sm">$74.00</div>
                    </div>
                    <h4 className="text-lg font-bold mb-2">Generic 8QT XL</h4>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-6 leading-relaxed">Poor build quality and reported safety hazards with plastic odors.</p>
                    <div className="space-y-4 mb-8">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold uppercase text-outline">
                          <span>AI Buy Score</span>
                          <span className="text-verdict-avoid">2.4/10</span>
                        </div>
                        <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-verdict-avoid w-[24%]"></div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center bg-surface-container-low p-2 rounded-xl border border-outline-variant/30">
                        <div className="text-center flex-1 border-r border-outline-variant/30">
                          <p className="text-[9px] text-outline uppercase font-bold">Trust</p>
                          <p className="text-xs font-bold text-verdict-avoid">Low</p>
                        </div>
                        <div className="text-center flex-1">
                          <p className="text-[9px] text-outline uppercase font-bold">Price</p>
                          <p className="text-xs font-bold">Cheap</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-auto">
                      <button className="w-full py-2.5 bg-surface-container-low text-outline text-xs font-bold rounded-xl border border-outline-variant cursor-not-allowed" disabled>Not Recommended</button>
                      <a href="/product" className="w-full py-2.5 bg-white border border-outline-variant text-xs font-bold rounded-xl hover:bg-surface-container transition-colors flex items-center justify-center">View AI Analysis</a>
                    </div>
                  </div>
                </div>

                {/* Affiliate Disclosure */}
                <div className="flex items-start gap-3 bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40">
                  <span className="material-symbols-outlined text-outline text-lg">info</span>
                  <p className="text-[11px] text-outline leading-relaxed italic">
                    We may earn a commission from some links. Our AI scores and recommendations are not based on commission, they are generated through deep technical analysis of verified product data and user experiences.
                  </p>
                </div>
              </div>
            </div>

            {/* Extra spacer to account for sticky input height */}
            <div className="h-40"></div>
          </div>
        </div>

        {/* Sticky Chat Input Container */}
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-white via-white to-white/0 pt-12 pb-8 px-gutter flex-shrink-0 z-20">
          <div className="max-w-4xl mx-auto">
            {/* Suggestions Chips */}
            <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-1">
              <button className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white border border-outline-variant text-[13px] font-bold text-on-surface-variant hover:border-primary hover:bg-primary-container/5 transition-all shadow-sm">Should I buy this laptop?</button>
              <button className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white border border-outline-variant text-[13px] font-bold text-on-surface-variant hover:border-primary hover:bg-primary-container/5 transition-all shadow-sm">Find me the best air fryer under $150.</button>
              <button className="flex-shrink-0 px-5 py-2.5 rounded-full bg-white border border-outline-variant text-[13px] font-bold text-on-surface-variant hover:border-primary hover:bg-primary-container/5 transition-all shadow-sm">Compare these two products.</button>
            </div>
            {/* Premium Primary Input */}
            <div className="relative bg-white rounded-[2rem] border-2 border-outline-variant p-2 flex items-end gap-3 shadow-xl focus-within:border-primary transition-all group">
              <div className="flex gap-1 mb-1 ml-2">
                <button className="p-3 text-outline hover:text-primary rounded-full hover:bg-surface-container transition-colors" title="Attach link">
                  <span className="material-symbols-outlined text-[24px]">link</span>
                </button>
                <button className="p-3 text-outline hover:text-primary rounded-full hover:bg-surface-container transition-colors" title="Upload receipt">
                  <span className="material-symbols-outlined text-[24px]">receipt_long</span>
                </button>
              </div>
              <textarea
                className="flex-1 bg-transparent border-none focus:ring-0 resize-none py-4 px-2 text-body-lg placeholder:text-outline/70 outline-none"
                placeholder="Paste a link or ask about a product..."
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className="bg-primary-container text-on-primary w-14 h-14 rounded-full flex items-center justify-center hover:bg-amber-500 transition-all shadow-md mb-1 mr-1 active:scale-95">
                <span className="material-symbols-outlined text-[28px] font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_upward</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Right Context Sidebar */}
      <aside className="w-80 flex-shrink-0 bg-surface-container-lowest border-l border-outline-variant overflow-y-auto custom-scrollbar p-6 space-y-stack-md hidden xl:block">
        <section>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-outline mb-6">Current Analysis</h3>
          <div className="p-5 rounded-2xl bg-white border border-outline-variant shadow-soft">
            <p className="text-xs font-bold text-on-surface mb-3">Target Product</p>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-surface-container overflow-hidden ring-1 ring-outline-variant/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl text-on-surface-variant">blender</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-extrabold truncate">Ninja AF101</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-verdict-buy"></span>
                  <p className="text-[11px] text-verdict-buy font-bold">Best Value: $129</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-outline mb-4">Research Quality</h3>
          <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs text-on-surface-variant font-bold">Trust Index</span>
              <span className="text-xs font-extrabold text-verdict-buy">HIGH</span>
            </div>
            <div className="w-full bg-outline-variant/30 h-1.5 rounded-full overflow-hidden">
              <div className="bg-verdict-buy h-full w-[85%]"></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3 rounded-xl border border-outline-variant/40">
                <p className="text-[9px] text-outline uppercase font-extrabold mb-1">Data Points</p>
                <p className="text-sm font-bold">4,102</p>
              </div>
              <div className="bg-white p-3 rounded-xl border border-outline-variant/40">
                <p className="text-[9px] text-outline uppercase font-extrabold mb-1">Retailers</p>
                <p className="text-sm font-bold">14</p>
              </div>
            </div>
          </div>
        </section>
        <div className="pt-8">
          <div className="p-5 rounded-2xl bg-primary-container/10 border border-primary-container/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary text-sm">lightbulb</span>
              <p className="text-xs font-bold text-primary">Pro Tip</p>
            </div>
            <p className="text-[11px] text-on-primary-fixed-variant leading-relaxed font-medium">Try asking for a specific comparison: <br /> <span className="italic text-on-surface">&quot;How does the Ninja AF101&apos;s footprint compare to the Instant Vortex?&quot;</span></p>
          </div>
        </div>
      </aside>
    </div>
  );
}
