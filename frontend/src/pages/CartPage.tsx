import { useEffect, useState } from "react";
import { useGetCart } from "../features/cart/useGetCart";
import QuantityModifier from "../ui/QuantityModifier";
import { useCart } from "../context/CartContext";
import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";
import CartProductCard from "../ui/CartProductCard";
import CartProductRow from "../ui/CartProductRow";

const CartPage = ({ isAuthenticated }: { isAuthenticated: boolean | null }) => {
  const { get, isLoading } = useGetCart();
  const { cartNumber, cartTotal } = useCart();
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const handleAddOrderQuantity = () => {
    setOrderQuantity((orderQuantity) => orderQuantity + 1);
  };
  const handleRemoveOrderQuantity = () => {
    if (orderQuantity === 1) {
      return;
    }
    setOrderQuantity((orderQuantity) => orderQuantity - 1);
  };

  useEffect(() => {
    // Only fetch cart data if there is a user currently logged in
    if (isAuthenticated) {
      get(undefined, {
        onSuccess: (cart) => {
          console.log(cart);
          setCartItems(cart.cartItems);
        },
      });
    }
  }, []);

  return (
    <div className={PAGE_BASE_BACKGROUND_STYLE}>
      <h1 className="font-neuton pb-2 pt-4 text-5xl tracking-wide">Cart</h1>
      <p className="font-neuton pb-6 text-lg">
        <span className="text-xl font-bold">{cartNumber} items</span> in your
        bag
      </p>
      <div className="grid grid-cols-[800px_300px] justify-items-center gap-8">
        <div className="overflow- scrollbar-hidden flex w-full flex-col justify-between gap-y-1 overflow-y-scroll rounded-xl bg-white p-8 drop-shadow-xl">
          <div className="mb-4 grid grid-cols-[400px_100px_100px_100px] gap-x-4">
            <p className="text-lg font-bold">Product</p>
            <p className="text-md justify-self-center font-bold">Price</p>
            <p className="text-md justify-self-center font-bold">Quantity</p>
            <p className="text-md justify-self-center font-bold">Total Price</p>
          </div>

          {cartItems.map((item) => (
            <CartProductRow key={item.name}>
              <CartProductCard
                image={item.image}
                name={item.name}
                purpose={item.purpose}
              />
              <p className="text-md justify-self-center font-bold">
                {item.price}
              </p>
              <QuantityModifier
                number={orderQuantity}
                onClickDecrement={handleRemoveOrderQuantity}
                onClickIncrement={handleAddOrderQuantity}
              />
              <p className="justify-self-center text-lg font-light text-blue-600">
                {(item.price * item.quantity).toFixed(2)}
              </p>
            </CartProductRow>
          ))}
        </div>
        <div className="h-full w-full rounded-xl bg-white drop-shadow-md"></div>
      </div>
    </div>
  );
};

export default CartPage;
