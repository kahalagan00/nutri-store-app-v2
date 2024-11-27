import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoTwitter,
  IoMdArrowForward,
  IoMdMail,
} from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoTiktok } from "react-icons/io5";
import { PAYMENT_METHODS_SRC, STORE_ADDRESS } from "../utils/constants";
import Logo from "./Logo";
import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="mx-auto w-full pb-16 text-3xl">
      {/* Top Footer */}
      <div className="grid h-[400px] w-full grid-cols-4 justify-items-center rounded-2xl bg-blue-100 p-16 text-black">
        <FooterSocialBlock />
        <div className="flex flex-col p-2">
          <h1 className="font-neuton text-2xl font-bold tracking-wide">
            Categories
          </h1>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Muscle Growth
          </p>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Joint Health
          </p>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Sleep Improvement
          </p>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Increase Energy
          </p>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Heart Health
          </p>
        </div>
        <div className="flex flex-col p-2">
          <h1 className="font-neuton text-2xl font-bold tracking-wide">
            Useful Links
          </h1>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Payment & Tax
          </p>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Terms of Service
          </p>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            My Account
          </p>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Return Policy
          </p>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Discounts
          </p>
        </div>
        <div className="flex flex-col p-2">
          <h1 className="font-neuton text-2xl font-bold tracking-wide">
            Newsletter
          </h1>
          <p className="font-lato mt-4 text-sm font-bold text-gray-400">
            Get now 25% discount for all products on your first order
          </p>
          <div className="mt-4 flex border-b-2 border-b-gray-400 pb-2">
            <IoMdMail className="h-5 text-rose-600" />
            <input
              className="font-lato w-[150px] bg-blue-100 text-xs outline-none"
              type="text"
              placeholder="Your email address..."
            />
            <IoMdArrowForward className="h-5 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="font-lato flex h-[50px] items-center justify-between bg-white text-xs font-semibold text-gray-400">
        <p>&copy;&nbsp;{currentYear} Jhuv Nutrition</p>
        <div className="flex w-[40%] justify-evenly">
          <p>Privacy Policy</p>
          <p>Terms & Conditions</p>
          <p>Cookies/Ad Choices</p>
        </div>
        <div className="flex items-center justify-center gap-1">
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
    <div className="h-[30px] max-w-[60px]">
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
      <p className="font-lato mt-6 text-sm font-bold text-gray-500">
        {STORE_ADDRESS}
      </p>
      <div className="mt-6 flex w-full justify-between">
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
