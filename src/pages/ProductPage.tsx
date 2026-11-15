import { useGetProducts } from "../features/products/useGetProducts";
import ProductCard from "../ui/ProductCard";
import Spinner from "../ui/Spinner";
import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";
import { useState } from "react";

type Product = {
  _id: string;
  purpose: string;
  name: string;
  image: string;
  grams: number;
  matterType: string;
  price: number;
  stockQuantity: number;
  warnings: string[];
  ingredients: string[];
  nutritionalFacts: object;
  availability: boolean;
};

const SORT_COMPARATORS: Record<string, (a: Product, b: Product) => number> = {
  lowPrice: (a, b) => a.price - b.price,
  highPrice: (a, b) => b.price - a.price,
  lowStock: (a, b) => a.stockQuantity - b.stockQuantity,
  highStock: (a, b) => b.stockQuantity - a.stockQuantity,
};

// Shows a list of all the items in the store/database.
const ProductPage: React.FC = () => {
  const { isLoading, products, error, refetch } = useGetProducts();
  // Initial listing is sorted by lowPrice
  const [sortBy, setSortBy] = useState("lowPrice");

  if (isLoading) {
    return (
      <div className="h-[500px]">
        <Spinner />
      </div>
    );
  }

  // A failed refetch keeps the products already listed, so this only shows
  // when there is nothing to list: the request failed or the store is empty
  if (!products?.length) {
    return (
      <div className={PAGE_BASE_BACKGROUND_STYLE}>
        <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide dark:text-gray-50">
          Products
        </h1>
        {error ? (
          <div role="alert" className="font-lato dark:text-gray-50">
            <p>Products could not be loaded.</p>
            <button
              type="button"
              className="mt-4 rounded-xl bg-slate-800 px-4 py-2 text-gray-200 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 hover:dark:bg-slate-300"
              onClick={() => refetch()}
            >
              Try again
            </button>
          </div>
        ) : (
          <p className="font-lato dark:text-gray-50">
            No products available right now.
          </p>
        )}
      </div>
    );
  }

  // Sorted on every render from the fetched list, so the order always matches
  // the select, also after a refetch brings changed products
  const sortedProducts = [...products].sort(SORT_COMPARATORS[sortBy]);

  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide dark:text-gray-50">
        Products
      </h1>
      <label htmlFor="sort" className="sr-only">
        Sort products
      </label>
      <select
        name="sort"
        id="sort"
        className="font-lato mb-4 dark:bg-slate-700 dark:text-gray-50"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="lowPrice">Sort by: Low to high price</option>
        <option value="highPrice">Sort by: High to low price</option>
        <option value="lowStock">Sort by: Low to high stock</option>
        <option value="highStock">Sort by: High to low stock</option>
      </select>
      <div className="grid w-full grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product: Product) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
            purpose={product.purpose}
            ingredients={product.ingredients}
            warnings={product.warnings}
            stockQuantity={product.stockQuantity}
            availability={product.availability}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
