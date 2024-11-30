import { BlogCard } from "../ui/BlogCard";
import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

const fullBlogsData = [
  {
    author: "Daniel",
    createdAt: "2024-11-01",
    title: "How Jhuv Created The Perfect Whey Protein",
    image: "0.jpg",
    reads: 255,
  },
  {
    author: "Sophia",
    createdAt: "2024-11-03",
    title: "5 Essential Supplements for Busy Professionals",
    image: "1.jpg",
    reads: 312,
  },
  {
    author: "Liam",
    createdAt: "2024-10-28",
    title: "The Science Behind Our All-Natural Multivitamin",
    image: "2.jpg",
    reads: 198,
  },
  {
    author: "Emma",
    createdAt: "2024-11-07",
    title: "Why Farmers Matter: The Roots of Quality Nutrition",
    image: "3.jpg",
    reads: 276,
  },
  {
    author: "Noah",
    createdAt: "2024-10-30",
    title: "How Jhuv Supports Sustainable Sourcing",
    image: "4.jpg",
    reads: 347,
  },
  {
    author: "Isabella",
    createdAt: "2024-11-05",
    title: "Top 3 Supplements to Boost Energy Naturally",
    image: "5.jpg",
    reads: 421,
  },
  {
    author: "Oliver",
    createdAt: "2024-11-08",
    title: "Behind the Scenes: Crafting Our Immune-Boosting Formula",
    image: "6.jpg",
    reads: 189,
  },
  {
    author: "Ava",
    createdAt: "2024-11-02",
    title: "The Role of Accredited Pharmacists in Nutrition",
    image: "7.jpg",
    reads: 242,
  },
  {
    author: "William",
    createdAt: "2024-11-04",
    title: "The Journey from Farm to Supplement Bottle",
    image: "8.jpg",
    reads: 305,
  },
  {
    author: "Mia",
    createdAt: "2024-11-06",
    title: "How to Choose the Right Supplement for Your Lifestyle",
    image: "9.jpg",
    reads: 398,
  },
  {
    author: "Ethan",
    createdAt: "2024-11-09",
    title: "Exploring the Benefits of Plant-Based Supplements",
    image: "10.jpg",
    reads: 264,
  },
];

// Shows a list of Blog statistics in cards
function BlogsPage() {
  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide">Blogs</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        {fullBlogsData.map((data) => (
          <BlogCard
            key={data.title}
            title={data.title}
            author={data.author}
            createdAt={data.createdAt}
            imageUrl={`/images/blogs_page/${data.image}`}
            reads={data.reads}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogsPage;
