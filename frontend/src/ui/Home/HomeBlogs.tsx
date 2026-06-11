import { BlogCard } from "../BlogCard";
import { blogsData } from "../../data/blogsData";
import HomeSection from "./HomeSection";

const HomeBlogs: React.FC = () => {
  return (
    <HomeSection title="Latest News & Blogs" align="center">
      <div className="grid gap-4 lg:grid-cols-3">
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
    </HomeSection>
  );
};

export default HomeBlogs;
