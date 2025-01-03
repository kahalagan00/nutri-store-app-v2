import { useEffect, useState } from "react";
import { useGetCart } from "../features/cart/useGetCart";
import { useCart } from "../context/CartContext";
import { PAGE_BASE_BACKGROUND_STYLE } from "../utils/constants";
import CartProductCard from "../ui/CartProductCard";
import CartProductRow from "../ui/CartProductRow";
import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import { removeItemFromCartApi } from "../services/apiCarts";
import { cartPaymentApi } from "../services/apiPayment";

type CartItem = {
  name: string;
  image: string;
  price: number;
  productId: string;
  purpose: string;
  quantity: number;
};

// Functions as a checkout page where the user can check a summary of their orders and can proceed to pay
const CartPage = ({ isAuthenticated }: { isAuthenticated: boolean | null }) => {
  const { get, isPending: isLoadingCart } = useGetCart();
  const { cartNumber, cartTotal, setCartNumber, setCartTotal } = useCart();
  // const [orderQuantity, setOrderQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const updateCartMenu = (totalAmount: number, totalPrice: number) => {
    setCartNumber(totalAmount);
    setCartTotal(totalPrice);
  };

  const handleApplyCouponDiscount = (value: number) => {
    // console.log(value);
    setCouponDiscount(value);
  };

  const handleUpdateShippingFee = (data: { country: string }) => {
    if (data.country === "United States") {
      setShippingFee(5);
    } else {
      setShippingFee(20);
    }
  };

  const handleCheckout = () => {
    if (shippingFee === 0) {
      toast.error("Please enter address to calculate shipping");
      return;
    }
    // console.log(`${!checkout ? "Opened Cart Modal" : "Closed Cart Modal"}`);
    setCheckout(!checkout);
  };

  const handlePayment = async () => {
    if (cartItems.length === 0 && cartNumber === 0) {
      toast.error("Your cart is empty 🛒 ❌");
      return;
    }
    await cartPaymentApi(cartItems, parsedCartItems);
  };

  const handleRemoveFromCart = async (value: string) => {
    // console.log(`Remove from cart clicked for ${value}`);
    await removeItemFromCartApi(value);

    get(undefined, {
      onSuccess: (cart) => {
        // console.log(cart);
        setCartItems(cart.cartItems);
        localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
        updateCartMenu(cart.cartItems.length, cart.totalPrice);
      },
    });
  };

  useEffect(() => {
    // Only fetch cart data if there is a user currently logged in
    if (isAuthenticated) {
      get(undefined, {
        onSuccess: (cart) => {
          // console.log(cart);
          setCartItems(cart.cartItems);
          localStorage.setItem("cartItems", JSON.stringify(cart.cartItems));
          updateCartMenu(cart.cartItems.length, cart.totalPrice);
        },
      });
    }
  }, []);

  // Grabs from local storage whenever the page reloads
  const savedCartItems = localStorage.getItem("cartItems");
  const parsedCartItems = savedCartItems ? JSON.parse(savedCartItems) : null;

  // console.log(cartItems);
  // console.log(parsedCartItems);

  return (
    <div className={`${PAGE_BASE_BACKGROUND_STYLE} mb-12`}>
      <h1 className="font-neuton pb-2 pt-4 text-5xl tracking-wide dark:text-gray-50">
        Cart
      </h1>
      <p className="font-neuton pb-6 text-lg dark:text-gray-200">
        <span className="text-xl font-bold">{cartNumber} items</span> in your
        bag
      </p>

      <div className="flex w-full grid-cols-[800px_300px] flex-col justify-items-center gap-12 min-[1200px]:grid">
        <div className="scrollbar-hidden flex w-full flex-col justify-start gap-y-1 overflow-scroll rounded-xl bg-slate-200 p-8 drop-shadow-xl dark:bg-slate-800">
          <div className="mb-4 grid gap-x-4 sm:grid-cols-[200px_100px_100px_100px] lg:grid-cols-[400px_100px_100px_100px] dark:text-gray-100">
            <p className="mx-auto hidden text-lg font-bold sm:ml-14 sm:block lg:ml-0">
              Product
            </p>
            <p className="text-md hidden justify-self-center font-bold sm:block">
              Price
            </p>
            <p className="text-md hidden justify-self-center font-bold sm:block">
              Quantity
            </p>
            <p className="text-md hidden justify-self-center font-bold sm:block">
              Total Price
            </p>
          </div>

          {isLoadingCart && <Spinner />}

          {/* If no results from getCarts API or localstorage. The user is not logged in or they don't have anything in the cart at all */}
          {cartItems[0]
            ? cartItems.map((item: CartItem) => (
                <CartProductRow key={item.name}>
                  <CartProductCard
                    image={item.image}
                    name={item.name}
                    purpose={item.purpose}
                    productId={item.productId}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                  <p className="font-lato justify-self-center text-sm md:text-lg dark:text-gray-50">
                    <span className="inline-block sm:hidden">
                      Price =&nbsp;
                    </span>
                    ${item.price}
                  </p>
                  <p className="font-lato justify-self-center text-sm md:text-lg dark:text-gray-50">
                    <span className="inline-block sm:hidden">
                      Quantity =&nbsp;
                    </span>
                    {item.quantity}
                  </p>
                  <p className="font-lato justify-self-center text-sm font-bold text-blue-600 md:text-lg dark:text-cyan-400">
                    <span className="inline-block sm:hidden">
                      Total =&nbsp;
                    </span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </CartProductRow>
              ))
            : parsedCartItems?.map((item: CartItem) => (
                <CartProductRow key={item.name}>
                  <CartProductCard
                    image={item.image}
                    name={item.name}
                    purpose={item.purpose}
                    productId={item.productId}
                    handleRemoveFromCart={handleRemoveFromCart}
                  />
                  <p className="font-lato justify-self-center text-xs font-bold md:text-sm dark:text-gray-50">
                    <span className="inline-block sm:hidden">
                      Price =&nbsp;
                    </span>
                    ${item.price}
                  </p>
                  <p className="font-lato justify-self-center text-xs font-bold md:text-sm dark:text-gray-50">
                    <span className="inline-block sm:hidden">
                      Quantity =&nbsp;
                    </span>
                    {item.quantity}
                  </p>
                  <p className="font-lato justify-self-center text-sm text-blue-600 md:text-lg dark:text-cyan-400">
                    <span className="inline-block sm:hidden">
                      Total =&nbsp;
                    </span>
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </CartProductRow>
              ))}
        </div>

        <div className="h-full w-full rounded-xl bg-slate-200 drop-shadow-xl dark:bg-slate-800">
          <CalculateShippingBox onUpdateShippingFee={handleUpdateShippingFee} />
          <CouponCodeBox onApplyCouponDiscount={handleApplyCouponDiscount} />
          <CartTotalBox
            onCheckout={handleCheckout}
            shippingFee={shippingFee}
            couponDiscount={couponDiscount}
            cartSubTotal={parseFloat(cartTotal.toFixed(2))}
          />
        </div>
      </div>

      {checkout && (
        <div className="p-4">
          <Modal
            // title="Payment Integration Still In Development..."
            // content="We’re excited to let you know that payment integration is currently in development to make your shopping experience even smoother. In the meantime, we appreciate your patience and invite you to explore our products and stay tuned for updates!"
            title="Payment"
            content="You'll now be redirected to a secure external payment page to complete your transaction."
            onAccept={handlePayment}
            // onDecline={handleDecline}
            checkout={checkout}
            onCheckout={handleCheckout}
          />
        </div>
      )}
    </div>
  );
};

