import { BlogCard } from "./BlogCard";

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
    <div className="mx-auto h-auto w-[90%] py-16">
      <h1 className="font-neuton mb-8 w-full text-center text-[40px] font-bold">
        Latest News & Blogs
      </h1>
      <div className="mx-8 grid gap-4 lg:grid-cols-3">
        {blogsData.map((data) => (
          <BlogCard
            key={data.title}
            title={data.title}
            author={data.author}
            createdAt={data.createdAt}
            imageUrl={`/images/blogs/${data.image}`}
            reads={data.reads}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeBlogs;
