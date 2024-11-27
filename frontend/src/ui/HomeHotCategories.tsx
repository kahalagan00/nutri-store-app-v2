import { NavLink } from "react-router-dom";
import { CapsuleButtonForward } from "./CapsuleButtonForward";

const hotCategoriesData = [
  {
    title: "Muscle",
    image: "0.svg",
    itemAmount: Math.floor(Math.random() * 50) + 1,
  },
  {
    title: "Joints",
    image: "1.svg",
    itemAmount: Math.floor(Math.random() * 50) + 1,
  },
  {
    title: "Sleep",
    image: "2.svg",
    itemAmount: Math.floor(Math.random() * 50) + 1,
  },
  {
    title: "Energy",
    image: "3.svg",
    itemAmount: Math.floor(Math.random() * 50) + 1,
  },
  {
    title: "Heart",
    image: "4.svg",
    itemAmount: Math.floor(Math.random() * 50) + 1,
  },
];

const HomeHotCategories: React.FC = () => {
  return (
    <div className="mx-auto grid w-[90%] grid-rows-[300px_auto] pb-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-neuton text-[30px] font-bold lg:text-[40px]">
            Browse our Hottest
          </h1>
          <h1 className="font-neuton text-[30px] font-bold text-blue-600 lg:text-[40px]">
            Categories
          </h1>
        </div>
        <NavLink to="/products">
          <CapsuleButtonForward message="See All" />
        </NavLink>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,200px)] justify-center gap-6 md:justify-normal">
        {hotCategoriesData.map((category) => (
          <HotCategoryCard
            key={category.title}
            title={category.title}
            imageUrl={category.image}
            itemAmount={category.itemAmount}
            color="bg-gray-300"
          />
        ))}
      </div>
    </div>
  );
};

export default HomeHotCategories;

const HotCategoryCard = ({
  color,
  imageUrl,
  title,
  itemAmount,
}: {
  color: string;
  imageUrl: string;
  title: string;
  itemAmount: number;
}) => {
  return (
    <div
      className={`flex w-[200px] flex-col items-center justify-evenly rounded-xl ${color} p-4 transition-all hover:scale-110`}
    >
      <img
        className="w-3/4"
        src={`./src/assets/popular_categories/${imageUrl}`}
        alt=""
      />
      <h2 className="font-neuton text-3xl font-bold">{title}</h2>
      <p className="font-lato font-bold text-gray-500">({itemAmount} Items)</p>
    </div>
  );
};
