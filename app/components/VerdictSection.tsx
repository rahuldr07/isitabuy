const scoreCards = [
  {
    icon: "payments",
    iconBg: "bg-verdict-buy/10",
    iconColor: "text-verdict-buy",
    label: "Price Score",
    tagBg: "bg-verdict-buy/10",
    tagColor: "text-verdict-buy",
    tag: "Great deal",
    score: 88,
    barColor: "bg-verdict-buy",
    note: "Near recent low",
  },
  {
    icon: "rate_review",
    iconBg: "bg-tertiary/10",
    iconColor: "text-tertiary",
    label: "Review Trust",
    tagBg: "bg-tertiary/10",
    tagColor: "text-tertiary",
    tag: "Strong",
    score: 82,
    barColor: "bg-tertiary",
    note: "Reliable review patterns",
  },
  {
    icon: "verified",
    iconBg: "bg-verdict-buy/10",
    iconColor: "text-verdict-buy",
    label: "Quality Score",
    tagBg: "bg-verdict-buy/20 border border-verdict-buy/10",
    tagColor: "text-verdict-buy",
    tag: "Excellent",
    score: 91,
    barColor: "bg-verdict-buy",
    note: "Strong specs and reliability",
  },
  {
    icon: "balance",
    iconBg: "bg-primary-container/10",
    iconColor: "text-primary-container",
    label: "Value Score",
    tagBg: "bg-primary-container/10",
    tagColor: "text-primary-container",
    tag: "Good",
    score: 79,
    barColor: "bg-primary-container",
    note: "Worth the price, but compare alternatives",
  },
];

export default function VerdictSection() {
  return (
    <section className="mb-32 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-on-surface tracking-tight mb-3">
          Real-Time AI Verdicts
        </h2>
        <p className="text-secondary">
          See how we break down a product before you make a decision.
        </p>
      </div>

      <div className="rounded-2xl shadow-premium border border-surface-variant/50 overflow-hidden flex flex-col md:flex-row relative group/card bg-white">
        {/* Left arrow */}
        <button
          aria-label="Previous example"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-surface-variant/50 shadow-lg text-secondary hover:text-primary-container hover:scale-110 transition-all opacity-0 group-hover/card:opacity-100 hidden md:flex"
        >
          <span className="material-symbols-outlined text-2xl">chevron_left</span>
        </button>

        {/* Product image */}
        <div className="md:w-[40%] bg-surface-container-low p-10 flex items-center justify-center border-b md:border-b-0 md:border-r border-surface-variant/50">
          <div
            className="w-full aspect-square rounded-xl shadow-sm relative overflow-hidden"
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        {/* Right panel */}
        <div className="md:w-[60%] p-10 flex flex-col">
          <div className="flex flex-col flex-1">
            {/* Header */}
            <div className="mb-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-on-surface tracking-tight">
                  Sony WH-1000XM5
                </h3>
                <div className="flex items-center gap-3 px-6 py-3 rounded-full border mr-2 transition-transform hover:scale-105 shadow-sm bg-[#16A34A] text-white border-transparent">
                  <span className="material-symbols-outlined text-[24px] filled text-white">
                    check_circle
                  </span>
                  <span className="text-base font-black uppercase tracking-widest">
                    Buy
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-on-surface">
                    $299.00
                  </span>
                  <span className="block text-xs text-secondary font-medium uppercase tracking-wider">
                    Current Price
                  </span>
                </div>
              </div>
            </div>

            {/* Score / Confidence */}
            <div className="flex items-center justify-between py-8 border-y border-surface-variant/40 mb-6 px-2">
              <div className="flex-1 flex flex-col items-center md:items-start">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.1em] block mb-2">
                  AI Score
                </span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#16A34A]">84</span>
                  <span className="text-sm text-secondary/40 font-semibold">
                    /100
                  </span>
                </div>
              </div>
              <div className="w-px h-12 bg-surface-variant/30 mx-4" />
              <div className="flex-1 flex flex-col items-center md:items-start">
                <span className="text-secondary text-[10px] font-bold uppercase tracking-[0.1em] block mb-2">
                  Confidence
                </span>
                <div className="flex items-center gap-2 text-[#16A34A] font-bold text-lg">
                  <span className="material-symbols-outlined text-[22px] filled">
                    signal_cellular_alt
                  </span>
                  High
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="mb-8">
              <p className="font-bold text-on-surface mb-2">
                Strong buy today.
              </p>
              <p className="text-secondary text-sm leading-relaxed">
                The current price is competitive, review trust is strong, and
                product quality signals are excellent. Value is good, but not
                perfect because a few cheaper alternatives exist.
              </p>
            </div>

            <hr className="border-surface-variant/50 mb-6" />

            {/* Score breakdown */}
            <div className="mb-8">
              <h4 className="text-sm font-bold text-on-surface uppercase tracking-wider mb-4">
                Score breakdown
              </h4>
              <div className="grid grid-cols-2 gap-4">
                {scoreCards.map((card) => (
                  <div
                    key={card.label}
                    className="bg-surface-container-low rounded-xl border border-surface-variant/40 p-3.5"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1.5 ${card.iconBg} rounded-lg ${card.iconColor}`}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {card.icon}
                          </span>
                        </div>
                        <span className="text-xs font-bold text-on-surface">
                          {card.label}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-bold uppercase py-0.5 px-1.5 ${card.tagBg} ${card.tagColor} rounded-md`}
                      >
                        {card.tag}
                      </span>
                    </div>
                    <div className="mb-2">
                      <span className="text-lg font-bold text-on-surface">
                        {card.score}
                        <span className="text-[10px] text-secondary">
                          /100
                        </span>
                      </span>
                    </div>
                    <div className="w-full bg-surface-variant rounded-full h-1.5 mb-2">
                      <div
                        className={`${card.barColor} h-1.5 rounded-full`}
                        style={{ width: `${card.score}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-secondary">{card.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-auto pt-6 flex flex-wrap gap-4 border-t border-surface-variant/50">
              <button className="flex-1 bg-primary-container text-white py-3 px-6 rounded-xl font-bold text-sm hover:bg-amber-600 transition-all shadow-sm">
                View Full Analysis
              </button>
              <button className="flex items-center justify-center gap-2 py-3 px-6 rounded-xl border border-surface-variant text-secondary font-semibold text-sm hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  notifications
                </span>
                Set Price Alert
              </button>
            </div>
          </div>
        </div>

        {/* Right arrow */}
        <button
          aria-label="Next example"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center border border-surface-variant/50 shadow-lg text-secondary hover:text-primary-container hover:scale-110 transition-all opacity-0 group-hover/card:opacity-100 hidden md:flex"
        >
          <span className="material-symbols-outlined text-2xl">chevron_right</span>
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-8">
        <div className="w-8 h-2 rounded-full bg-primary-container" />
        <div className="w-2 h-2 rounded-full bg-surface-variant" />
        <div className="w-2 h-2 rounded-full bg-surface-variant" />
      </div>
    </section>
  );
}
