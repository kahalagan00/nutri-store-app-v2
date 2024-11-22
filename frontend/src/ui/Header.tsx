import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Delivery from "./Delivery";
import SearchBar from "./SearchBar";
import CartMenu from "./CartMenu";

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
    <header className="bg-white w-full drop-shadow-lg pl-8">
      <div className="grid grid-cols-[160px_200px_300px_180px_100px_100px] overflow-hidden items-center h-24">
        <Logo />
        <Delivery />
        <SearchBar />
        <CartMenu />
        <NavLink
          className=" tracking-wide text-sm font-lato font-bold text-gray-600"
          to="/login"
        >
          Login
        </NavLink>
        <NavLink
          className=" tracking-wide text-sm font-lato font-bold text-gray-600"
          to="/signup"
        >
          Sign Up
        </NavLink>
        {/* <div>PFP | User Name</div> */}
      </div>
      <div className="flex justify-between w-2/4 pb-4 pt-6">
        {bottomNavLinks.map((link) => (
          <NavLink
            onClick={() => handleClick(link.route)}
            to={link.route}
            key={link.route}
            className={`border-b-4 font-lato font-bold text-sm tracking-wide ${
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
