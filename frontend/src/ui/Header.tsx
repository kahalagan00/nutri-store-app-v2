import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

function Header() {
  const [activeNavLink, setActiveNavLink] = useState("/home");

  const bottomNavLinks = [
    { route: "/home", label: "Home" },
    { route: "/products", label: "Products" },
    { route: "/about", label: "About" },
    { route: "/promotions", label: "Promotions" },
    { route: "/reviews", label: "Reviews" },
    { route: "/contact", label: "Contacts" },
  ];

  const handleClick = (route: string) => setActiveNavLink(route);

  return (
    <header className="bg-white w-full drop-shadow-lg mt-4">
      <div className="flex justify-between h-20 items-center p-8 pl-12 mb-4">
        <Logo />
        <div>Delivery</div>
        <div>Search Bar</div>
        <NavLink className="focus:border-b-4 border-blue-400" to="/cart">
          Cart
        </NavLink>
        <NavLink className="focus:border-b-4 border-blue-400" to="/login">
          Login
        </NavLink>
        <NavLink className="focus:border-b-4 border-blue-400" to="/signup">
          Sign Up
        </NavLink>
        {/* <div>PFP | User Name</div> */}
      </div>
      <div className="w-3/4 flex justify-evenly pb-4 pt-6">
        {bottomNavLinks.map((link) => (
          <NavLink
            onClick={() => handleClick(link.route)}
            to={link.route}
            key={link.route}
            className={`border-b-4 ${
              activeNavLink === link.route ? "border-blue-400" : "border-white"
            }`}
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </header>
  );
}

export default Header;
