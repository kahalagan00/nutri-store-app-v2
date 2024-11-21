import { useGetProducts } from "../features/products/useGetProducts";
import ProductCard from "../ui/ProductCard";

const Products: React.FC = () => {
  const { products, error } = useGetProducts();
  console.log(products);

  return (
    <div className="p-8">
      <h1 className="text-4xl py-4">Products Page</h1>
      <div className="w-full grid gap-12 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {products?.map((product) => (
          <ProductCard
            key={product.name}
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

export default Products;
