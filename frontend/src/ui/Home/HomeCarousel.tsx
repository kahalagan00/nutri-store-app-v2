import React, { useState } from "react";
import { CapsuleButtonForward } from "../CapsuleButtonForward";
import { NavLink } from "react-router-dom";
import { ArrowButton } from "../ArrowButton";
import { carouselData } from "../../data/carouselData";


const HomeCarousel: React.FC = () => {
  // NOTE: Start homepage carousel implementation here.
  // At least 5 slides
  // Infinite movement back and forth
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="relative h-auto w-full overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselData.map((item, index) => (
          <div className="w-full flex-shrink-0" key={index}>
            <CarouselSlide
              title={item.title}
              message={item.message}
              backgroundImage={item.backgroundImage}
              image={item.image}
            />
          </div>
        ))}
      </div>
      {currentIndex == 0 && (
        <div className="z-2 absolute left-1/2 top-[90%] -translate-x-1/2 -translate-y-[50%] transform sm:-translate-y-[90%]">
          <NavLink to="/products">
            <CapsuleButtonForward message="Shop now" />
          </NavLink>
        </div>
      )}
      <div className="-z-2 absolute left-8 top-1/2 -translate-y-1/2">
        <ArrowButton
          handleClick={handlePrev}
          direction="back"
          color="bg-rose-500/75"
        />
      </div>
      <div className="z-2 absolute right-8 top-1/2 -translate-y-1/2">
        <ArrowButton
          handleClick={handleNext}
          direction="forward"
          color="bg-blue-500/75"
        />
      </div>
    </div>
  );
};

export default HomeCarousel;

type CarouselSlideType = {
  title: string;
  message: string;
  backgroundImage: string;
  image: string;
};

const CarouselSlide: React.FC<CarouselSlideType> = ({
  title,
  message,
  backgroundImage,
  image,
}) => {
  return (
    <div className="relative">
      <img
        className="z-0 w-full"
        src={backgroundImage}
        alt="Carousel picture 1"
      />
      <div className="z-1 absolute inset-0 left-0 top-0 m-auto flex w-full flex-col items-center justify-center px-16 md:flex-row md:px-36">
        <div className="md:w-fullmd:flex-none mx-auto flex w-full flex-col items-center md:items-start">
          <p className="font-lato text-[8px] font-bold uppercase text-blue-600 md:text-[14px]">
            {title}
          </p>

          <h1 className="font-neuton leading-11 text-center text-[12px] font-bold sm:text-start md:text-[25px] lg:text-[40px] xl:text-[60px]">
            {message}
          </h1>
        </div>
        <img
          className="mt-4 w-[130px] sm:w-[200px] md:w-[300px] md:pl-8 lg:mt-0 lg:w-[500px]"
          src={image}
          alt="Carousel internal image"
        />
      </div>
    </div>
  );
};
