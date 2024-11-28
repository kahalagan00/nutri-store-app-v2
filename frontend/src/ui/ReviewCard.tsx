import { IoMdPaper, IoMdStar } from "react-icons/io";
import { ReviewSummaryVariables } from "./HomeReviewsSummary";

export const ReviewCard = ({
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
          className="h-[50px] w-[50px] rounded-full object-cover"
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
