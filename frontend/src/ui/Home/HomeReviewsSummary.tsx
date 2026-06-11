import { reviewSummaryData } from "../../data/reviewsSummaryData";
import { ReviewCard } from "../ReviewCard";
import HomeSection from "./HomeSection";

const HomeReviewsSummary: React.FC = () => {
  return (
    <div className="bg-[url('/images/reviews_summary/background.png')] bg-cover bg-center dark:bg-none">
      <HomeSection title="Why Customers Love Us?" align="center">
        <div className="grid justify-center gap-8 lg:grid-cols-[repeat(3,_320px)] lg:gap-4">
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
      </HomeSection>
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
