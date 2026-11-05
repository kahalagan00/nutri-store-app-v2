import { NavLink } from "react-router-dom";
import ProductCard from "../ProductCard";
import { CapsuleButtonForward } from "../CapsuleButtonForward";
import { featuredProductsData } from "../../data/featuredProductsData";
import HomeSection from "./HomeSection";

const HomeBestSelling: React.FC = () => {
  return (
    <HomeSection
      title="Best Selling Products"
      action={
        <NavLink to="/products">
          <CapsuleButtonForward message="See All" />
        </NavLink>
      }
    >
      <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,300px))] justify-center gap-4 md:justify-normal">
        {featuredProductsData.map((product) => (
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

export default HomeBestSelling;
