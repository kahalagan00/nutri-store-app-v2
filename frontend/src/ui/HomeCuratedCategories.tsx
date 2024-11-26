import { CapsuleButtonRegular } from "./CapsuleButtonRegular";

const curatedCategoryData = [
  {
    title: "up to 20% off",
    message: "Fresh Organic Ingredients",
    image: "0.png",
    bgColor: "bg-blue-600",
    textColor: "text-white",
  },
  {
    title: "up to 25% off",
    message: "Improve Your Nutrition",
    image: "1.png",
    bgColor: "bg-blue-400",
    textColor: "text-black",
  },
  {
    title: "naturally fresh",
    message: "Juices 100% Organic",
    image: "2.png",
    bgColor: "bg-rose-600",
    textColor: "text-white",
  },
];

const HomeCuratedCategoies: React.FC = () => {
  return (
    <div className="mx-auto w-[90%] pb-16">
      <div className="grid h-full w-full grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5">
        {curatedCategoryData.map((data) => (
          <CuratedCategoryCard
            key={data.message}
            title={data.title}
            message={data.message}
            imageUrl={`./src/assets/curated_categories/${data.image}`}
            bgColor={data.bgColor}
            textColor={data.textColor}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeCuratedCategoies;

const CuratedCategoryCard = ({
  bgColor,
  textColor,
  title,
  message,
  imageUrl,
}: {
  bgColor: string;
  textColor: string;
  title: string;
  message: string;
  imageUrl: string;
}) => {
  return (
    <div
      className={`font-lato h-[250px] w-full ${bgColor} flex gap-4 rounded-xl`}
    >
      <div className="flex w-[50%] flex-col items-start justify-evenly pl-8">
        <p className={`${textColor} text-sm uppercase`}>{title}</p>
        <p className={`${textColor} text-2xl font-bold`}>{message}</p>
        <CapsuleButtonRegular
          buttonColor="bg-white"
          textColor="text-black"
          text="See All"
        />
      </div>
      <div className="flex w-[50%] items-center justify-center p-2">
        <img
          className="w-full object-contain"
          src={imageUrl}
          alt={`Image of (${message})`}
        />
      </div>
    </div>
  );
};
