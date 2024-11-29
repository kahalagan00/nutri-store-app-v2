import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Delivery from "./Delivery";
import SearchBar from "./SearchBar";
import CartMenu from "./CartMenu";
import LikedMenu from "./LikedMenu";
import { useLogoutUser } from "../features/users/useLogoutUser";
import { useCart } from "../context/CartContext";
import { CiCircleQuestion, CiPillsBottle1 } from "react-icons/ci";
import { MdOutlineDiscount } from "react-icons/md";
import { IoMdPaper } from "react-icons/io";
import { RiContactsBookLine } from "react-icons/ri";
import { HiOutlineHome, HiPencil, HiUserCircle } from "react-icons/hi2";
import { RiBloggerLine } from "react-icons/ri";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";

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
    <header className="mx-auto w-full max-w-screen-xl bg-white px-8 sm:pl-16">
      <nav className="grid h-24 grid-cols-[160px_1fr_1fr_1fr_1fr_1fr_1fr] items-center justify-items-center gap-x-4 overflow-hidden md:justify-items-start lg:grid-cols-[160px_200px_1fr_1fr_1fr_1fr_1fr] lg:gap-0">
        <NavLink to="/home">
          <Logo />
        </NavLink>
        <Delivery />
        <SearchBar />
        <CartMenu />
        <LikedMenu />
        {!isAuthenticated ? (
          <NavLink
            className="font-lato justify-self-center border-b-2 border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800"
            to="/signup"
          >
            <span className="hidden lg:inline-block">Sign Up</span>
            <span className="lg:hidden">
              <HiPencil className="h-7 w-7" />
            </span>
          </NavLink>
        ) : (
          <NavLink
            className="font-lato justify-self-center border-b-2 border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800"
            to="/account"
          >
            <span className="hidden lg:inline-block">Account</span>
            <span className="lg:hidden">
              <HiUserCircle className="h-7 w-7" />
            </span>
          </NavLink>
        )}
        {!isAuthenticated ? (
          <NavLink
            className="font-lato justify-self-center border-b-2 border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800"
            to="/login"
          >
            <span className="hidden lg:inline-block">Login</span>
            <span className="lg:hidden">
              <IoLogInOutline className="h-7 w-7" />
            </span>
          </NavLink>
        ) : (
          <button
            disabled={isLoggingOut}
            onClick={handleLogOut}
            className="font-lato justify-self-center border-b-2 border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800"
          >
            {/* {isLoggingOut ? "Logging out..." : "Logout"} */}
            <span className="hidden lg:inline-block">Logout</span>
            <span className="lg:hidden">
              <IoLogOutOutline className="h-7 w-7" />
            </span>
          </button>
        )}
      </nav>
      <nav className="hidden w-3/4 justify-between pb-4 pt-6 sm:flex lg:w-2/4">
        {bottomNavLinks.map((link) => (
          <NavLink
            to={link.route}
            key={link.route}
            className={`font-lato border-b-2 border-b-white text-sm font-bold tracking-wide hover:border-b-gray-500`}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <nav className="flex w-full justify-between px-4 pb-4 pt-6 sm:hidden">
        <NavLink to="/">
          <HiOutlineHome className="h-7 w-7" />
        </NavLink>
        <NavLink to="/products">
          <CiPillsBottle1 className="h-7 w-7" />
        </NavLink>
        <NavLink to="/about">
          <CiCircleQuestion className="h-7 w-7" />
        </NavLink>
        <NavLink to="/promotions">
          <MdOutlineDiscount className="h-7 w-7" />
        </NavLink>
        <NavLink to="/reviews">
          <IoMdPaper className="h-7 w-7" />
        </NavLink>
        <NavLink to="/blogs">
          <RiBloggerLine className="h-7 w-7" />
        </NavLink>
        <NavLink to="/contact">
          <RiContactsBookLine className="h-7 w-7" />
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
