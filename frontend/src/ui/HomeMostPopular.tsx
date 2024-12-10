import ProductCard from "./ProductCard";

// Only for testing, an API should be implemented for this
const bestSellingData = [
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
];

const HomeMostPopular: React.FC = () => {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center justify-evenly py-16">
      <h1 className="font-neuton text-[30px] font-bold lg:text-[40px]">
        Most Popular Products
      </h1>
      {/* 
      <div className="my-16 flex h-[40px] grid-cols-[repeat(4,_100px)] flex-col place-items-center justify-items-center gap-1 md:grid">
        <MenuCapsule message="Bone" />
        <MenuCapsule message="Muscle" />
        <MenuCapsule message="Sleep" />
        <MenuCapsule message="Bone" />
      </div> */}

      <div className="mt-16 grid w-full grid-cols-[repeat(auto-fit,minmax(288px,300px))] justify-center gap-4">
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
    </div>
  );
};

export default HomeMostPopular;

// const MenuCapsule = ({ message }: { message: string }) => {
//   return (
//     <button className="font-lato flex h-full w-full cursor-pointer items-center justify-center rounded-full text-sm font-bold text-gray-700 transition-all focus:bg-slate-600 focus:text-white">
//       {message}
//     </button>
//   );
// };
