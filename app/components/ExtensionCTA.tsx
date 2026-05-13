export default function ExtensionCTA() {
  return (
    <section className="mb-32 max-w-5xl mx-auto bg-slate-900 rounded-3xl p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-premium">
      {/* Glow orb */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      {/* Text content */}
      <div className="relative z-10 md:w-2/3 text-white">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold uppercase tracking-wider mb-6 border border-white/20">
          <span className="material-symbols-outlined text-[16px]">extension</span>
          Browser Extension
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Shop smarter, automatically.
        </h2>
        <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
          Get instant AI verdicts while you browse Amazon, Best Buy, and
          Walmart. Never overpay or fall for fake reviews again.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="bg-primary-container text-white px-8 py-4 rounded-xl font-semibold hover:bg-amber-600 transition-all shadow-sm flex items-center gap-2">
            Add to Chrome — It&apos;s Free
          </button>
          <button className="bg-white/10 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/10">
            Learn More
          </button>
        </div>
      </div>

      {/* Icon */}
      <div className="relative z-10 md:w-1/3 flex justify-center">
        <div className="w-32 h-32 bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center backdrop-blur-sm shadow-xl">
          <span className="material-symbols-outlined text-6xl text-primary-fixed">
            shopping_bag
          </span>
        </div>
      </div>
    </section>
  );
}
