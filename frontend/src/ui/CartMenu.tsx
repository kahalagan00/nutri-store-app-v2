import { IoMdArrowDropdown, IoMdCart } from "react-icons/io";
import { NavLink } from "react-router-dom";

const CartMenu: React.FC = () => {
  return (
    <div className="w-[180px] flex justify-evenly items-center">
      <NavLink to="/cart">
        <IoMdCart className="h-7 w-7" />
        <div className="absolute h-5 w-5 text-xs font-bold rounded-full bg-rose-600 text-white flex items-center justify-center -translate-y-9 translate-x-5">
          5
        </div>
      </NavLink>
      <div>
        <p className="tracking-wide text-xs font-lato font-bold text-gray-600">
          My Cart
        </p>
        <p className="tracking-wide text-xs font-lato text-blue-600">$225.00</p>
      </div>
      <button>
        <IoMdArrowDropdown />
      </button>
    </div>
  );
};

export default CartMenu;
