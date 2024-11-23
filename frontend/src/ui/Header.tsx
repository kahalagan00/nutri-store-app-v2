import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Delivery from "./Delivery";
import SearchBar from "./SearchBar";
import CartMenu from "./CartMenu";
import LikedMenu from "./LikedMenu";

const Header: React.FC = () => {
  const bottomNavLinks = [
    { route: "/home", label: "Home" },
    { route: "/products", label: "Products" },
    { route: "/about", label: "About" },
    { route: "/promotions", label: "Promotions" },
    { route: "/reviews", label: "Reviews" },
    { route: "/contact", label: "Contacts" },
  ];

  const location = useLocation();
  if (location.pathname === "/") {
    location.pathname = "/home";
  }

  const [activeNavLink, setActiveNavLink] = useState(location.pathname);

  const handleClick = (route: string) => setActiveNavLink(route);

  return (
    <header className="w-full bg-white pl-8 drop-shadow-md xl:drop-shadow-none">
      <div className="grid h-24 grid-cols-[160px_200px_300px_180px_50px_100px_100px] items-center overflow-hidden">
        <Logo />
        <Delivery />
        <SearchBar />
        <CartMenu />
        <LikedMenu />
        <NavLink
          className="font-lato justify-self-center text-sm font-bold tracking-wide text-gray-600 hover:border-b-2"
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          className="font-lato text-sm font-bold tracking-wide text-gray-600 hover:bg-slate-400"
          to="/signup"
        >
          Sign Up
        </NavLink>
        {/* <div>PFP | User Name</div> */}
      </div>
      <div className="flex w-2/4 justify-between pb-4 pt-6">
        {bottomNavLinks.map((link) => (
          <NavLink
            onClick={() => handleClick(link.route)}
            to={link.route}
            key={link.route}
            className={`font-lato border-b-4 text-sm font-bold tracking-wide ${
              activeNavLink === link.route ? "border-blue-400" : "border-white"
            }`}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
};

export default Header;