export default CartPage;

const CalculateShippingBox = ({
  onUpdateShippingFee,
}: {
  onUpdateShippingFee: (data: { country: string }) => void;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<{ country: string; city: string; zip: string }>();
  const [isShippingApplied, setIsShippingApplied] = useState(false);

  const onSubmit = (data: { country: string }) => {
    onUpdateShippingFee(data);
    setIsShippingApplied(true);
    reset();
  };

  return (
    <form
      className="m-6 flex h-[250px] flex-col border-b-2 border-b-slate-700"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-neuton text-2xl font-bold dark:text-gray-50">
        Calculated Shipping
      </h1>
      <select
        id="country"
        {...register("country")}
        defaultValue="United States"
        className="font-lato mt-4 h-12 w-full rounded-xl p-2"
        disabled={isShippingApplied}
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
          disabled={isShippingApplied}
          className={`mt-4 h-10 w-1/2 rounded-xl p-4 ${errors.city && "bg-red-300"}`}
          type="text"
          placeholder="City"
          {...register("city", {
            required: "This field is required",
          })}
        />
        <input
          disabled={isShippingApplied}
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
        disabled={isShippingApplied}
        type="submit"
        className={`font-lato mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-slate-800 p-4 text-gray-200 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 hover:dark:bg-slate-300 ${!isShippingApplied ? "hover:bg-slate-700" : "opacity-40"}`}
      >
        Update
      </button>
    </form>
  );
};

const CouponCodeBox = ({
  onApplyCouponDiscount,
}: {
  onApplyCouponDiscount: (value: number) => void;
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<{ coupon: string }>();

  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const onSubmit = (data: { coupon: string }) => {
    // console.log(data);

    // Store discount is random between 5% - 20%
    const randomDiscount = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    toast.success(
      `Applied "${data.coupon}" and received ${randomDiscount}% discount`,
    );
    onApplyCouponDiscount(randomDiscount);
    setIsDiscountApplied(true);
    reset();
  };

  return (
    <form
      className="m-6 flex h-[250px] flex-col border-b-2 border-b-slate-700"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-neuton text-2xl font-bold dark:text-gray-50">
        Coupon Code
      </h1>
      <p className="font-lato mt-4 text-xs tracking-wide text-gray-500 dark:text-gray-100">
        Don’t miss out on great savings for your health journey! Use promo code
        HEALTH10 at checkout to enjoy 10% off your next order.
      </p>

      <input
        disabled={isDiscountApplied}
        className={`mt-4 h-10 w-full rounded-xl p-4 ${errors.coupon && "bg-red-300"} font-lato`}
        type="text"
        placeholder="XXXX"
        minLength={4}
        maxLength={4}
        {...register("coupon", {
          required: "This field is required",
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "Only alphanumeric characters are allowed",
          },
          validate: (value) =>
            value.length === 4 || "Input must be exactly 4 characters long",
        })}
      />

      <button
        disabled={isDiscountApplied}
        type="submit"
        className={`font-lato mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-slate-800 p-4 text-gray-200 dark:bg-slate-200 dark:text-slate-800 hover:dark:bg-slate-300 ${!isDiscountApplied ? "hover:bg-slate-700" : "opacity-40"}`}
      >
        Apply
      </button>
    </form>
  );
};

const CartTotalBox = ({
  shippingFee,
  onCheckout,
  couponDiscount,
  cartSubTotal,
}: {
  shippingFee: number;
  onCheckout: () => void;
  couponDiscount: number;
  cartSubTotal: number;
}) => {
  const finalDiscount = parseFloat(
    (cartSubTotal * (couponDiscount / 100)).toFixed(2),
  );
  const total = parseFloat(
    (shippingFee + cartSubTotal - finalDiscount).toFixed(2),
  );

  return (
    <div className="m-4 flex h-[280px] flex-col rounded-xl bg-blue-600 p-4 text-gray-100 dark:bg-cyan-400 dark:text-slate-800">
      <h1 className="font-neuton text-2xl font-bold">Cart Total</h1>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100 dark:text-slate-800">
        <p>Shipping Fee</p>
        <p className="font-bold">${shippingFee}</p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100 dark:text-slate-800">
        <p>Cart Subtotal</p>
        <p className="font-bold">${cartSubTotal}</p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100 dark:text-slate-800">
        <p>Discount</p>
        <p className="font-bold italic">-${finalDiscount}</p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100 dark:text-slate-800">
        <p>Total</p>
        <p className="text-lg font-bold">${total}</p>
      </div>

      <button
        type="button"
        className="font-lato mt-6 flex h-10 w-full items-center justify-center rounded-xl bg-slate-200 p-4 text-gray-800 hover:bg-slate-100 dark:bg-slate-800 dark:text-gray-50 hover:dark:bg-slate-700"
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};
