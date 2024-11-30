import { IoMdArrowDropdown, IoMdCart } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const CartMenu: React.FC = () => {
  const { cartNumber, cartTotal } = useCart();

  const handleClick = () => {
    toast("Cart dropdown is under development", {
      icon: "🛠️ 🛒",
    });
  };

  return (
    <div className="flex items-center justify-evenly lg:w-[180px]">
      <NavLink
        to="/cart"
        className="relative rounded-full p-2 transition hover:bg-slate-300 active:translate-y-1"
      >
        <IoMdCart className="h-7 w-7" />
        <div className="absolute flex h-5 w-5 -translate-y-9 translate-x-5 items-center justify-center rounded-full bg-rose-600 text-xs font-bold text-white">
          {cartNumber}
        </div>
      </NavLink>
      <div className="hidden lg:block">
        <p className="font-lato text-xs font-bold tracking-wide text-gray-600">
          My Cart
        </p>
        <p className="font-lato text-xs tracking-wide text-blue-600">
          ${cartTotal.toFixed(2)}
        </p>
      </div>
      <button onClick={handleClick} className="hidden lg:block">
        <IoMdArrowDropdown />
      </button>
    </div>
  );
};

export default CartMenu;
