import React, { useRef, useState } from "react";
import { CapsuleButtonForward } from "../CapsuleButtonForward";
import { NavLink } from "react-router-dom";
import { ArrowButton } from "../ArrowButton";
import { carouselData } from "../../data/carouselData";

const SWIPE_THRESHOLD = 50;

const HomeCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX > 0) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  return (
    <div
      className="relative h-auto w-full overflow-hidden"
      role="region"
      aria-roledescription="carousel"
      aria-label="Store highlights"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselData.map((item, index) => (
          <div
            className="w-full flex-shrink-0"
            key={item.title}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${carouselData.length}`}
            aria-hidden={index !== currentIndex}
          >
            <CarouselSlide
              title={item.title}
              message={item.message}
              backgroundImage={item.backgroundImage}
              image={item.image}
            />
          </div>
        ))}
      </div>
      <div className="absolute left-1/2 top-[90%] z-10 -translate-x-1/2 -translate-y-[50%] transform sm:-translate-y-[90%]">
        <NavLink to="/products">
          <CapsuleButtonForward message="Shop now" />
        </NavLink>
      </div>
      <div className="absolute left-8 top-1/2 z-10 -translate-y-1/2">
        <ArrowButton
          handleClick={handlePrev}
          direction="back"
          color="bg-rose-500/75"
          ariaLabel="Previous slide"
        />
      </div>
      <div className="absolute right-8 top-1/2 z-10 -translate-y-1/2">
        <ArrowButton
          handleClick={handleNext}
          direction="forward"
          color="bg-blue-500/75"
          ariaLabel="Next slide"
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
        alt=""
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-10 m-auto flex w-full flex-col items-center justify-center px-16 md:flex-row md:px-36">
        <div className="mx-auto flex w-full flex-col items-center md:items-start">
          <p className="font-lato text-xs font-bold uppercase text-blue-600 md:text-sm">
            {title}
          </p>

          <h1 className="font-neuton text-center text-base font-bold leading-tight sm:text-start md:text-2xl lg:text-4xl xl:text-6xl">
            {message}
          </h1>
        </div>
        <img
          className="mt-4 w-[130px] sm:w-[200px] md:w-[300px] md:pl-8 lg:mt-0 lg:w-[500px]"
          src={image}
          alt={title}
        />
      </div>
    </div>
  );
};
