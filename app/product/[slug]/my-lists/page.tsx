import MyListsClient from "./my-lists-client";

export const metadata = {
  title: "My Lists - BuyWise AI",
  description: "Saved products, custom collections, and shopping watchlists.",
};

interface ProductData {
  name: string;
  subtitle: string;
  image: string;
  price: string;
  oldPrice: string;
  retailer: string;
  rating: string;
  reviews: string;
  score: number;
  discount: string;
}

type ProductSearchParams = Partial<Record<keyof Omit<ProductData, "score">, string | string[]>> & {
  score?: string | string[];
};

const fallbackProduct: ProductData = {
  name: "Sony WH-1000XM5",
  subtitle: "Wireless Headphones",
  image: "https://images.pexels.com/photos/3394665/pexels-photo-3394665.jpeg?auto=compress&cs=tinysrgb&w=600",
  price: "$278.00",
  oldPrice: "$349.99",
  retailer: "amazon",
  rating: "4.6",
  reviews: "12,842",
  score: 89,
  discount: "12% OFF",
};

function readParam(value: string | string[] | undefined, fallback: string) {
  const normalized = Array.isArray(value) ? value[0] : value;

  return normalized?.trim() ? normalized : fallback;
}

function productFromSearchParams(searchParams?: ProductSearchParams): ProductData {
  const parsedScore = Number(readParam(searchParams?.score, String(fallbackProduct.score)));

  return {
    name: readParam(searchParams?.name, fallbackProduct.name),
    subtitle: readParam(searchParams?.subtitle, fallbackProduct.subtitle),
    image: readParam(searchParams?.image, fallbackProduct.image),
    price: readParam(searchParams?.price, fallbackProduct.price),
    oldPrice: readParam(searchParams?.oldPrice, fallbackProduct.oldPrice),
    retailer: readParam(searchParams?.retailer, fallbackProduct.retailer),
    rating: readParam(searchParams?.rating, fallbackProduct.rating),
    reviews: readParam(searchParams?.reviews, fallbackProduct.reviews),
    score: Number.isFinite(parsedScore) ? Math.min(99, Math.max(1, Math.round(parsedScore))) : fallbackProduct.score,
    discount: readParam(searchParams?.discount, fallbackProduct.discount),
  };
}

export default async function MyListsPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<ProductSearchParams>;
}) {
  const { slug } = await params;
  const product = productFromSearchParams(await searchParams);

  return <MyListsClient product={product} slug={slug} />;
}
