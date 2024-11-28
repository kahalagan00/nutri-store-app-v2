import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Delivery from "./Delivery";
import SearchBar from "./SearchBar";
import CartMenu from "./CartMenu";
import LikedMenu from "./LikedMenu";
import { useLogoutUser } from "../features/users/useLogoutUser";
import { useCart } from "../context/CartContext";

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
    <header className="mx-auto w-full max-w-screen-xl bg-white pl-16">
      <div className="grid h-24 grid-cols-[160px_200px_300px_180px_50px_100px_100px] items-center overflow-hidden">
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
            Sign Up
          </NavLink>
        ) : (
          <NavLink
            className="font-lato justify-self-center border-b-2 border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800"
            to="/account"
          >
            Account
          </NavLink>
        )}
        {!isAuthenticated ? (
          <NavLink
            className="font-lato justify-self-center border-b-2 border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800"
            to="/login"
          >
            Login
          </NavLink>
        ) : (
          <button
            disabled={isLoggingOut}
            onClick={handleLogOut}
            className="font-lato justify-self-center border-b-2 border-b-white text-sm font-bold tracking-wide text-gray-600 hover:border-slate-800"
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
      <div className="flex w-2/4 justify-between pb-4 pt-6">
        {bottomNavLinks.map((link) => (
          <NavLink
            to={link.route}
            key={link.route}
            className={`font-lato border-b-2 border-b-white text-sm font-bold tracking-wide hover:border-b-gray-500`}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
