import { useState } from "react";
import { IoMdCart, IoMdHeart } from "react-icons/io";
import { useUpdateCart } from "../features/cart/useUpdateCart";
import { ADD_TO_CART_DELAY } from "../utils/constants";
import { useCart } from "../context/CartContext";
import QuantityModifier from "./QuantityModifier";
import toast from "react-hot-toast";

interface ProductCard {
  _id: string;
  name: string;
  image: string;
  price: number;
  purpose: string;
  ingredients: string[];
  warnings: string[];
  stockQuantity: number;
  availability: boolean;
}

const ProductCard: React.FC<ProductCard> = ({
  _id,
  name,
  image,
  price,
  purpose,
  // ingredients,
  // warnings,
  stockQuantity,
  // availability,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [bagAmount, setBagAmount] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { setCartNumber, setCartTotal } = useCart();
  const { updateCart } = useUpdateCart();

  const handleAddBagAmount = () => {
    // Prevent user from increasing items to add in the bag if it's already equals to the stockQuantity
    if (bagAmount === stockQuantity) {
      toast(`👝 There is only ${stockQuantity} in stock left for ${name}`);
      return;
    }
    setBagAmount((bagAmount) => bagAmount + 1);
  };
  const handleRemoveBagAmount = () => {
    if (bagAmount === 1) {
      return;
    }
    setBagAmount((bagAmount) => bagAmount - 1);
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);

    updateCart(
      { productId: _id, name, price, quantity: bagAmount, image, purpose },
      {
        onSuccess: (cart) => {
          setCartNumber(cart.cartItems.length);
          setCartTotal(cart.totalPrice);
          localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
          setBagAmount(1);
        },
      },
    );

    // Disable cart functionality for current product for some time before enabling it again
    setTimeout(() => {
      setIsAddingToCart(false);
    }, ADD_TO_CART_DELAY);
  };

  return (
    <div className="flex h-[25rem] w-72 flex-col justify-start overflow-hidden rounded-xl border border-gray-300 bg-slate-100 drop-shadow-xl dark:border-gray-500 dark:bg-slate-500">
      <div className="flex items-center justify-between pr-4 pt-4" id="pointer">
        <div className="flex w-16 -translate-x-1 -skew-x-12 items-center justify-center bg-rose-500 px-4 py-1">
          <p className="text-bold text-sm text-white">-25%</p>
        </div>
        <IoMdHeart
          onClick={() => setIsLiked((value) => !value)}
          className={`h-7 w-7 cursor-pointer ${isLiked && "text-red-600"}`}
        />
      </div>
      <div className="flex h-3/5 items-center justify-center overflow-hidden">
        <img className="max-h-full" src={`/images/products/${image}`} alt="" />
      </div>
      <div className="pl-4">
        <p className="font-lato text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-100">
          {purpose}
        </p>
        <p className="font-neuton text-2xl font-semibold dark:text-gray-50">
          {name}
        </p>
        <p className="font-neuton py-2 text-2xl font-normal text-blue-500 dark:text-cyan-400">
          ${price}
        </p>
      </div>
      <div className="flex items-center justify-between px-4 py-4">
        {stockQuantity > 0 ? (
          <QuantityModifier
            number={bagAmount}
            onClickDecrement={handleRemoveBagAmount}
            onClickIncrement={handleAddBagAmount}
          />
        ) : (
          <p className="font-bold text-red-500">No stock</p>
        )}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart || stockQuantity <= 0}
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 p-2.5 hover:bg-blue-500 dark:bg-cyan-400 dark:hover:bg-cyan-300 ${isAddingToCart || stockQuantity <= 0 ? "opacity-50" : ""}`}
        >
          <IoMdCart className="h-full w-full text-white dark:text-slate-900" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
