import { ReviewCard } from "../ui/ReviewCard";
import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

const fullReviewsData = [
  {
    name: "Jordan Smith",
    image: "1.jpg",
    occupation: "Graphic Designer",
    company: "Creative Studio Co.",
    rating: 5,
    review:
      "This store’s supplements have boosted my focus and energy, making long design sessions much easier. Their customer service is also incredibly helpful and friendly.",
  },
  {
    name: "Maria Gonzales",
    image: "2.jpg",
    occupation: "Small Business Owner",
    company: "Maria's Bakery",
    rating: 4,
    review:
      "I appreciate the quality of their products and the transparency in their ingredients. The supplements have really helped me stay energized during my busy days at the bakery.",
  },
  {
    name: "Ahmed Malik",
    image: "3.jpg",
    occupation: "Engineer",
    company: "Tech Innovations Ltd.",
    rating: 5,
    review:
      "These supplements have been great for improving my focus and managing stress after long workdays. I highly recommend their products to anyone looking for reliable health solutions.",
  },
  {
    name: "Samantha Lee",
    image: "4.jpg",
    occupation: "Freelance Writer",
    company: "Self-Employed",
    rating: 4,
    review:
      "The natural ingredients in their products are a big plus for me, and I’ve noticed better concentration during my writing sessions. I also love how easy it is to find what I need on their website.",
  },
  {
    name: "Kevin O’Reilly",
    image: "5.jpg",
    occupation: "Retired Teacher",
    company: "N/A",
    rating: 5,
    review:
      "I’ve been using their supplements for a few months, and I feel more energetic and balanced. Their commitment to quality gives me confidence in every purchase I make.",
  },
  {
    name: "Olivia Perez",
    image: "6.jpg",
    occupation: "College Student",
    company: "State University",
    rating: 5,
    review:
      "Their supplements have been a lifesaver during exam season, keeping me focused and energized. I love that the products are natural and affordable for students.",
  },
];

// Shows a list of reviews by users in a card format
function ReviewsPage() {
  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-8 pt-4 text-5xl tracking-wide">Reviews</h1>
      <div className="grid gap-8 lg:grid-cols-2">
        {fullReviewsData.map((data) => (
          <ReviewCard
            key={data.name}
            name={data.name}
            imageUrl={`/images/reviews_page/${data.image}`}
            occupation={data.occupation}
            company={data.company}
            rating={data.rating}
            review={data.review}
          />
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage;
