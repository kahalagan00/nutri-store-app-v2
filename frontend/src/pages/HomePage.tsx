import HomeCarousel from "../ui/HomeCarousel";
import HomeCompanyFeatures from "../ui/HomeCompanyFeatures";
import HomeHotCategories from "../ui/HomeHotCategories";

function HomePage() {
  return (
    <div className={`h-full bg-slate-200`}>
      <HomeCarousel />
      <HomeCompanyFeatures />
      <HomeHotCategories />
    </div>
  );
}

export default HomePage;
