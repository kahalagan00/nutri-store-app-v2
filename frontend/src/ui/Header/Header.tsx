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
import { IconType } from "react-icons";
import { useEffect, useState } from "react";

const Header = ({
  isAuthenticated,
  setIsAuthenticated,
}: {
  isAuthenticated: boolean | null;
  setIsAuthenticated: (auth: boolean) => void;
}) => {
  const bottomNavLinks: { route: string; label: string; icon: IconType }[] = [
    { route: "/home", label: "Home", icon: HiOutlineHome },
    { route: "/products", label: "Products", icon: CiPillsBottle1 },
    { route: "/about", label: "About", icon: CiCircleQuestion },
    { route: "/promotions", label: "Promotions", icon: MdOutlineDiscount },
    { route: "/reviews", label: "Reviews", icon: IoMdPaper },
    { route: "/blogs", label: "Blogs", icon: RiBloggerLine },
    { route: "/contact", label: "Contact", icon: RiContactsBookLine },
  ];
  const { setCartNumber, setCartTotal } = useCart();
  const { logout, isPending: isLoggingOut } = useLogoutUser();
  const [isShowDropdown, setIsShowDropDown] = useState(false);
  // Matches Tailwind's `lg` breakpoint so only one copy of the header widgets is mounted
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  const { key: locationKey } = useLocation();

  // Close the mobile dropdown after any navigation (key changes even for same-path navigations)
  useEffect(() => {
    setIsShowDropDown(false);
  }, [locationKey]);

  const bottomHeaderIconStyle =
    "h-9 w-9 rounded-full p-2 transition active:translate-y-1";

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
    <header className="mx-auto w-full max-w-screen-xl bg-white px-8 sm:px-16 dark:bg-slate-800 dark:text-white">
      {/* Joshmar Debug: For DropDown Responsiveness */}
      <nav className="flex h-24 items-center justify-between gap-x-4">
        <NavLink to="/home" className="justify-self-end">
          <Logo />
        </NavLink>
        {isDesktop && (
          <>
            {/* Delivery is xl-only: at lg the row doesn't fit with even padding + gaps */}
            <div className="hidden xl:block">
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
          </>
        )}
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

      {isShowDropdown && !isDesktop && (
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
      <nav className="hidden w-full max-w-xl flex-wrap justify-between gap-x-4 gap-y-2 pb-4 pt-6 sm:flex">
        {bottomNavLinks.map((link) => (
          <NavLink
            to={link.route}
            key={link.route}
            className={({ isActive }) =>
              `font-lato border-b-2 text-sm font-bold tracking-wide ${
                isActive
                  ? "border-b-rose-500"
                  : "border-b-white hover:border-b-gray-500 dark:border-b-slate-800 dark:hover:border-b-white"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <nav className="flex w-full justify-between pb-4 pt-6 sm:hidden">
        {bottomNavLinks.map(({ route, icon: Icon }) => (
          <NavLink to={route} key={route}>
            {({ isActive }) => (
              <Icon
                className={`${bottomHeaderIconStyle} ${
                  isActive ? "bg-rose-500 text-white" : "hover:bg-slate-300"
                }`}
              />
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
