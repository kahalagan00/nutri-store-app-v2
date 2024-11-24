import CarouselHome from "../ui/CarouselHome";
import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";

function HomePage() {
  return (
    <div className={`h-full bg-slate-200`}>
      <CarouselHome />
    </div>
  );
}

export default HomePage;
