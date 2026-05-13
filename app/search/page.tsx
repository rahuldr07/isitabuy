import SearchHeader from "../components/SearchHeader";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  verdict: "buy" | "wait" | "avoid";
  aiScore: number;
  reviewTrust: string;
  priceScore: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    image:
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 299,
    verdict: "buy",
    aiScore: 92,
    reviewTrust: "High (4.8 ★)",
    priceScore: "Excellent value. Price is near the 30-day low of $298.",
  },
  {
    id: 2,
    name: "Apple MacBook Air M3 (13-inch, 2024)",
    image:
      "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    price: 999,
    verdict: "wait",
    aiScore: 65,
    reviewTrust: "Very High (4.9 ★)",
    priceScore: "Poor value today. Wait for a drop to ~$899 based on recent history.",
  },
  {
    id: 3,
    name: "Dyson V15 Detect Cordless Vacuum",
    image:
      "https://images.pexels.com/photos/3962285/pexels-photo-3962285.jpeg?auto=compress&cs=tinysrgb&w=600",
    price: 549,
    verdict: "avoid",
    aiScore: 42,
    reviewTrust: "Medium (4.7 ★)",
    priceScore: "Overpriced. A better alternative is available for less.",
  },
];

export default function SearchPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-on-background">
      <SearchHeader />
      <main className="flex-grow max-w-container-max mx-auto w-full px-margin-mobile md:px-gutter py-stack-lg">
        <div className="flex flex-col lg:flex-row gap-12">
          <FilterSidebar />
          <div className="w-full lg:flex-1">
            {/* Header + Sort */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4 sm:mb-0">
                Search products
              </h2>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 bg-surface-container-lowest border border-surface-variant rounded-full font-label-sm text-label-sm text-on-surface font-semibold shadow-sm hover:bg-surface-variant/50 transition-colors">
                  Best Value
                </button>
                <button className="px-4 py-2 bg-surface-container-lowest border border-surface-variant rounded-full font-label-sm text-label-sm text-on-surface font-semibold shadow-sm hover:bg-surface-variant/50 transition-colors">
                  Most Trusted Reviews
                </button>
              </div>
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="inline-flex items-center px-3 py-1 bg-surface-variant/30 border border-surface-variant rounded-full font-label-sm text-label-sm text-on-surface-variant">
                Electronics
                <button className="ml-2 hover:text-on-surface">
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </button>
              </span>
              <span className="inline-flex items-center px-3 py-1 bg-surface-variant/30 border border-surface-variant rounded-full font-label-sm text-label-sm text-on-surface-variant">
                Amazon
                <button className="ml-2 hover:text-on-surface">
                  <span className="material-symbols-outlined text-sm">
                    close
                  </span>
                </button>
              </span>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
