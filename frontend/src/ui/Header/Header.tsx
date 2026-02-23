import { NavLink, useLocation } from "react-router-dom";
import Logo from "../Logo";
import Delivery from "../Delivery";
import SearchBar from "../SearchBar";
import CartMenu from "../CartMenu";
import LikedMenu from "../LikedMenu";
import { useLogoutUser } from "../../features/users/useLogoutUser";
import { useCart } from "../../context/CartContext";
import { CiCircleQuestion, CiPillsBottle1 } from "react-icons/ci";
import { MdOutlineDiscount } from "react-icons/md";
import { IoMdPaper } from "react-icons/io";
import { RiContactsBookLine } from "react-icons/ri";
import { HiOutlineHome, HiPencil, HiUserCircle } from "react-icons/hi2";
import { RiBloggerLine } from "react-icons/ri";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const Header = ({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (auth: boolean) => void;
}) => {
  const bottomNavLinks = [
    { route: "/home", label: "Home" },
    { route: "/products", label: "Products" },
    { route: "/about", label: "About" },
    { route: "/promotions", label: "Promotions" },
    { route: "/reviews", label: "Reviews" },
    { route: "/blogs", label: "Blogs" },
    { route: "/contact", label: "Contact" },
  ];
  const location = useLocation();
  if (location.pathname === "/") {
    location.pathname = "/home";
  }

  const { setCartNumber, setCartTotal } = useCart();
  const { logout, isPending: isLoggingOut } = useLogoutUser();
  const [isShowDropdown, setIsShowDropDown] = useState(false);

  const bottomHeaderIconStyle =
    "h-10 w-10 rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1";

  const handleLogOut = () => {
    logout(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false);
        setCartNumber(0);
        setCartTotal(0);
        localStorage.setItem("cartItems", JSON.stringify([]));
      },
      onError: () => setIsAuthenticated(true),
    });
  };

  return (
    <header className="mx-auto w-full max-w-screen-xl bg-white px-8 sm:pl-16 dark:bg-slate-800 dark:text-white">
      {/* Joshmar Debug: For DropDown Responsiveness */}
      <nav className="flex h-24 items-center justify-between">
        <NavLink to="/home" className="justify-self-end">
          <Logo />
        </NavLink>
        <div className="hidden lg:block">
          <Delivery />
        </div>
        <div className="hidden lg:block">
          <SearchBar />
        </div>
        <div className="hidden lg:block">
          <CartMenu />
        </div>
        <div className="hidden lg:block">
          <LikedMenu />
        </div>
        {!isAuthenticated ? (
          <div className="hidden lg:block">
            <NavLink
              className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2 dark:border-b-slate-800 dark:text-white dark:hover:border-b-white"
              to="/signup"
            >
              <span className="hidden text-center lg:inline-block">
                Sign Up
              </span>
              <span className="lg:hidden">
                <HiPencil className="h-10 w-10 rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1" />
              </span>
            </NavLink>
          </div>
        ) : (
          <div className="hidden lg:block">
            <NavLink
              className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2 dark:border-b-slate-800 dark:text-white dark:hover:border-b-white"
              to="/account"
            >
              <span className="hidden lg:inline-block">Account</span>
              <span className="lg:hidden">
                <HiUserCircle className="h-10 w-10 rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1" />
              </span>
            </NavLink>
          </div>
        )}
        {!isAuthenticated ? (
          <div className="hidden lg:block">
            <NavLink
              className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2 dark:border-b-slate-800 dark:text-white dark:hover:border-b-white"
              to="/login"
            >
              <span className="hidden lg:inline-block">Login</span>
              <span className="lg:hidden">
                <IoLogInOutline className="h-10 w-10 rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1" />
              </span>
            </NavLink>
          </div>
        ) : (
          <div className="hidden lg:block">
            <button
              disabled={isLoggingOut}
              onClick={handleLogOut}
              className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2 dark:border-b-slate-800 dark:text-white dark:hover:border-b-white"
            >
              <span className="hidden lg:inline-block">Logout</span>
              <span className="lg:hidden">
                <IoLogOutOutline className="h-10 w-10 rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1" />
              </span>
            </button>
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsShowDropDown((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500 px-2 text-white lg:hidden"
        >
          {isShowDropdown ? <RxCross1 /> : <RxHamburgerMenu />}
        </button>
      </nav>

      {isShowDropdown && (
        <div className="mt-4 flex w-full flex-col items-center justify-between gap-y-4 rounded-xl bg-slate-300 py-4 drop-shadow-md lg:hidden dark:bg-slate-700">
          <Delivery />
          <SearchBar />
          <CartMenu />
          <LikedMenu />
          {!isAuthenticated ? (
            <NavLink
              className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2 dark:text-gray-100"
              to="/signup"
            >
              Sign Up
            </NavLink>
          ) : (
            <NavLink
              className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2 dark:text-gray-100"
              to="/account"
            >
              <span>Account</span>
            </NavLink>
          )}
          {!isAuthenticated ? (
            <NavLink
              className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2 dark:text-gray-100"
              to="/login"
            >
              Login
            </NavLink>
          ) : (
            <button
              disabled={isLoggingOut}
              onClick={handleLogOut}
              className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2 dark:text-gray-100"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Joshmar Debug: For Icon Responsiveness */}
      {/* <nav className="grid h-24 grid-cols-[160px_1fr_1fr_1fr_1fr_1fr_1fr] items-center justify-items-center gap-x-4 overflow-hidden lg:gap-2 lg:[grid-template-columns:160px_max-content_max-content_max-content_max-content_max-content_max-content]">
        <NavLink to="/home" className="justify-self-start">
          <Logo />
        </NavLink>
        <Delivery />
        <SearchBar />
        <CartMenu />
        <LikedMenu />
        {!isAuthenticated ? (
          <NavLink
            className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2"
            to="/signup"
          >
            <span className="hidden text-center lg:inline-block">Sign Up</span>
            <span className="lg:hidden">
              <HiPencil className="h-10 w-10 rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1" />
            </span>
          </NavLink>
        ) : (
          <NavLink
            className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2"
            to="/account"
          >
            <span className="hidden lg:inline-block">Account</span>
            <span className="lg:hidden">
              <HiUserCircle className="h-10 w-10 rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1" />
            </span>
          </NavLink>
        )}
        {!isAuthenticated ? (
          <NavLink
            className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2"
            to="/login"
          >
            <span className="hidden lg:inline-block">Login</span>
            <span className="lg:hidden">
              <IoLogInOutline className="h-10 w-10 rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1" />
            </span>
          </NavLink>
        ) : (
          <button
            disabled={isLoggingOut}
            onClick={handleLogOut}
            className="font-lato justify-self-center border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800 lg:border-b-2"
          >
            <span className="hidden lg:inline-block">Logout</span>
            <span className="lg:hidden">
              <IoLogOutOutline className="h-10 w-10 rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1" />
            </span>
          </button>
        )}
      </nav> */}
      <nav className="hidden w-3/4 justify-between pb-4 pt-6 sm:flex lg:w-2/4">
        {bottomNavLinks.map((link) => (
          <NavLink
            to={link.route}
            key={link.route}
            className={`font-lato border-b-2 border-b-white text-sm font-bold tracking-wide hover:border-b-gray-500 dark:border-b-slate-800 dark:hover:border-b-white`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <nav className="flex w-full justify-between px-4 pb-4 pt-6 sm:hidden">
        <NavLink to="/">
          <HiOutlineHome className={bottomHeaderIconStyle} />
        </NavLink>
        <NavLink to="/products">
          <CiPillsBottle1 className={bottomHeaderIconStyle} />
        </NavLink>
        <NavLink to="/about">
          <CiCircleQuestion className={bottomHeaderIconStyle} />
        </NavLink>
        <NavLink to="/promotions">
          <MdOutlineDiscount className={bottomHeaderIconStyle} />
        </NavLink>
        <NavLink to="/reviews">
          <IoMdPaper className={bottomHeaderIconStyle} />
        </NavLink>
        <NavLink to="/blogs">
          <RiBloggerLine className={bottomHeaderIconStyle} />
        </NavLink>
        <NavLink to="/contact">
          <RiContactsBookLine className={bottomHeaderIconStyle} />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
