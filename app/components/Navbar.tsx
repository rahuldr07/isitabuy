export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-sm border-b border-surface-variant/50">
      <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 md:px-8 h-16 md:h-20">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-2xl">
            shopping_bag
          </span>
          <span className="text-xl font-bold text-on-surface tracking-tight">
            IsItABuy
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="#"
          >
            How It Works
          </a>
          <a
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="#"
          >
            Extension
          </a>
          <a
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="#"
          >
            Tracker
          </a>
          <a
            className="text-secondary hover:text-on-surface transition-colors text-sm font-medium"
            href="#"
          >
            Compare
          </a>
        </nav>
        <div className="flex items-center">
          <button className="text-sm font-medium text-white px-5 py-2.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all shadow-sm">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
