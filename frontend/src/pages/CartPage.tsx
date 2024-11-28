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

type CartItem = {
  name: string;
  image: string;
  price: number;
  productId: string;
  purpose: string;
  quantity: number;
};

const CartPage = ({ isAuthenticated }: { isAuthenticated: boolean | null }) => {
  const { get, isPending: isLoadingCart } = useGetCart();
  const { cartNumber, cartTotal } = useCart();
  // const [orderQuantity, setOrderQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);

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

  // Generic Modal buttons
  const handleAccept = () => {
    // console.log("Accepted in Modal");
  };
  // const handleDecline = () => {
  //   console.log("Declined in Modal");
  // };

  // Use only for QuantityModifier
  // const handleAddOrderQuantity = () => {
  //   setOrderQuantity((orderQuantity) => orderQuantity + 1);
  // };
  // const handleRemoveOrderQuantity = () => {
  //   if (orderQuantity === 1) {
  //     return;
  //   }
  //   setOrderQuantity((orderQuantity) => orderQuantity - 1);
  // };

  useEffect(() => {
    // Only fetch cart data if there is a user currently logged in
    if (isAuthenticated) {
      get(undefined, {
        onSuccess: (cart) => {
          // console.log(cart);
          setCartItems(cart.cartItems);
        },
      });
    }
  }, []);

  // Grabs from local storage whenever the page reloads
  const savedCartItems = localStorage.getItem("cartItems");
  const parsedCartItems = savedCartItems ? JSON.parse(savedCartItems) : null;

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

          {isLoadingCart && <Spinner />}

          {/* If no results from getCarts API or localstorage. The user is not logged in or they don't have anything in the cart at all */}
          {cartItems[0]
            ? cartItems.map((item: CartItem) => (
                <CartProductRow key={item.name}>
                  <CartProductCard
                    image={item.image}
                    name={item.name}
                    purpose={item.purpose}
                  />
                  <p className="text-md justify-self-center font-bold">
                    {item.price}
                  </p>
                  <p className="text-md justify-self-center font-bold">
                    {item.quantity}
                  </p>
                  <p className="justify-self-center text-lg font-light text-blue-600">
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </CartProductRow>
              ))
            : parsedCartItems?.map((item: CartItem) => (
                <CartProductRow key={item.name}>
                  <CartProductCard
                    image={item.image}
                    name={item.name}
                    purpose={item.purpose}
                  />
                  <p className="text-md justify-self-center font-bold">
                    {item.price}
                  </p>
                  <p className="text-md justify-self-center font-bold">
                    {item.quantity}
                  </p>
                  <p className="justify-self-center text-lg font-light text-blue-600">
                    {(item.price * item.quantity).toFixed(2)}
                  </p>
                </CartProductRow>
              ))}
        </div>

        <div className="h-full w-full rounded-xl bg-slate-200 drop-shadow-xl">
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
            title="Payment Integration Still In Development..."
            content="We’re excited to let you know that payment integration is currently in development to make your shopping experience even smoother. In the meantime, we appreciate your patience and invite you to explore our products and stay tuned for updates!"
            onAccept={handleAccept}
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

  const onSubmit = (data: { country: string }) => {
    onUpdateShippingFee(data);
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

  const onSubmit = (data: { coupon: string }) => {
    // console.log(data);

    // Store discount is random between 5% - 20%
    const randomDiscount = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
    toast.success(
      `Applied "${data.coupon}" and received ${randomDiscount}% discount`,
    );
    onApplyCouponDiscount(randomDiscount);
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
    <div className="m-4 flex h-[280px] flex-col rounded-xl bg-blue-600 p-4 text-gray-100">
      <h1 className="font-neuton text-2xl font-bold">Cart Total</h1>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100">
        <p>Shipping Fee</p>
        <p className="font-bold">${shippingFee}</p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100">
        <p>Cart Subtotal</p>
        <p className="font-bold">${cartSubTotal}</p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100">
        <p>Discount</p>
        <p className="font-bold italic">-${finalDiscount}</p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100">
        <p>Total</p>
        <p className="text-lg font-bold">${total}</p>
      </div>

      <button
        type="button"
        className="font-lato mt-6 flex h-10 w-full items-center justify-center rounded-xl bg-slate-200 p-4 text-gray-800 hover:bg-slate-100"
        onClick={onCheckout}
      >
        Checkout
      </button>
    </div>
  );
};
