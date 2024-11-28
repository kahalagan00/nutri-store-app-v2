import toast from "react-hot-toast";
import { useGetProducts } from "../features/products/useGetProducts";
import ProductCard from "../ui/ProductCard";
import Spinner from "../ui/Spinner";
import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

const ProductPage: React.FC = () => {
  const { isLoading, products, error } = useGetProducts();

  if (isLoading || !products[0]) {
    return (
      <div className="h-[500px]">
        <Spinner />
      </div>
    );
  }

  if (error) {
    toast.error("Error when fetching products");
    return;
  }

  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide">Products</h1>
      <div className="grid w-full grid-cols-1 justify-items-center gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {products?.map((product) => (
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
