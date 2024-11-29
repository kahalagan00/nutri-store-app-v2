// import { ArrowButton } from "./ArrowButton";
import { ReviewCard } from "./ReviewCard";

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
    <div className="relative mx-auto h-[1200px] w-[90%] py-16 lg:h-auto">
      <h1 className="font-neuton w-full text-center text-[40px] font-bold">
        Why Customers Love Us?
      </h1>
      <img
        className="w-full object-contain"
        src="/images/reviews_summary/background.png"
        alt=""
      />
      <div className="absolute left-1/2 top-0 w-[90%] -translate-x-1/2 translate-y-[200px] transform lg:top-1/2 lg:-translate-y-1/2">
        <div className="grid h-[300px] w-full justify-center gap-8 lg:grid-cols-[repeat(3,_320px)] lg:gap-2">
          {reviewSummaryData.map((data) => (
            <ReviewCard
              key={data.name}
              name={data.name}
              imageUrl={`/images/reviews_summary/${data.image}`}
              occupation={data.occupation}
              company={data.company}
              rating={data.rating}
              review={data.review}
            />
          ))}
        </div>
      </div>

      {/* Use later when implementing carousel slide */}
      {/* <div className="absolute left-0 top-1/2 -translate-y-1/2 transform">
        <ArrowButton direction="back" color="bg-slate-300" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 transform">
        <ArrowButton direction="forward" color="bg-slate-300" />
      </div> */}
    </div>
  );
};

export default HomeReviewsSummary;

export type ReviewSummaryVariables = {
  name: string;
  imageUrl: string;
  occupation: string;
  company: string;
  rating: number;
  review: string;
};
