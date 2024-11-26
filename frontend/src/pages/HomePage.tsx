import HomeAboutSummary from "../ui/HomeAboutSummary";
import HomeAchievements from "../ui/HomeAchievements";
import HomeBestSelling from "../ui/HomeBestSelling";
import HomeCarousel from "../ui/HomeCarousel";
import HomeCompanyFeatures from "../ui/HomeCompanyFeatures";
import HomeCuratedCategories from "../ui/HomeCuratedCategories";
import HomeHotCategories from "../ui/HomeHotCategories";
import HomeMostPopular from "../ui/HomeMostPopular";
import HomeReviewsSummary from "../ui/HomeReviewsSummary";

function HomePage() {
  return (
    <div className={`h-full`}>
      <HomeCarousel />
      <HomeCompanyFeatures />
      <HomeHotCategories />
      <HomeCuratedCategories />
      <div className="w-full bg-slate-200">
        <HomeBestSelling />
      </div>
      <div className="w-full bg-white">
        <HomeAboutSummary />
      </div>
      <div className="w-full bg-slate-200">
        <HomeMostPopular />
      </div>
      <HomeAchievements />
      <div className="w-full bg-white">
        <HomeReviewsSummary />
      </div>
    </div>
  );
}

export default HomePage;
