import { CapsuleForward } from "./CapsuleForward";
import { ArrowButton } from "./ArrowButton";

const carouselData = [
  {
    title: "we are jhuv nutrition",
    message: "Choose Jhuv, the best nutrition your body deserves",
  },
];

const CarouselHome: React.FC = () => {
  return (
    <div className="relative h-auto w-full overflow-hidden">
      <img
        className="z-0"
        src="./src/assets/carousel_images/0_background.png"
        alt="Carousel picture 1"
      />
      <div className="z-1 absolute inset-0 left-0 top-0 m-auto flex w-full flex-col items-center justify-center px-16 md:flex-row md:px-36">
        <div className="md:w-fullmd:flex-none mx-auto flex w-full flex-col items-center md:items-start">
          <p className="font-lato text-[8px] font-bold uppercase text-blue-600 md:text-[16px]">
            {carouselData[0].title}
          </p>
          <h1 className="font-neuton text-[15px] font-bold md:text-[30px] lg:text-[40px]">
            {carouselData[0].message}
          </h1>
        </div>
        <img
          className="w-[200px] pl-8 md:w-[300px] lg:w-[500px]"
          src="./src/assets/carousel_images/0_item.png"
          alt=""
        />
      </div>

      <div className="z-2 absolute left-1/2 top-[90%] -translate-x-1/2 -translate-y-[90%] transform">
        <CapsuleForward />
      </div>

      <div className="-z-2 absolute left-8 top-1/2 -translate-y-1/2">
        <ArrowButton direction="back" color="rose" />
      </div>

      <div className="z-2 absolute right-8 top-1/2 -translate-y-1/2">
        <ArrowButton direction="forward" color="blue" />
      </div>
    </div>
  );
};

export default CarouselHome;
