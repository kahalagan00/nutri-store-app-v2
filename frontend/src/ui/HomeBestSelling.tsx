// import { ArrowButton } from "./ArrowButton";
import ProductCard from "./ProductCard";

// Only for testing, an API should be implemented for this
const bestSellingData = [
  {
    _id: "673fadeb9157c0b806d888d7",
    purpose: "Immune support",
    name: "Vitamin C",
    image: "jhuv-vitamin-c.png",
    grams: 0.5,
    matterType: "solid",
    price: 12.99,
    stockQuantity: 100,
    warnings: ["High doses may cause stomach upset"],
    ingredients: [
      "Vitamin C (ascorbic acid)",
      "Cellulose",
      "Magnesium stearate",
    ],
    nutritionalFacts: {
      calories: 0,
      carbohydrates: 0,
      protein: 0,
    },
  },
  {
    _id: "673fadeb9157c0b806d888d8",
    purpose: "Energy boost",
    name: "Caffeine",
    image: "jhuv-caffeine.png",
    grams: 0.2,
    matterType: "solid",
    price: 9.99,
    stockQuantity: 100,
    warnings: ["Avoid if sensitive to caffeine"],
    ingredients: ["Caffeine anhydrous"],
    nutritionalFacts: {
      calories: 0,
      carbohydrates: 0,
      protein: 0,
    },
  },
  {
    _id: "673fadeb9157c0b806d888d9",
    purpose: "Improved focus",
    name: "Omega-3 Fish Oil",
    image: "jhuv-omega-3.png",
    grams: 1,
    matterType: "liquid",
    price: 24.99,
    stockQuantity: 90,
    warnings: ["Consult a doctor if taking blood thinners"],
    ingredients: ["Fish oil", "Gelatin", "Glycerin", "Water"],
    nutritionalFacts: {
      calories: 10,
      carbohydrates: 0,
      protein: 0,
    },
  },
  {
    _id: "673fadeb9157c0b806d888d5",
    purpose: "Increase muscle mass",
    name: "Whey Protein",
    image: "jhuv-whey-protein.png",
    grams: 30,
    matterType: "solid",
    price: 29.99,
    stockQuantity: 1,
    warnings: [
      "Contains dairy",
      "Not suitable for lactose-intolerant individuals",
    ],
    ingredients: [
      "Whey protein concentrate",
      "Cocoa powder",
      "Natural flavors",
      "Sucralose",
    ],
    nutritionalFacts: {
      calories: 120,
      carbohydrates: 3,
      protein: 24,
    },
  },
  {
    _id: "673fadeb9157c0b806d888d6",
    purpose: "Joint support",
    name: "Glucosamine Chondroitin",
    image: "jhuv-glucosamine.png",
    grams: 1.5,
    matterType: "solid",
    price: 19.99,
    stockQuantity: 1000,
    warnings: ["Consult a doctor if pregnant or nursing"],
    ingredients: [
      "Glucosamine sulfate",
      "Chondroitin sulfate",
      "Gelatin capsule",
    ],
    nutritionalFacts: {
      calories: 0,
      carbohydrates: 0,
      protein: 0,
    },
  },
];

const HomeBestSelling: React.FC = () => {
  return (
    <div className="mx-auto w-[90%] py-16">
      <div className="mb-16 flex items-center justify-between">
        <h1 className="font-neuton text-[30px] font-bold lg:text-[40px]">
          Best Selling Products
        </h1>

        {/* Sliding Window Carousel Buttons */}
        {/* <div className="flex gap-2">
          <ArrowButton direction="back" color="bg-slate-200" />
          <ArrowButton direction="forward" color="bg-slate-400" />
        </div> */}
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(288px,300px))] justify-center gap-4 md:justify-normal">
        {bestSellingData.map((data) => (
          <ProductCard
            key={data._id}
            _id={data._id}
            name={data.name}
            image={data.image}
            price={data.price}
            purpose={data.purpose}
            ingredients={data.ingredients}
            warnings={data.warnings}
            stockQuantity={data.stockQuantity}
            availability={data.stockQuantity > 0}
          />
        ))}
      </div>

      {/* Sliding Carousel Window Indicator*/}
      {/* Implement functionality later */}
      {/* <div className="mx-auto mt-8 flex w-[100px] justify-evenly">
        <div className="h-3 w-3 scale-125 rounded-full bg-sky-500"></div>
        <div className="h-3 w-3 rounded-full bg-gray-600"></div>
        <div className="h-3 w-3 rounded-full bg-gray-600"></div>
        <div className="h-3 w-3 rounded-full bg-gray-600"></div>
      </div> */}
    </div>
  );
};

export default HomeBestSelling;
