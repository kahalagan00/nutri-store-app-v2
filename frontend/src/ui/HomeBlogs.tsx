import {
  IoIosArrowForward,
  IoMdCalendar,
  IoMdChatbubbles,
  IoMdPerson,
} from "react-icons/io";

const blogsData = [
  {
    author: "Daniel",
    createdAt: "2024-11-01",
    title: "How Jhuv Created The Perfect Whey",
    image: "0.jpg",
    reads: 255,
  },
  {
    author: "Joshua",
    createdAt: "2024-11-10",
    title: "Remedies For Sleeping Issues",
    image: "1.jpg",
    reads: 242,
  },
  {
    author: "Thomas",
    createdAt: "2024-11-20",
    title: "Creatine For Cognition",
    image: "2.jpg",
    reads: 267,
  },
];

const HomeBlogs: React.FC = () => {
  return (
    <div className="relative mx-auto h-auto w-[90%] py-16">
      <h1 className="font-neuton mb-8 w-full text-center text-[40px] font-bold">
        Latest News & Blogs
      </h1>
      <div className="mx-8 grid h-[500px] grid-cols-3 gap-4">
        {blogsData.map((data) => (
          <BlogCard
            key={data.title}
            title={data.title}
            author={data.author}
            createdAt={data.createdAt}
            imageUrl={`./public/images/blogs/${data.image}`}
            reads={data.reads}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBlogs;

const BlogCard = ({
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
    <div className="relative w-full drop-shadow-xl">
      <img
        className="h-[300px] rounded-lg object-cover"
        src={imageUrl}
        alt={`Image of ${title} by ${author}`}
      />
      <div className="mx-auto flex w-[95%] -translate-y-16 flex-col rounded-lg bg-white p-8">
        <div className="flex gap-4">
          <div className="flex items-center">
            <IoMdPerson style={{ color: "#3b82f6" }} className="h-5 w-5" />
            <p>&nbsp;By {author}</p>
          </div>
          <div className="flex items-center">
            <IoMdCalendar style={{ color: "#3b82f6" }} className="h-5 w-5" />

            <p>&nbsp;{formattedDate}</p>
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
