import toast from "react-hot-toast";
import { useGetProducts } from "../features/products/useGetProducts";
import ProductCard from "../ui/ProductCard";
import Spinner from "../ui/Spinner";
import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";
import { useEffect, useState } from "react";

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

// Shows a list of all the items in the store/database.
const ProductPage: React.FC = () => {
  const { isLoading, products, error } = useGetProducts();
  const [outputProducts, setOutputProducts] = useState(products);

  useEffect(() => {
    if (products && products.length > 0) {
      // Initial listing is sorted by lowPrice
      setOutputProducts(
        products.sort((a: Product, b: Product) => a.price - b.price),
      );
    }
  }, [products]);

  if (isLoading || !products[0]) {
    return (
      <div className="h-[500px]">
        <Spinner />
      </div>
    );
  }

  const handleFilterChange = (value: string) => {
    console.log(value);
    let sortedProducts = [...outputProducts];

    if (value === "highPrice") {
      sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
    } else if (value === "lowPrice") {
      sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "lowStock") {
      sortedProducts = sortedProducts.sort(
        (a, b) => a.stockQuantity - b.stockQuantity,
      );
    } else if (value === "highStock") {
      sortedProducts = sortedProducts.sort(
        (a, b) => b.stockQuantity - a.stockQuantity,
      );
    }

    setOutputProducts(sortedProducts);

    console.log(sortedProducts);
  };

  if (error) {
    toast.error("Error when fetching products");
    return;
  }

  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide dark:text-gray-50">
        Products
      </h1>
      <select
        name="filters"
        id="filters"
        className="font-lato mb-4 outline-none dark:bg-slate-700 dark:text-gray-50"
        onChange={(e) => handleFilterChange(e.target.value)}
      >
        <option value="lowPrice">Sort by: Low to high price</option>
        <option value="highPrice">Sort by: High to low price</option>
        <option value="lowStock">Sort by: Low to high stock</option>
        <option value="highStock">Sort by: High to low stock</option>
      </select>
      <div className="grid w-full grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {outputProducts?.map((product: Product) => (
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
