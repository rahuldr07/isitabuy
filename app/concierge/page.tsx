"use client";

import { useState } from "react";
import Link from "next/link";

export default function ConciergePage() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background text-on-surface">
      {/* Header */}
      <header className="bg-white border-b border-outline-variant sticky top-0 z-50 shrink-0">
        <nav className="flex justify-between items-center w-full px-gutter max-w-container-max mx-auto h-16">
          <div className="flex items-center gap-10">
            <Link href="/" className="font-bold text-2xl tracking-tight text-primary">IsItABuy</Link>
            <div className="hidden md:flex items-center gap-8">
              <a className="text-secondary font-label-sm hover:text-primary transition-colors" href="#">Dashboard</a>
              <a className="text-secondary font-label-sm hover:text-primary transition-colors" href="#">History</a>
              <a className="text-secondary font-label-sm hover:text-primary transition-colors" href="#">Trends</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-secondary font-label-sm hover:text-primary transition-colors">Support</button>
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-secondary cursor-pointer">notifications</span>
              <span className="material-symbols-outlined text-secondary cursor-pointer">settings</span>
              <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary font-bold text-[12px]">JD</div>
            </div>
          </div>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-outline-variant flex-col hidden lg:flex shrink-0">
          <div className="p-6 space-y-8 flex-1 overflow-y-auto custom-scrollbar">
            <button className="w-full bg-primary-container text-on-primary py-3 px-4 rounded-xl font-label-sm flex items-center justify-center gap-2 shadow-sm hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined">add</span>
              New Analysis
            </button>
            <section>
              <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-4 px-2">Recent Intelligence</h3>
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2.5 rounded-lg bg-surface-container text-on-surface font-label-sm flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">query_stats</span>
                  OLED TV Options 2024
                </button>
                <button className="w-full text-left px-3 py-2.5 rounded-lg text-secondary hover:bg-surface-container-low transition-colors font-label-sm flex items-center gap-3">
                  <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                  Air Fryer Comparison
                </button>
              </div>
            </section>
            <section>
              <h3 className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-4 px-2">Saved Verdicts</h3>
              <div className="space-y-3 px-2">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 bg-white rounded-lg border border-outline-variant p-1 shrink-0 overflow-hidden flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl text-on-surface-variant">tablet_mac</span>
                  </div>
                  <div className="truncate">
                    <p className="text-label-sm font-bold truncate group-hover:text-primary transition-colors">iPad Air M2</p>
                    <p className="text-[12px] text-verdict-buy font-semibold">9.2/10</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <div className="p-4 border-t border-outline-variant shrink-0">
            <p className="text-[11px] text-secondary leading-relaxed px-2">
              We may earn a commission from some links. Our AI scores and recommendations are not based on commission.
            </p>
          </div>
        </aside>

        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col relative bg-background min-w-0">
          <div className="flex-1 overflow-y-auto custom-scrollbar px-gutter py-stack-lg">
            <div className="max-w-4xl mx-auto w-full space-y-10">
              {/* Empty State */}
              <div className="text-center space-y-4 mb-stack-lg py-12">
                <div className="w-16 h-16 bg-primary-container text-on-primary rounded-2xl flex items-center justify-center mx-auto shadow-md mb-6">
                  <span className="material-symbols-outlined text-[32px]">temp_preferences_custom</span>
                </div>
                <h1 className="font-display-xl text-4xl text-on-surface">Decision Intelligence for Shopping</h1>
                <p className="text-body-lg text-secondary max-w-lg mx-auto">Analyze products across thousands of sources to get the truth before you buy.</p>
              </div>

              {/* Chat History Example */}
              <div className="space-y-8">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-secondary-container text-on-secondary-container p-4 rounded-2xl rounded-tr-none max-w-[80%] shadow-sm">
                    <p className="text-body-md">I&apos;m looking for a new coffee machine. Is the Breville Bambino Plus worth it at $499?</p>
                  </div>
                </div>

                {/* Assistant Response */}
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shrink-0 shadow-sm mt-1">
                    <span className="material-symbols-outlined text-[20px] text-on-primary">smart_toy</span>
                  </div>
                  <div className="space-y-4 flex-1 min-w-0">
                    <div className="bg-white p-8 rounded-2xl rounded-tl-none shadow-sm border border-outline-variant">
                      <p className="text-body-lg mb-6 leading-relaxed">Based on my analysis of 12 verified expert tests and 450+ user reviews, the <strong>Breville Bambino Plus</strong> is a top-tier choice for beginners who want professional results without the learning curve of a manual machine.</p>

                      {/* Premium Product Card */}
                      <div className="bg-surface-container-low border border-outline-variant rounded-2xl overflow-hidden mb-6 flex flex-col md:flex-row">
                        <div className="md:w-1/3 bg-white flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-outline-variant">
                          <span className="material-symbols-outlined text-6xl text-on-surface-variant">coffee_maker</span>
                        </div>
                        <div className="md:w-2/3 p-6 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold">Breville Bambino Plus</h3>
                              <div className="px-3 py-1 rounded-full text-[12px] font-bold bg-verdict-buy text-white">BUY</div>
                            </div>
                            <p className="text-[12px] font-bold text-primary mb-4 tracking-wider">AI BUY SCORE: 9.4/10</p>
                            <p className="text-body-md text-secondary mb-4 italic">&quot;Professional-grade steam performance in a compact footprint that doesn&apos;t compromise on extraction quality.&quot;</p>
                            <div className="grid grid-cols-2 gap-4 mb-6">
                              <div className="bg-white p-2 rounded-lg border border-outline-variant text-center">
                                <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Review Trust</p>
                                <p className="text-label-sm font-bold text-verdict-buy">Excellent</p>
                              </div>
                              <div className="bg-white p-2 rounded-lg border border-outline-variant text-center">
                                <p className="text-[10px] text-on-surface-variant font-bold uppercase mb-1">Price Score</p>
                                <p className="text-label-sm font-bold text-primary">Fair Value</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2 items-center justify-between mt-auto">
                            <span className="text-xl font-bold">$499.95</span>
                            <div className="flex gap-2">
                              <a href="/product" className="bg-white border border-outline-variant px-4 py-2 rounded-xl text-label-sm font-bold hover:bg-surface-container-high transition-colors flex items-center justify-center">AI Analysis</a>
                              <a href="/deals" className="bg-primary-container text-on-primary px-4 py-2 rounded-xl text-label-sm font-bold hover:opacity-90 transition-opacity flex items-center justify-center">Best Offer</a>
                              <button className="w-10 h-10 border border-outline-variant flex items-center justify-center rounded-xl hover:bg-surface-container-high">
                                <span className="material-symbols-outlined text-body-md">notifications</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-outline-variant pt-4">
                        <button className="flex items-center gap-2 text-secondary hover:text-primary transition-colors text-label-sm font-bold">
                          <span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
                          View 14 research sources and price data points
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Chat Input Container */}
          <div className="px-gutter pb-gutter pt-4 bg-gradient-to-t from-background via-background to-transparent z-40 shrink-0">
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Suggested Chips */}
              <div className="flex flex-wrap justify-center gap-2">
                <button className="bg-white border border-outline-variant px-4 py-2 rounded-full text-label-sm font-semibold hover:border-primary hover:text-primary transition-all shadow-sm">
                  Should I buy this laptop?
                </button>
                <button className="bg-white border border-outline-variant px-4 py-2 rounded-full text-label-sm font-semibold hover:border-primary hover:text-primary transition-all shadow-sm">
                  Find me the best air fryer under $150.
                </button>
                <button className="bg-white border border-outline-variant px-4 py-2 rounded-full text-label-sm font-semibold hover:border-primary hover:text-primary transition-all shadow-sm">
                  Compare these two products.
                </button>
              </div>
              {/* Primary Input */}
              <div className="bg-white rounded-2xl shadow-xl border border-outline-variant p-2 flex items-center gap-2 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <button className="p-3 text-secondary hover:bg-surface-container-low rounded-xl transition-colors">
                  <span className="material-symbols-outlined">attach_file</span>
                </button>
                <button className="p-3 text-secondary hover:bg-surface-container-low rounded-xl transition-colors">
                  <span className="material-symbols-outlined">link</span>
                </button>
                <input
                  className="flex-1 border-none focus:ring-0 text-body-md py-4 px-2 outline-none bg-transparent"
                  placeholder="Ask anything or paste a product URL..."
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <button className="bg-primary-container text-on-primary w-12 h-12 rounded-xl shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center">
                  <span className="material-symbols-outlined">arrow_upward</span>
                </button>
              </div>
              <p className="text-center text-[11px] text-on-surface-variant font-medium">IsItABuy uses AI to aggregate data. Verify critical info before buying.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
