import { useEffect, useState } from "react";
import { useGetCart } from "../features/cart/useGetCart";
import QuantityModifier from "../ui/QuantityModifier";
import { useCart } from "../context/CartContext";
import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";
import CartProductCard from "../ui/CartProductCard";
import CartProductRow from "../ui/CartProductRow";
import { useForm } from "react-hook-form";

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
    <div className={`${PAGE_BASE_BACKGROUND_STYLE} mb-12`}>
      <h1 className="font-neuton pb-2 pt-4 text-5xl tracking-wide">Cart</h1>
      <p className="font-neuton pb-6 text-lg">
        <span className="text-xl font-bold">{cartNumber} items</span> in your
        bag
      </p>

      <div className="grid w-full grid-cols-[800px_300px] justify-items-center gap-12">
        <div className="scrollbar-hidden flex w-full flex-col justify-start gap-y-1 overflow-scroll rounded-xl bg-slate-200 p-8 drop-shadow-xl">
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

        <div className="h-full w-full rounded-xl bg-slate-200 drop-shadow-xl">
          <CalculateShippingBox />
          <CouponCodeBox />
          <CartTotalBox />
        </div>
      </div>
    </div>
  );
};

export default CartPage;

const CalculateShippingBox: React.FC = () => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    watch,
    reset,
  } = useForm<Inputs>();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form
      className="m-6 flex h-[250px] flex-col border-b-2 border-b-slate-700"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-neuton text-2xl font-bold">Calculated Shipping</h1>
      <select
        id="country"
        {...register("country")}
        defaultValue="United States"
        className="font-lato mt-4 h-12 w-full rounded-xl p-2"
      >
        <optgroup label="North America">
          <option value="United States">United States</option>
          <option value="Canada">Canada</option>
          <option value="Mexico">Mexico</option>
        </optgroup>
        <optgroup label="Europe">
          <option value="France">France</option>
          <option value="Spain">Spain</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Germany">Germany</option>
          <option value="Portugal">Portugal</option>
        </optgroup>
      </select>

      <div className="font-lato mt-2 flex gap-2">
        <input
          className={`mt-4 h-10 w-1/2 rounded-xl p-4 ${errors.city && "bg-red-300"}`}
          type="text"
          placeholder="City"
          {...register("city", {
            required: "This field is required",
          })}
        />
        <input
          className={`mt-4 h-10 w-1/2 rounded-xl p-4 ${errors.zip && "bg-red-300"}`}
          type="text"
          maxLength={5}
          placeholder="ZIP Code"
          {...register("zip", {
            required: "This field is required",
          })}
        />
      </div>

      <button
        type="submit"
        className="font-lato mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-slate-800 p-4 text-gray-200 hover:bg-slate-700"
      >
        Update
      </button>
    </form>
  );
};

const CouponCodeBox: React.FC = () => {
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    watch,
    reset,
  } = useForm<Inputs>();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <form
      className="m-6 flex h-[250px] flex-col border-b-2 border-b-slate-700"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-neuton text-2xl font-bold">Coupon Code</h1>
      <p className="font-lato mt-4 text-xs tracking-wide text-gray-500">
        Don’t miss out on great savings for your health journey! Use promo code
        HEALTH10 at checkout to enjoy 10% off your next order.
      </p>

      <input
        className={`mt-4 h-10 w-full rounded-xl p-4 ${errors.coupon && "bg-red-300"} font-lato`}
        type="text"
        placeholder="XXXX"
        minLength={4}
        maxLength={4}
        {...register("coupon", {
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "Only alphanumeric characters are allowed",
          },
        })}
      />

      <button
        type="submit"
        className="font-lato mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-slate-800 p-4 text-gray-200 hover:bg-slate-700"
      >
        Apply
      </button>
    </form>
  );
};

const CartTotalBox: React.FC = () => {
  return (
    <div className="m-4 flex h-[280px] flex-col rounded-xl bg-blue-600 p-4 text-gray-100">
      <h1 className="font-neuton text-2xl font-bold">Cart Total</h1>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100">
        <p>Shipping Fee</p>
        <p className="font-bold">$4.37</p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100">
        <p>Cart Subtotal</p>
        <p className="font-bold">$545.44</p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100">
        <p>Discount (XXXX)</p>
        <p className="font-bold italic">-$4.00</p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100">
        <p>Total</p>
        <p className="text-lg font-bold">$545.81</p>
      </div>

      <button
        type="submit"
        className="font-lato mt-6 flex h-10 w-full items-center justify-center rounded-xl bg-slate-200 p-4 text-gray-800 hover:bg-slate-100"
      >
        Checkout
      </button>
    </div>
  );
};
