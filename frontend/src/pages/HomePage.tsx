import HomeAboutSummary from "../ui/Home/HomeAboutSummary";
import HomeAchievements from "../ui/Home/HomeAchievements";
import HomeBestSelling from "../ui/Home/HomeBestSelling";
import HomeBlogs from "../ui/Home/HomeBlogs";
import HomeCarousel from "../ui/Home/HomeCarousel";
import HomeCompanyFeatures from "../ui/Home/HomeCompanyFeatures";
import HomeCuratedCategories from "../ui/Home/HomeCuratedCategories";
import HomeHotCategories from "../ui/Home/HomeHotCategories";
import HomeMobileAppAdvert from "../ui/Home/HomeMobileAppAdvert";
import HomeMostPopular from "../ui/Home/HomeMostPopular";
import HomeReviewsSummary from "../ui/Home/HomeReviewsSummary";

// NOTE: All main information about the store summarized in the front page
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
