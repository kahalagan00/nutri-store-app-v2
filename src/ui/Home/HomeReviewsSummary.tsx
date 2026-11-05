import { reviewSummaryData } from "../../data/reviewsSummaryData";
import { ReviewCard } from "../ReviewCard";
import HomeSection from "./HomeSection";
import { ASSETS_R2_URL } from "../../utils/constants";

const HomeReviewsSummary: React.FC = () => {
  return (
    // URL passed via CSS variable so the dark:bg-none class can still remove it
    <div
      className="bg-[image:var(--bg-image)] bg-cover bg-center dark:bg-none"
      style={
        {
          "--bg-image": `url('${ASSETS_R2_URL}/reviews_summary/background.png')`,
        } as React.CSSProperties
      }
    >
      <HomeSection title="Why Customers Love Us?" align="center">
        <div className="grid justify-center gap-8 lg:grid-cols-[repeat(3,_320px)] lg:gap-4">
          {reviewSummaryData.map((data) => (
            <ReviewCard
              key={data.name}
              name={data.name}
              imageUrl={`${ASSETS_R2_URL}/reviews_summary/${data.image}`}
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
