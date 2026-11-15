import { useState } from "react";
import { IoMdCart, IoMdHeart } from "react-icons/io";
import { useUpdateCart } from "../features/cart/useUpdateCart";
import { ADD_TO_CART_DELAY, ASSETS_R2_URL } from "../utils/constants";
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

const LIKED_PRODUCTS_KEY = "likedProducts";

// A corrupted or non-list value in browser storage is treated as empty
const readStoredList = (key: string) => {
  try {
    const saved = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

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
  const [isLiked, setIsLiked] = useState(() =>
    readStoredList(LIKED_PRODUCTS_KEY).includes(_id),
  );
  const [isImageBroken, setIsImageBroken] = useState(false);
  const [bagAmount, setBagAmount] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { setCartNumber, setCartTotal } = useCart();
  const { updateCart } = useUpdateCart();

  // Read on every render: a cart change re-renders this card through CartContext
  const quantityInCart =
    Number(
      readStoredList("cartItems").find((item) => item?.productId === _id)
        ?.quantity,
    ) || 0;
  const remainingStock = Math.max(stockQuantity - quantityInCart, 0);

  const handleToggleLike = () => {
    const likedProducts = readStoredList(LIKED_PRODUCTS_KEY).filter(
      (id) => id !== _id,
    );
    if (!isLiked) likedProducts.push(_id);
    localStorage.setItem(LIKED_PRODUCTS_KEY, JSON.stringify(likedProducts));
    setIsLiked(!isLiked);
  };

  const handleAddBagAmount = () => {
    // Prevent user from increasing items to add in the bag past what is left after the cart's share of the stock
    if (bagAmount >= remainingStock) {
      toast(
        quantityInCart > 0
          ? `👝 There is only ${stockQuantity} in stock for ${name} and ${quantityInCart} already in your cart`
          : `👝 There is only ${stockQuantity} in stock left for ${name}`,
      );
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
    <div className="flex min-h-[25rem] w-72 flex-col justify-start overflow-hidden rounded-xl border border-gray-300 bg-slate-100 drop-shadow-xl dark:border-gray-500 dark:bg-slate-500">
      <div className="flex items-center justify-end pr-2 pt-2" id="pointer">
        <button
          type="button"
          aria-label={`Like ${name}`}
          aria-pressed={isLiked}
          onClick={handleToggleLike}
          className="flex h-11 w-11 items-center justify-center"
        >
          <IoMdHeart className={`h-7 w-7 ${isLiked && "text-red-600"}`} />
        </button>
      </div>
      <div className="flex h-44 shrink-0 items-center justify-center overflow-hidden">
        {isImageBroken ? (
          <span className="font-lato text-xs text-gray-400 dark:text-gray-100">
            No image
          </span>
        ) : (
          <img
            className="max-h-full"
            src={`${ASSETS_R2_URL}/products/${image}`}
            alt={`Image of ${name}`}
            onError={() => setIsImageBroken(true)}
          />
        )}
      </div>
      <div className="px-4">
        <p className="font-lato text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-100">
          {purpose}
        </p>
        <p className="font-neuton break-words text-2xl font-semibold dark:text-gray-50">
          {name}
        </p>
        <p className="font-neuton py-2 text-2xl font-normal text-blue-500 dark:text-cyan-400">
          ${price.toFixed(2)}
        </p>
      </div>
      <div className="mt-auto flex items-center justify-between px-4 py-4">
        {remainingStock > 0 ? (
          <QuantityModifier
            number={bagAmount}
            onClickDecrement={handleRemoveBagAmount}
            onClickIncrement={handleAddBagAmount}
            productName={name}
          />
        ) : (
          <p className="font-bold text-red-500">
            {stockQuantity > 0 ? "All stock in cart" : "No stock"}
          </p>
        )}
        <button
          type="button"
          aria-label={`Add ${name} to cart`}
          onClick={handleAddToCart}
          disabled={isAddingToCart || remainingStock <= 0}
          className={`flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 p-2.5 hover:bg-blue-500 dark:bg-cyan-400 dark:hover:bg-cyan-300 ${isAddingToCart || remainingStock <= 0 ? "opacity-50" : ""}`}
        >
          <IoMdCart className="h-full w-full text-white dark:text-slate-900" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
