import HomeAboutSummary from "../ui/HomeAboutSummary";
import HomeAchievements from "../ui/HomeAchievements";
import HomeBestSelling from "../ui/HomeBestSelling";
import HomeBlogs from "../ui/HomeBlogs";
import HomeCarousel from "../ui/HomeCarousel";
import HomeCompanyFeatures from "../ui/HomeCompanyFeatures";
import HomeCuratedCategories from "../ui/HomeCuratedCategories";
import HomeHotCategories from "../ui/HomeHotCategories";
import HomeMobileAppAdvert from "../ui/HomeMobileAppAdvert";
import HomeMostPopular from "../ui/HomeMostPopular";
import HomeReviewsSummary from "../ui/HomeReviewsSummary";

function HomePage() {
  return (
    <div className="h-full">
      <HomeCarousel />
      <HomeCompanyFeatures />
      <HomeHotCategories />
      <HomeCuratedCategories />
      <HomeBestSelling />
      <HomeAboutSummary />
      <HomeMostPopular />
      <HomeAchievements />
      <HomeReviewsSummary />
      <HomeMobileAppAdvert />
      <HomeBlogs />
    </div>
  );
}

export default HomePage;
