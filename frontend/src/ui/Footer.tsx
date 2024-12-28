import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoMdArrowForward,
  IoMdMail,
} from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import {
  PAYMENT_METHODS_SRC,
  STORE_ADDRESS,
  STORE_PHONE_NUMBER,
  STORE_WEBSITE,
} from "../utils/constants";
import Logo from "./Logo";
import React from "react";
import { NavLink } from "react-router-dom";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="mx-auto w-full pb-16 text-3xl sm:pb-4">
      {/* Top Footer */}
      <div className="mx-auto flex w-[90%] flex-col justify-items-center rounded-2xl bg-blue-100 p-4 text-black lg:grid lg:h-[400px] lg:grid-cols-4 lg:p-16 dark:bg-slate-800">
        <FooterSocialBlock />
        <div className="flex flex-row items-center justify-between p-2 lg:flex-col">
          <h1 className="font-neuton hidden text-2xl font-bold tracking-wide lg:block dark:text-gray-50">
            Categories
          </h1>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            Muscle
          </p>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            Joints
          </p>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            Sleep
          </p>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            Energy
          </p>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            Heart
          </p>
        </div>
        <div className="flex flex-row items-center justify-between p-2 lg:flex-col">
          <h1 className="font-neuton hidden text-2xl font-bold tracking-wide lg:block dark:text-gray-50">
            Useful Links
          </h1>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            <NavLink to="/cart">Payment</NavLink>
          </p>
          <p className="font-lato mt-4 text-center text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            Terms of Service
          </p>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            <NavLink to="/account">Account</NavLink>
          </p>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            Returns
          </p>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            <NavLink to="/promotions">Discounts</NavLink>
          </p>
        </div>
        <div className="flex flex-col p-2">
          <h1 className="font-neuton hidden text-2xl font-bold tracking-wide lg:block dark:text-gray-50">
            Newsletter
          </h1>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            Get now 25% discount for all products on your first order
          </p>
          <div className="mt-4 flex border-b-2 border-b-gray-400 pb-2">
            <IoMdMail className="h-5 text-rose-600" />
            <input
              className="font-lato w-[150px] bg-blue-100 text-xs outline-none dark:bg-slate-800"
              type="text"
              placeholder="Your email address..."
            />
            <IoMdArrowForward className="h-5 text-blue-500" />
          </div>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            T: &nbsp; {STORE_PHONE_NUMBER}
          </p>
          <p className="font-lato mt-4 text-xs font-bold text-gray-400 sm:text-sm dark:text-gray-200">
            E: &nbsp; {STORE_WEBSITE}
          </p>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="font-lato my-6 flex h-[50px] flex-col items-center justify-evenly bg-white px-6 text-xs font-semibold text-gray-400 sm:gap-0 lg:flex-row lg:justify-between lg:gap-y-4 dark:bg-slate-700 dark:text-gray-50">
        <p className="mt-2 lg:mt-0">&copy;&nbsp;{currentYear} Jhuv Nutrition</p>
        <div className="my-0 flex w-full flex-col items-center justify-between gap-y-2 sm:w-[40%] sm:flex-row">
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Cookies/Ad Choices</p>
        </div>
        <div className="my-1 flex items-center justify-center gap-1">
          <PaymentMethodCard name="mastercard" />
          <PaymentMethodCard name="visa" />
          <PaymentMethodCard name="amex" />
          <PaymentMethodCard name="discover" />
          <PaymentMethodCard name="paypal" />
          <PaymentMethodCard name="afterpay" />
          <PaymentMethodCard name="klarna" />
          <PaymentMethodCard name="zip" />
        </div>
      </div>
    </div>
  );
};

export default Footer;

const PaymentMethodCard = ({ name }: { name: string }) => {
  return (
    <div className="h-[30px] max-w-[60px] rounded-lg p-1 dark:bg-gray-200">
      <img
        className="h-full object-contain"
        src={`${PAYMENT_METHODS_SRC}/${name}.png`}
        alt=""
      />
    </div>
  );
};

const FooterSocialBlock: React.FC = () => {
  return (
    <div className="flex flex-col p-2">
      <Logo />
      <p className="font-lato mt-6 text-sm font-bold text-gray-500 dark:text-gray-200">
        {STORE_ADDRESS}
      </p>
      <div className="mt-6 flex w-full justify-start gap-4 lg:justify-between lg:gap-2">
        <a
          href="https://facebook.com"
          target="_blank" // Opens link in new tab
          rel="noopener noreferrer" // Improves security, prevents new page from gaining access to original website
          className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-2 hover:bg-rose-600"
        >
          <IoLogoFacebook className="h-5 text-rose-600 group-hover:text-white" />
        </a>

        <a
          href="https://instagram.com"
          target="_blank" // Opens link in new tab
          rel="noopener noreferrer"
          className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-2 hover:bg-rose-600"
        >
          <IoLogoInstagram className="h-5 text-rose-600 group-hover:text-white" />
        </a>
        <a
          href="https://x.com"
          target="_blank" // Opens link in new tab
          rel="noopener noreferrer"
          className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-2 hover:bg-rose-600"
        >
          <FaXTwitter className="h-5 text-rose-600 group-hover:text-white" />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank" // Opens link in new tab
          rel="noopener noreferrer"
          className="group flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white p-2 hover:bg-rose-600"
        >
          <IoLogoTiktok className="h-5 text-rose-600 group-hover:text-white" />
        </a>
      </div>
    </div>
  );
};
