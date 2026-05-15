import SimpleNav from "./SimpleNav";

export default function SearchHeader() {
  return (
    <>
      <SimpleNav variant="sticky" />

      {/* Search Hero */}
      <div className="bg-surface-container-lowest border-b border-surface-variant/50">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-gutter py-stack-lg text-center">
          <div className="inline-flex items-center space-x-2 bg-surface-container-high px-4 py-2 rounded-full mb-6">
            <span
              className="material-symbols-outlined text-verdict-buy text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Our AI scores are not based on commission
            </span>
          </div>
          <h1 className="font-display-xl text-display-xl text-on-surface mb-4">
            Search any product
          </h1>
          <p className="font-body-lg text-body-lg text-secondary mb-8 max-w-3xl mx-auto">
            Find products across Amazon, Walmart, Best Buy, Target, and eBay.
            Filter by price, rating, retailer, and review trust.
          </p>

          {/* Search input */}
          <div className="relative max-w-3xl mx-auto mb-4 shadow-elevated rounded-full bg-surface-container-lowest flex items-center p-3 border border-surface-variant">
            <span className="material-symbols-outlined text-secondary ml-4 mr-2 text-2xl">
              search
            </span>
            <input
              className="flex-grow bg-transparent border-none focus:ring-0 font-body-lg text-body-lg text-on-surface h-14 outline-none"
              placeholder="Search product name, brand, model, UPC, or paste a product URL..."
              type="text"
            />
            <div className="flex space-x-2">
              <button className="bg-primary-container text-white font-label-sm text-label-sm px-8 py-3.5 rounded-full hover:bg-primary-container/90 transition-colors font-bold ml-2">
                Search
              </button>
            </div>
          </div>

          <p className="font-label-sm text-label-sm text-secondary">
            Try:{" "}
            <span className="text-on-surface cursor-pointer hover:underline">
              Sony WH-1000XM5
            </span>
            ,{" "}
            <span className="text-on-surface cursor-pointer hover:underline">
              Dyson V15
            </span>
            ,{" "}
            <span className="text-on-surface cursor-pointer hover:underline">
              MacBook Air M3
            </span>
            ,{" "}
            <span className="text-on-surface cursor-pointer hover:underline">
              Ninja air fryer
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
