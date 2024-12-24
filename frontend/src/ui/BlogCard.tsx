import {
  IoMdPerson,
  IoMdCalendar,
  IoIosArrowForward,
  IoMdChatbubbles,
} from "react-icons/io";

export const BlogCard = ({
  author,
  createdAt,
  title,
  imageUrl,
  reads,
}: {
  author: string;
  createdAt: string;
  title: string;
  imageUrl: string;
  reads: number;
}) => {
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "short", // "Nov"
    day: "2-digit", // "01"
    year: "numeric", // "2024"
  });

  return (
    <div className="relative w-full drop-shadow-xl dark:brightness-95">
      <img
        className="h-[300px] w-full rounded-lg object-cover"
        src={imageUrl}
        alt={`Image of ${title} by ${author}`}
      />
      <div className="mx-auto flex w-[95%] -translate-y-16 flex-col rounded-lg bg-white p-8">
        <div className="flex gap-2 sm:gap-4">
          <div className="flex items-center">
            <IoMdPerson style={{ color: "#3b82f6" }} className="h-5 w-5" />
            <p className="text-xs sm:text-sm">&nbsp;By {author}</p>
          </div>
          <div className="flex items-center">
            <IoMdCalendar style={{ color: "#3b82f6" }} className="h-5 w-5" />

            <p className="text-xs sm:text-sm">&nbsp;{formattedDate}</p>
          </div>
        </div>

        <h1 className="font-neuton mt-2 border-b-2 border-b-gray-300 pb-4 text-3xl font-semibold">
          {title}
        </h1>

        <div className="mt-4 flex justify-between gap-6">
          <div className="flex items-center">
            <p>Read Me&nbsp;</p>
            <IoIosArrowForward
              style={{ color: "#3b82f6" }}
              className="h-5 w-5"
            />
          </div>
          <div className="flex items-center">
            <IoMdChatbubbles className="h-5 w-5" style={{ color: "#e11d48" }} />
            <p>&nbsp;{reads}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
