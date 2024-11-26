import { IoMdArrowDropdown, IoMdCart } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartMenu: React.FC = () => {
  const { cartNumber, cartTotal } = useCart();

  return (
    <div className="flex w-[180px] items-center justify-evenly">
      <NavLink
        to="/cart"
        className="relative rounded-full p-2 hover:bg-slate-300"
      >
        <IoMdCart className="h-7 w-7" />
        <div className="absolute flex h-5 w-5 -translate-y-9 translate-x-5 items-center justify-center rounded-full bg-rose-600 text-xs font-bold text-white">
          {cartNumber}
        </div>
      </NavLink>
      <div>
        <p className="font-lato text-xs font-bold tracking-wide text-gray-600">
          My Cart
        </p>
        <p className="font-lato text-xs tracking-wide text-blue-600">
          ${cartTotal.toFixed(2)}
        </p>
      </div>
      <button>
        <IoMdArrowDropdown />
      </button>
    </div>
  );
};

export default CartMenu;
