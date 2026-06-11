import { NavLink } from "react-router-dom";
import { CapsuleButtonForward } from "../CapsuleButtonForward";
import { hotCategoriesData } from "../../data/hotCategoriesData";
import HomeSection from "./HomeSection";

const HomeHotCategories: React.FC = () => {
  return (
    <HomeSection
      title={
        <>
          Browse our Hottest{" "}
          <span className="block text-blue-600 dark:text-cyan-400">
            Categories
          </span>
        </>
      }
      action={
        <NavLink to="/products">
          <CapsuleButtonForward message="See All" />
        </NavLink>
      }
    >
      <div className="grid grid-cols-[repeat(auto-fit,200px)] justify-center gap-6 md:justify-normal">
        {hotCategoriesData.map((category) => (
          <HotCategoryCard
            key={category.title}
            title={category.title}
            imageUrl={category.image}
            itemAmount={category.itemAmount}
          />
        ))}
      </div>
    </HomeSection>
  );
};

export default HomeHotCategories;

const HotCategoryCard = ({
  imageUrl,
  title,
  itemAmount,
}: {
  imageUrl: string;
  title: string;
  itemAmount: number;
}) => {
  return (
    <NavLink
      to="/products"
      className="flex w-[200px] flex-col items-center justify-evenly rounded-xl bg-gray-300 p-4 transition-all hover:scale-110 dark:brightness-90"
    >
      <img
        className="w-3/4"
        src={`/images/popular_categories/${imageUrl}`}
        alt=""
      />
      <h2 className="font-neuton text-3xl font-bold">{title}</h2>
      <p className="font-lato font-bold text-gray-500">({itemAmount} Items)</p>
    </NavLink>
  );
};
