export default function SearchHeader() {
  return (
    <>
      <nav className="bg-surface sticky top-0 w-full z-50 shadow-sm transition-all duration-300 ease-in-out border-b border-surface-variant/50">
        <div className="flex justify-between items-center px-gutter py-4 max-w-container-max mx-auto">
          <div className="text-headline-md text-headline-md font-bold tracking-tight text-on-surface">
            IsItABuy
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a
              className="text-label-sm text-secondary hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md font-semibold"
              href="#"
            >
              How It Works
            </a>
            <a
              className="text-label-sm text-secondary hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md font-semibold"
              href="#"
            >
              Browser Extension
            </a>
            <a
              className="text-label-sm text-secondary hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md font-semibold"
              href="#"
            >
              Price Tracker
            </a>
            <a
              className="text-label-sm text-secondary hover:text-primary-container transition-colors hover:opacity-90 hover:bg-surface-variant/50 px-3 py-2 rounded-md font-semibold"
              href="#"
            >
              Compare
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-primary-container text-on-primary-container text-label-sm px-6 py-3 rounded-full hover:opacity-90 transition-all font-bold">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <div className="bg-surface-container-lowest border-b border-surface-variant/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg text-center">
          <div className="inline-flex items-center space-x-2 bg-surface-container-high px-4 py-2 rounded-full mb-6">
            <span className="material-symbols-outlined text-verdict-buy filled text-sm">
              verified_user
            </span>
            <span className="text-label-sm text-on-surface-variant">
              Our AI scores are not based on commission
            </span>
          </div>
          <h1 className="text-display-xl text-on-surface mb-4 font-bold">
            Search any product
          </h1>
          <p className="text-body-lg text-secondary mb-8 max-w-3xl mx-auto">
            Find products across Amazon, Walmart, Best Buy, Target, and eBay.
            Filter by price, rating, retailer, and review trust.
          </p>

          {/* Search input */}
          <div className="relative max-w-3xl mx-auto mb-4 shadow-elevated rounded-full bg-surface-container-lowest flex items-center p-3 border border-surface-variant">
            <span className="material-symbols-outlined text-secondary ml-4 mr-2 text-2xl">
              search
            </span>
            <input
              className="flex-grow bg-transparent border-none focus:ring-0 text-body-lg text-on-surface h-14 outline-none"
              placeholder="Search product name, brand, model, UPC, or paste a product URL..."
              type="text"
            />
            <button className="bg-primary-container text-white text-label-sm px-8 py-3.5 rounded-full hover:bg-primary-container/90 transition-colors font-bold ml-2">
              Search
            </button>
          </div>

          <p className="text-label-sm text-secondary">
            Try:{" "}
            <span className="text-on-surface cursor-pointer hover:underline">
              Sony WH-1000XM5
            </span>
            , <span className="text-on-surface cursor-pointer hover:underline">Dyson V15</span>
            , <span className="text-on-surface cursor-pointer hover:underline">MacBook Air M3</span>
            , <span className="text-on-surface cursor-pointer hover:underline">Ninja air fryer</span>
          </p>
        </div>
      </div>
    </>
  );
}
