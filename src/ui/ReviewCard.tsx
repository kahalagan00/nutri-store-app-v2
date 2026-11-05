import { IoMdPaper, IoMdStar } from "react-icons/io";
import { ReviewSummaryVariables } from "./Home/HomeReviewsSummary";

export const ReviewCard = ({
  name,
  imageUrl,
  occupation,
  company,
  rating,
  review,
}: ReviewSummaryVariables) => {
  return (
    <div className="flex h-full w-full flex-col justify-start rounded-lg border-b-8 border-b-blue-400 bg-blue-50 px-8 py-6 dark:border-b-cyan-400 dark:bg-slate-600">
      <div className="dark:text-gray-100">
        <IoMdPaper className="h-[40px] w-[40px] sm:h-[50px] sm:w-[50px]" />
      </div>
      <div className="mt-2 flex gap-2 dark:text-gray-100">
        {Array.from({ length: rating }).map((_, i) => (
          <IoMdStar key={i} className="h-[25px] w-[25px]" />
        ))}
      </div>
      <p className="font-lato mt-4 text-xs font-bold tracking-wide text-gray-500 sm:text-sm dark:text-gray-300">
        "{review}"
      </p>
      <div className="mt-6 flex">
        <img
          className="h-[50px] w-[50px] rounded-full object-cover"
          src={imageUrl}
          alt={name}
        />
        <div className="ml-4">
          <p className="font-neuton text-xl font-bold dark:text-gray-50">
            {name}
          </p>
          <p className="font-lato text-sm text-gray-500 dark:text-gray-300">
            {occupation} at{" "}
            <span className="font-bold text-black dark:text-white">
              {company}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
