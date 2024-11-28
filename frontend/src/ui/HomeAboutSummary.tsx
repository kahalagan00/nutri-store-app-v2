import { NavLink } from "react-router-dom";
import { CapsuleButtonForward } from "./CapsuleButtonForward";

const HomeAboutSummary: React.FC = () => {
  return (
    <div className="font-lato mx-auto flex w-[90%] gap-x-8 py-16">
      <div className="flex w-[50%] items-center justify-center">
        <img
          className="h-full w-full object-contain"
          src="./public/images/about_summary/0.png"
          alt="Picture of a scientist pharmacist"
        />
      </div>

      <div className="flex w-[50%] flex-col justify-end">
        <p className="text-sm font-bold uppercase text-blue-500">about us</p>
        <h1 className="font-neuton text-[30px] leading-9 lg:text-[40px]">
          We are dedicated to collaborating with accredited pharmacists and
          trusted farmers.
        </h1>
        <p className="line my-6 text-xs leading-6 tracking-wide text-gray-400">
          At Jhuv Nutrition, we are committed to providing high-quality,
          trustworthy nutrition solutions by partnering with accredited
          pharmacists and farmers. This collaboration ensures that our products
          are crafted with expertise and sourced responsibly, combining
          science-backed formulations with naturally grown ingredients. Our
          mission is to empower healthier lifestyles by delivering supplements
          and wellness products that you can rely on for purity, safety, and
          effectiveness.
        </p>
        <NavLink to="/about">
          <CapsuleButtonForward message="Learn More" />
        </NavLink>
      </div>
    </div>
  );
};

export default HomeAboutSummary;
