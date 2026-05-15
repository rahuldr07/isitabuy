"use client";

import Link from "next/link";

import SimpleNav from "../components/SimpleNav";

export default function AlternativesPage() {
  return (
    <div className="bg-background text-on-surface font-body-md antialiased min-h-screen flex flex-col">
      {/* TopNavBar */}
      <SimpleNav variant="sticky" />

      {/* Main Content */}
      <main className="flex-grow w-full max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-md">
        {/* Breadcrumbs */}
        <nav className="text-sm text-on-surface-variant mb-8 flex items-center gap-2">
          <Link className="hover:underline" href="/">
            Home
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="hover:underline cursor-pointer">Electronics</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="hover:underline cursor-pointer">Headphones</span>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <Link className="hover:underline" href="/product">
            Sony WH-1000XM5
          </Link>
          <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          <span className="font-semibold text-on-surface">Better Alternatives</span>
        </nav>

        {/* Page Header */}
        <div className="mb-stack-lg flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="font-display-xl text-display-xl text-on-surface mb-2">
              Better alternatives
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Compare smarter options based on AI analysis.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-surface-container-low px-4 py-3 rounded-xl border border-outline-variant max-w-md">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-label-sm text-label-sm text-on-surface">
                Recommendations are not based on commission
              </span>
            </div>
            <p className="text-xs text-on-surface-variant ml-8">
              We may earn a commission from some links. Our AI scores and
              recommendations are not based on commission.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative">
          {/* Left Column (Canvas) */}
          <div className="lg:col-span-8 flex flex-col gap-stack-lg">
            {/* Current Product Summary */}
            <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-surface-variant flex flex-col sm:flex-row items-center gap-6">
              <img
                alt="Sony WH-1000XM5"
                className="w-24 h-24 object-cover rounded-lg bg-surface-container-low"
                src="https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=200"
              />
              <div className="flex-grow text-center sm:text-left">
                <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">
                  Current Subject
                </p>
                <h2 className="font-headline-md text-headline-md text-on-surface">
                  Sony WH-1000XM5
                </h2>
                <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                  <span className="font-body-lg text-body-lg text-on-surface font-semibold">
                    $299
                  </span>
                  <span className="text-outline-variant">|</span>
                  <span className="font-body-md text-body-md text-on-surface-variant">
                    AI Buy Score: <strong>86</strong>
                  </span>
                </div>
              </div>
              <div className="shrink-0 flex items-center justify-center bg-[#16A34A] text-white px-6 py-3 rounded-lg font-label-sm text-label-sm gap-2">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                Verdict: Buy
              </div>
            </section>

            {/* Hero Alternative */}
            <section className="bg-[#111827] rounded-xl p-8 shadow-[0px_10px_30px_rgba(0,0,0,0.06)] relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <span className="material-symbols-outlined text-[120px]">
                  auto_awesome
                </span>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span
                    className="material-symbols-outlined text-[#16A34A]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  <span className="font-label-sm text-label-sm text-[#16A34A] uppercase tracking-wider">
                    Best Overall Alternative
                  </span>
                </div>
                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                  <div className="w-full md:w-1/3">
                    <img
                      alt="Sennheiser Momentum 4"
                      className="w-full aspect-square object-cover rounded-lg bg-surface-container"
                      src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400"
                    />
                  </div>
                  <div className="flex-grow w-full">
                    <h3 className="font-display-xl text-display-xl mb-4 text-white">
                      Sennheiser Momentum 4
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                          Price
                        </p>
                        <p className="font-headline-md text-headline-md text-white">
                          $279
                        </p>
                        <p className="text-sm text-[#16A34A] mt-1">-$20 vs Sony</p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                          AI Buy Score
                        </p>
                        <p className="font-headline-md text-headline-md text-[#16A34A]">
                          88
                          <span className="text-sm text-gray-400 font-normal">
                            /100
                          </span>
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                          Value
                        </p>
                        <p className="font-headline-md text-headline-md text-white">
                          90
                          <span className="text-sm text-gray-400 font-normal">
                            /100
                          </span>
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <p className="text-xs text-gray-400 mb-1 uppercase tracking-wider">
                          Reviews
                        </p>
                        <p className="font-headline-md text-headline-md text-white">
                          85
                          <span className="text-sm text-gray-400 font-normal">
                            /100
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 mb-6">
                      <h4 className="font-label-sm text-label-sm text-gray-300 uppercase tracking-wider mb-3">
                        The Logic
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-semibold text-[#16A34A] flex items-center gap-1 mb-2">
                            <span className="material-symbols-outlined text-[16px]">
                              thumb_up
                            </span>{" "}
                            Why it&apos;s better
                          </p>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="material-symbols-outlined text-[#16A34A] text-[16px] mt-0.5">
                                check
                              </span>
                              Superior battery life (60 hours vs 30)
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="material-symbols-outlined text-[#16A34A] text-[16px] mt-0.5">
                                check
                              </span>
                              More analytical sound profile out of the box
                            </li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#F59E0B] flex items-center gap-1 mb-2">
                            <span className="material-symbols-outlined text-[16px]">
                              warning
                            </span>{" "}
                            Trade-offs
                          </p>
                          <ul className="space-y-1">
                            <li className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="material-symbols-outlined text-[#F59E0B] text-[16px] mt-0.5">
                                remove
                              </span>
                              Slightly weaker ANC
                            </li>
                            <li className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="material-symbols-outlined text-[#F59E0B] text-[16px] mt-0.5">
                                remove
                              </span>
                              Bulkier carrying case
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button className="bg-[#16A34A] text-white px-6 py-3 rounded-lg font-label-sm text-label-sm hover:bg-green-700 transition-colors flex-1 flex justify-center items-center gap-2">
                        Buy Now (Amazon){" "}
                        <span className="material-symbols-outlined text-[18px]">
                          open_in_new
                        </span>
                      </button>
                      <button className="bg-transparent border border-gray-600 text-gray-300 px-6 py-3 rounded-lg font-label-sm text-label-sm hover:bg-white/10 transition-colors flex-1">
                        Non-affiliate link
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Alternative Categories Stack */}
            <div className="flex flex-col gap-8">
              {/* Card 1: Best similar-price alternative */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-surface-variant flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 shrink-0">
                  <img
                    alt="Sennheiser Momentum 4"
                    className="w-full aspect-square object-cover rounded-lg bg-surface-container"
                    src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=300"
                  />
                </div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-surface-container px-3 py-1 rounded-full text-xs text-on-surface-variant font-semibold tracking-wide uppercase">
                      Best similar-price alternative
                    </span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                    Sennheiser Momentum 4
                  </h4>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-body-lg text-body-lg font-bold text-on-surface">
                      $279
                    </span>
                    <span className="text-sm font-semibold text-[#16A34A] bg-green-50 px-2 py-0.5 rounded">
                      -$20
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4 bg-surface-container-low p-3 rounded-lg text-center">
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Buy Score
                      </p>
                      <p className="font-bold text-[#16A34A]">88</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Value
                      </p>
                      <p className="font-bold text-on-surface">90</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Trust
                      </p>
                      <p className="font-bold text-on-surface">85</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Price
                      </p>
                      <p className="font-bold text-on-surface">82</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-semibold text-on-surface mb-1">
                        Why it&apos;s better
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Superior battery life (60h), more analytical sound.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface mb-1">
                        Trade-offs
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Slightly weaker ANC, bulkier case.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-[#16A34A] text-white px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-green-700 transition-colors flex-1 flex justify-center items-center gap-2">
                      Buy Now{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        open_in_new
                      </span>
                    </button>
                    <button className="bg-surface-container border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-variant transition-colors flex-1 text-center">
                      Non-affiliate link
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 2: Better for slightly more */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-surface-variant flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 shrink-0 flex items-center justify-center bg-surface-container rounded-lg p-4">
                  <span className="material-symbols-outlined text-outline text-[64px]">
                    headphones
                  </span>
                </div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-surface-container px-3 py-1 rounded-full text-xs text-on-surface-variant font-semibold tracking-wide uppercase">
                      Better for slightly more
                    </span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                    Bose QuietComfort Ultra
                  </h4>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-body-lg text-body-lg font-bold text-on-surface">
                      $379
                    </span>
                    <span className="text-sm font-semibold text-[#DC2626] bg-red-50 px-2 py-0.5 rounded">
                      +$80
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4 bg-surface-container-low p-3 rounded-lg text-center">
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Buy Score
                      </p>
                      <p className="font-bold text-[#F59E0B]">84</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Value
                      </p>
                      <p className="font-bold text-on-surface">75</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Trust
                      </p>
                      <p className="font-bold text-on-surface">88</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Price
                      </p>
                      <p className="font-bold text-on-surface">70</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-semibold text-on-surface mb-1">
                        Why it&apos;s better
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Class-leading ANC, superior comfort, immersive audio
                        mode.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface mb-1">
                        Trade-offs
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Higher price, no passive playback over wire.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-[#16A34A] text-white px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-green-700 transition-colors flex-1 flex justify-center items-center gap-2">
                      Buy Now{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        open_in_new
                      </span>
                    </button>
                    <button className="bg-surface-container border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-variant transition-colors flex-1 text-center">
                      Non-affiliate link
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Cheaper but good enough */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-surface-variant flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 shrink-0 flex items-center justify-center bg-surface-container rounded-lg p-4">
                  <span className="material-symbols-outlined text-outline text-[64px]">
                    headphones
                  </span>
                </div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-surface-container px-3 py-1 rounded-full text-xs text-on-surface-variant font-semibold tracking-wide uppercase">
                      Cheaper but good enough
                    </span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                    Soundcore Space Q45
                  </h4>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-body-lg text-body-lg font-bold text-on-surface">
                      $129
                    </span>
                    <span className="text-sm font-semibold text-[#16A34A] bg-green-50 px-2 py-0.5 rounded">
                      -$170
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4 bg-surface-container-low p-3 rounded-lg text-center">
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Buy Score
                      </p>
                      <p className="font-bold text-[#F59E0B]">81</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Value
                      </p>
                      <p className="font-bold text-on-surface">95</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Trust
                      </p>
                      <p className="font-bold text-on-surface">80</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Price
                      </p>
                      <p className="font-bold text-[#16A34A]">98</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-semibold text-on-surface mb-1">
                        Why it&apos;s better
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Incredible value, excellent battery life, solid ANC for
                        the price.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface mb-1">
                        Trade-offs
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Build quality feels cheaper, sound isn&apos;t as refined.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-[#16A34A] text-white px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-green-700 transition-colors flex-1 flex justify-center items-center gap-2">
                      Buy Now{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        open_in_new
                      </span>
                    </button>
                    <button className="bg-surface-container border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-variant transition-colors flex-1 text-center">
                      Non-affiliate link
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 4: Premium upgrade */}
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-surface-variant flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 shrink-0 flex items-center justify-center bg-surface-container rounded-lg p-4">
                  <span className="material-symbols-outlined text-outline text-[64px]">
                    headphones
                  </span>
                </div>
                <div className="flex-grow w-full">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-surface-container px-3 py-1 rounded-full text-xs text-on-surface-variant font-semibold tracking-wide uppercase">
                      Premium upgrade
                    </span>
                  </div>
                  <h4 className="font-headline-md text-headline-md text-on-surface mb-2">
                    Bowers &amp; Wilkins Px8
                  </h4>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-body-lg text-body-lg font-bold text-on-surface">
                      $599
                    </span>
                    <span className="text-sm font-semibold text-[#DC2626] bg-red-50 px-2 py-0.5 rounded">
                      +$300
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 mb-4 bg-surface-container-low p-3 rounded-lg text-center">
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Buy Score
                      </p>
                      <p className="font-bold text-[#DC2626]">79</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Value
                      </p>
                      <p className="font-bold text-on-surface">65</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Trust
                      </p>
                      <p className="font-bold text-on-surface">89</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-on-surface-variant uppercase mb-1">
                        Price
                      </p>
                      <p className="font-bold text-[#DC2626]">55</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs font-semibold text-on-surface mb-1">
                        Why it&apos;s better
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Luxurious build quality (leather/metal), audiophile
                        sound signature.
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-on-surface mb-1">
                        Trade-offs
                      </p>
                      <p className="text-sm text-on-surface-variant">
                        Very expensive, heavy, ANC is good but not
                        class-leading.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button className="bg-[#16A34A] text-white px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-green-700 transition-colors flex-1 flex justify-center items-center gap-2">
                      Buy Now{" "}
                      <span className="material-symbols-outlined text-[16px]">
                        open_in_new
                      </span>
                    </button>
                    <button className="bg-surface-container border border-outline-variant text-on-surface px-4 py-2 rounded-lg font-label-sm text-label-sm hover:bg-surface-variant transition-colors flex-1 text-center">
                      Non-affiliate link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (Sticky Context) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-[88px] flex flex-col gap-6">
              <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.03)] border border-surface-variant">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-4 border-b border-outline-variant pb-2">
                  Best Pick Summary
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    alt="Sennheiser Momentum 4"
                    className="w-16 h-16 rounded object-cover bg-surface-container"
                    src="https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=150"
                  />
                  <div>
                    <h4 className="font-body-md text-body-md font-semibold text-on-surface">
                      Sennheiser Momentum 4
                    </h4>
                    <p className="text-sm text-on-surface-variant">$279</p>
                  </div>
                </div>
                <div className="space-y-3 mb-6">
                  <a
                    className="flex items-center justify-between p-3 border border-outline-variant rounded-lg hover:border-primary transition-colors"
                    href="#"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        storefront
                      </span>
                      <span className="text-sm font-semibold">Amazon</span>
                    </span>
                    <span className="text-sm">$279</span>
                  </a>
                  <a
                    className="flex items-center justify-between p-3 border border-outline-variant rounded-lg hover:border-primary transition-colors"
                    href="#"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-on-surface-variant">
                        storefront
                      </span>
                      <span className="text-sm font-semibold">Best Buy</span>
                    </span>
                    <span className="text-sm">$279</span>
                  </a>
                </div>
                <div className="text-xs text-center text-on-surface-variant flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    info
                  </span>
                  Non-affiliate link available
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low dark:bg-inverse-surface border-t border-outline-variant full-width mt-stack-lg">
        <div className="w-full py-stack-md px-gutter max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center opacity-80 hover:opacity-100">
          <div className="text-headline-md font-headline-md text-on-surface-variant mb-4 md:mb-0">
            IsItABuy AI
          </div>
          <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
            <a
              className="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all"
              href="#"
            >
              Terms of Service
            </a>
            <a
              className="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all"
              href="#"
            >
              Contact Support
            </a>
            <a
              className="text-on-surface-variant dark:text-surface-variant font-body-md text-body-md hover:text-primary dark:hover:text-primary-fixed-dim underline transition-all"
              href="#"
            >
              About AI Verdicts
            </a>
          </nav>
          <div className="mt-4 md:mt-0 font-body-md text-body-md text-secondary dark:text-secondary-fixed text-center md:text-right">
            &copy; 2024 IsItABuy AI Advisor. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
