import { IoMdPaper, IoMdStar } from "react-icons/io";
import { ArrowButton } from "./ArrowButton";

const reviewSummaryData = [
  {
    name: "Xing Lu",
    image: "0.jpg",
    occupation: "Fitness Influencer",
    company: "Instagram",
    rating: 5,
    review:
      "This store’s high-quality supplements and knowledgeable staff have become essential to my fitness journey",
  },
  {
    name: "Abdul Rahman",
    image: "1.jpg",
    occupation: "Investment Banker",
    company: "Goldman Sachs",
    rating: 4,
    review:
      "Their trustworthy products and personalized recommendations have improved my energy and health",
  },
  {
    name: "Miranda Perez",
    image: "2.jpg",
    occupation: "Yoga Instructor",
    company: "Hotbox",
    rating: 5,
    review:
      "I love their focus on clean, natural supplements that complement my holistic wellness practice",
  },
];

const HomeReviewsSummary: React.FC = () => {
  return (
    <div className="relative mx-auto h-auto w-[90%] py-16">
      <h1 className="font-neuton w-full text-center text-[40px] font-bold">
        Why Customers Love Us?
      </h1>
      <img
        className="w-full object-contain"
        src="./src/assets/reviews_summary/background.png"
        alt=""
      />
      <div className="absolute left-1/2 top-[60%] w-[90%] -translate-x-1/2 -translate-y-[60%] transform">
        <div className="grid h-[300px] w-full grid-cols-[repeat(3,_320px)] justify-center gap-2">
          {reviewSummaryData.map((data) => (
            <ReviewCard
              key={data.name}
              name={data.name}
              imageUrl={`./src/assets/reviews_summary/${data.image}`}
              occupation={data.occupation}
              company={data.company}
              rating={data.rating}
              review={data.review}
            />
          ))}
        </div>
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 transform">
        <ArrowButton direction="back" color="bg-slate-300" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
        <ArrowButton direction="forward" color="bg-slate-300" />
      </div>
    </div>
  );
};

export default HomeReviewsSummary;

type ReviewSummaryVariables = {
  name: string;
  imageUrl: string;
  occupation: string;
  company: string;
  rating: number;
  review: string;
};

const ReviewCard = ({
  name,
  imageUrl,
  occupation,
  company,
  rating,
  review,
}: ReviewSummaryVariables) => {
  return (
    <div className="flex h-[300px] w-full flex-col justify-start rounded-lg border-b-8 border-b-blue-400 bg-blue-50 px-8 pt-6">
      <div>
        <IoMdPaper className="h-[50px] w-[50px]" />
      </div>
      <div className="mt-2 flex gap-2">
        {Array.from({ length: rating }).map((_, i) => (
          <IoMdStar key={i} className="h-[25px] w-[25px]" />
        ))}
      </div>
      <p className="font-lato mt-4 text-sm font-bold tracking-wide text-gray-500">
        "{review}"
      </p>
      <div className="mt-6 flex">
        <img
          className="h-[50px] w-[50px] rounded-full"
          src={imageUrl}
          alt={`Image of ${name}`}
        />
        <div className="ml-4">
          <p className="font-neuton text-xl font-bold">{name}</p>
          <p className="font-lato text-sm text-gray-500">
            {occupation} at{" "}
            <span className="font-bold text-black">{company}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
