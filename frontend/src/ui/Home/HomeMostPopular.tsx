import { NavLink } from "react-router-dom";
import ProductCard from "../ProductCard";
import { CapsuleButtonForward } from "../CapsuleButtonForward";
import { featuredProductsData } from "../../data/featuredProductsData";
import HomeSection from "./HomeSection";

// Placeholder ordering until a popularity API exists
const mostPopularProducts = [...featuredProductsData].reverse();

const HomeMostPopular: React.FC = () => {
  return (
    <HomeSection
      title="Most Popular Products"
      action={
        <NavLink to="/products">
          <CapsuleButtonForward message="See All" />
        </NavLink>
      }
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,300px))] justify-center gap-4 md:justify-normal">
        {mostPopularProducts.map((product) => (
          <ProductCard
            key={product._id}
            {...product}
            availability={product.stockQuantity > 0}
          />
        ))}
      </div>
    </HomeSection>
  );
};

export default HomeMostPopular;
