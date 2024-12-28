import React, { useState } from "react";
import { CapsuleButtonForward } from "./CapsuleButtonForward";
// import { ArrowButton } from "./ArrowButton";
import { NavLink } from "react-router-dom";
import { ArrowButton } from "./ArrowButton";

const carouselData = [
  {
    title: "we are jhuv nutrition",
    message: "Choose Jhuv, the best nutrition your body deserves",
    backgroundImage: "/images/carousel_images/0_background.png",
    image: "/images/carousel_images/0_item.png",
  },
  {
    title: "world leader for supplementation",
    message: "One of the leading pioneers of supplementation technology",
    backgroundImage: "/images/carousel_images/0_background.png",
    image: "/images/carousel_images/1_item.svg",
  },
  {
    title: "fast shipping and delivery",
    message:
      "Hassle free delivery configurations with 100% guaranteed arrivals",
    backgroundImage: "/images/carousel_images/0_background.png",
    image: "/images/carousel_images/2_item.svg",
  },
  {
    title: "global popularity and recognition",
    message: "Used by superstar athletes in the NBA and Premier League",
    backgroundImage: "/images/carousel_images/0_background.png",
    image: "/images/carousel_images/3_item.svg",
  },
  {
    title: "giving back to community",
    message:
      "We are active in providing aid to other countries and people in need",
    backgroundImage: "/images/carousel_images/0_background.png",
    image: "/images/carousel_images/4_item.svg",
  },
];

const HomeCarousel: React.FC = () => {
  // Start homepage carousel implementation here.
  // At least 5 slides
  // Infinite movement back and forth
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1,
    );

    console.log("currentIndex=", currentIndex);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1,
    );
    console.log("currentIndex=", currentIndex);
  };

  return (
    <div className="relative h-auto w-full overflow-hidden">
      {/* <CarouselSlide
        title={carouselData[currentIndex].title}
        message={carouselData[currentIndex].message}
        backgroundImage={carouselData[currentIndex].backgroundImage}
        image={carouselData[currentIndex].image}
      /> */}

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

// Carousel Example
/*
// Carousel.js
import React, { useState } from "react";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative flex items-center w-80 overflow-hidden mx-auto">
      <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
        onClick={handlePrev}
      >
        &#9664;
      </button>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item, index) => (
          <div className="flex-shrink-0 w-full" key={index}>
            {item}
          </div>
        ))}
      </div>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-80"
        onClick={handleNext}
      >
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;

// Example usage in App.js
// import Carousel from './Carousel';
// 
// const items = [
//   <img src="https://via.placeholder.com/300x150" alt="1" className="w-full h-auto" />,
//   <img src="https://via.placeholder.com/300x150" alt="2" className="w-full h-auto" />,
//   <img src="https://via.placeholder.com/300x150" alt="3" className="w-full h-auto" />,
// ];
// 
// function App() {
//   return <Carousel items={items} />;
// };

// Note: No external CSS file is used. Tailwind CSS is utilized entirely for styling.

*/
