import { useEffect, useState } from "react";
import { useGetCart } from "../features/cart/useGetCart";
import { useCart } from "../context/CartContext";
import {
  FORM_ERROR_STYLE,
  PAGE_BASE_BACKGROUND_STYLE,
} from "../utils/constants";
import CartProductCard from "../ui/CartProductCard";
import CartProductRow from "../ui/CartProductRow";
import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import toast from "react-hot-toast";
import Spinner from "../ui/Spinner";
import { removeItemFromCartApi } from "../services/apiCarts";
import { cartPaymentApi } from "../services/apiPayment";
import { Link } from "react-router-dom";

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
  const {
    get,
    isPending: isLoadingCart,
    isError: isCartError,
  } = useGetCart();
  const { cartNumber, cartTotal, setCartNumber, setCartTotal } = useCart();
  // const [orderQuantity, setOrderQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkout, setCheckout] = useState(false);
  const [shippingFee, setShippingFee] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState<string>();
  const [shippingCountry, setShippingCountry] = useState("");
  const [isPaying, setIsPaying] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const updateCartMenu = (totalAmount: number, totalPrice: number) => {
    setCartNumber(totalAmount);
    setCartTotal(totalPrice);
  };

  // A user without a cart, or a cart without a total, is treated as empty
  const handleCartLoaded = (
    cart: { cartItems?: CartItem[]; totalPrice?: number | null } | null,
  ) => {
    const items = cart?.cartItems ?? [];
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
    updateCartMenu(items.length, cart?.totalPrice ?? 0);
  };

  const loadCart = () => get(undefined, { onSuccess: handleCartLoaded });

  const handleApplyCouponDiscount = (value: number, code: string) => {
    // console.log(value);
    setCouponDiscount(value);
    setCouponCode(code);
  };

  const handleUpdateShippingFee = (data: { country: string }) => {
    setShippingCountry(data.country);
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
    if (cartItems.length === 0 && !parsedCartItems?.length) {
      toast.error("Your cart is empty 🛒 ❌");
      return;
    }
    setIsPaying(true);
    try {
      await cartPaymentApi(
        cartItems,
        parsedCartItems,
        shippingCountry,
        couponCode,
      );
    } catch {
      toast.error("Payment could not be started. Please try again");
    } finally {
      setIsPaying(false);
    }
  };

  const handleRemoveFromCart = async (value: string) => {
    // console.log(`Remove from cart clicked for ${value}`);
    setRemovingId(value);
    const isRemoved = await removeItemFromCartApi(value);

    // A failed remove already showed its own error, so don't refetch on top of it
    if (!isRemoved) {
      setRemovingId(null);
      return;
    }

    get(undefined, {
      onSuccess: handleCartLoaded,
      onSettled: () => setRemovingId(null),
    });
  };

  useEffect(() => {
    // Only fetch cart data if there is a user currently logged in
    if (isAuthenticated) {
      loadCart();
    } else {
      // Drop the fetched rows when the user logs out while on this page
      setCartItems([]);
    }
  }, [isAuthenticated]);

  // Grabs from local storage whenever the page reloads
  // A corrupted or non-list value is treated as an empty cart
  let parsedCartItems: CartItem[] = [];
  try {
    const saved = JSON.parse(localStorage.getItem("cartItems") ?? "[]");
    if (Array.isArray(saved)) parsedCartItems = saved;
  } catch {
    // keep the empty cart
  }

  // console.log(cartItems);
  // console.log(parsedCartItems);

  // Fetched rows win; the saved rows cover page reloads and failed fetches
  const items = cartItems.length > 0 ? cartItems : parsedCartItems;
  const isLoading = isAuthenticated === null || isLoadingCart;
  const isCartEmpty = isAuthenticated === false || items.length === 0;

  return (
    <div className={`${PAGE_BASE_BACKGROUND_STYLE} mb-12`}>
      <h1 className="font-neuton pb-2 pt-4 text-5xl tracking-wide dark:text-gray-50">
        Cart
      </h1>
      <p className="font-neuton pb-6 text-lg dark:text-gray-200">
        <span className="text-xl font-bold">
          {cartNumber} {cartNumber === 1 ? "item" : "items"}
        </span>{" "}
        in your bag
      </p>

      <div className="flex w-full grid-cols-[800px_300px] flex-col justify-items-center gap-12 min-[1200px]:grid">
        <div className="scrollbar-hidden flex w-full flex-col justify-start gap-y-1 overflow-scroll rounded-xl bg-slate-200 p-8 drop-shadow-xl dark:bg-slate-800">
          <div className="mb-4 grid gap-x-4 sm:grid-cols-[minmax(0,200px)_100px_100px_100px] lg:grid-cols-[minmax(0,400px)_100px_100px_100px] dark:text-gray-100">
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

          {/* The cart belongs to the account, so a logged-out visitor is sent to log in */}
          {isAuthenticated === false ? (
            <p className="font-lato py-8 text-center dark:text-gray-100">
              <Link
                to="/login"
                className="font-bold text-blue-600 underline dark:text-cyan-400"
              >
                Log in
              </Link>{" "}
              to view your cart
            </p>
          ) : (
            <>
              {/* Saved rows stay visible while the cart loads, so only spin when there is nothing to show */}
              {isLoading && items.length === 0 && <Spinner />}

              {isCartError && (
                <div
                  role="alert"
                  className="font-lato mb-4 flex items-center justify-between gap-4 rounded-lg bg-red-100 p-4 text-sm text-red-700"
                >
                  <p>Your latest cart could not be loaded.</p>
                  <button
                    type="button"
                    className="font-bold underline"
                    onClick={loadCart}
                  >
                    Try again
                  </button>
                </div>
              )}

              {!isLoading && !isCartError && items.length === 0 && (
                <p className="font-lato py-8 text-center dark:text-gray-100">
                  Your cart is empty.{" "}
                  <Link
                    to="/products"
                    className="font-bold text-blue-600 underline dark:text-cyan-400"
                  >
                    Browse products
                  </Link>
                </p>
              )}

              {items.map((item) => (
                <CartProductRow key={item.productId}>
                  <CartProductCard
                    image={item.image}
                    name={item.name}
                    purpose={item.purpose}
                    productId={item.productId}
                    handleRemoveFromCart={() => setItemToRemove(item)}
                    isRemoving={removingId === item.productId}
                  />
                  <p className="font-lato justify-self-center text-sm md:text-lg dark:text-gray-50">
                    <span className="inline-block sm:hidden">
                      Price =&nbsp;
                    </span>
                    ${item.price.toFixed(2)}
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
              ))}
            </>
          )}
        </div>

        <div className="h-full w-full rounded-xl bg-slate-200 drop-shadow-xl dark:bg-slate-800">
          <CalculateShippingBox onUpdateShippingFee={handleUpdateShippingFee} />
          <CouponCodeBox onApplyCouponDiscount={handleApplyCouponDiscount} />
          <CartTotalBox
            onCheckout={handleCheckout}
            isPaying={isPaying}
            isCartEmpty={isCartEmpty}
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

      {itemToRemove && (
        <Modal
          title="Remove item"
          content={`Remove ${itemToRemove.name} from your cart?`}
          acceptLabel="Remove"
          onAccept={() => handleRemoveFromCart(itemToRemove.productId)}
          checkout={true}
          onCheckout={() => setItemToRemove(null)}
        />
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
  } = useForm<{ country: string; city: string; zip: string }>();

  const onSubmit = (data: { country: string }) => {
    onUpdateShippingFee(data);
    toast.success("Shipping updated");
  };

  return (
    <form
      className="m-6 flex min-h-[250px] flex-col border-b-2 border-b-slate-700 pb-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-neuton text-2xl font-bold dark:text-gray-50">
        Calculated Shipping
      </h1>
      <label
        htmlFor="country"
        className="font-lato mb-1 mt-4 block text-sm dark:text-gray-200"
      >
        Country
      </label>
      <select
        id="country"
        {...register("country")}
        defaultValue="United States"
        autoComplete="country-name"
        className="font-lato h-12 w-full rounded-xl p-2"
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
        <div className="w-1/2">
          <label
            htmlFor="city"
            className="mb-1 mt-2 block text-sm dark:text-gray-200"
          >
            City <span className="font-bold text-red-500">*</span>
          </label>
          <input
            id="city"
            className={`h-10 w-full rounded-xl p-4 ${errors.city && "bg-red-300"}`}
            type="text"
            placeholder="City"
            autoComplete="address-level2"
            aria-invalid={errors.city ? "true" : "false"}
            aria-describedby={errors.city ? "city-error" : undefined}
            {...register("city", {
              required: "This field is required",
            })}
          />
          {errors.city && (
            <p id="city-error" className={`${FORM_ERROR_STYLE} mt-1 text-xs`}>
              {errors.city.message}
            </p>
          )}
        </div>
        <div className="w-1/2">
          <label
            htmlFor="zip"
            className="mb-1 mt-2 block text-sm dark:text-gray-200"
          >
            ZIP Code <span className="font-bold text-red-500">*</span>
          </label>
          <input
            id="zip"
            className={`h-10 w-full rounded-xl p-4 ${errors.zip && "bg-red-300"}`}
            type="text"
            maxLength={10}
            placeholder="ZIP Code"
            autoComplete="postal-code"
            aria-invalid={errors.zip ? "true" : "false"}
            aria-describedby={errors.zip ? "zip-error" : undefined}
            {...register("zip", {
              required: "This field is required",
            })}
          />
          {errors.zip && (
            <p id="zip-error" className={`${FORM_ERROR_STYLE} mt-1 text-xs`}>
              {errors.zip.message}
            </p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="font-lato mt-4 flex h-10 w-full items-center justify-center rounded-xl bg-slate-800 p-4 text-gray-200 hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-800 hover:dark:bg-slate-300"
      >
        Update
      </button>
    </form>
  );
};

const CouponCodeBox = ({
  onApplyCouponDiscount,
}: {
  onApplyCouponDiscount: (value: number, code: string) => void;
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

    // HEALTH10 (10% off) is the only valid coupon
    const code = data.coupon.toUpperCase();
    if (code !== "HEALTH10") {
      toast.error("Invalid coupon code");
      return;
    }
    toast.success(`Applied "${code}" and received 10% discount`);
    onApplyCouponDiscount(10, code);
    setIsDiscountApplied(true);
    reset();
  };

  return (
    <form
      className="m-6 flex min-h-[250px] flex-col border-b-2 border-b-slate-700 pb-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-neuton text-2xl font-bold dark:text-gray-50">
        Coupon Code
      </h1>
      <p className="font-lato mt-4 text-xs tracking-wide text-gray-500 dark:text-gray-100">
        Don’t miss out on great savings for your health journey! Use promo code
        HEALTH10 at checkout to enjoy 10% off your next order.
      </p>

      <label
        htmlFor="coupon"
        className="font-lato mb-1 mt-4 block text-sm dark:text-gray-200"
      >
        Coupon code
      </label>
      <input
        id="coupon"
        disabled={isDiscountApplied}
        className={`h-10 w-full rounded-xl p-4 ${errors.coupon && "bg-red-300"} font-lato`}
        type="text"
        placeholder="Coupon code"
        aria-invalid={errors.coupon ? "true" : "false"}
        aria-describedby={errors.coupon ? "coupon-error" : undefined}
        {...register("coupon", {
          required: "This field is required",
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "Only alphanumeric characters are allowed",
          },
        })}
      />
      {errors.coupon && (
        <p id="coupon-error" className={`${FORM_ERROR_STYLE} mt-1 text-xs`}>
          {errors.coupon.message}
        </p>
      )}

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
  isPaying,
  isCartEmpty,
  couponDiscount,
  cartSubTotal,
}: {
  shippingFee: number;
  onCheckout: () => void;
  isPaying: boolean;
  isCartEmpty: boolean;
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
        <p className="font-bold">
          {shippingFee === 0 ? "Enter address" : `$${shippingFee.toFixed(2)}`}
        </p>
      </div>
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100 dark:text-slate-800">
        <p>Cart Subtotal</p>
        <p className="font-bold">${cartSubTotal.toFixed(2)}</p>
      </div>
      {couponDiscount > 0 && (
        <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100 dark:text-slate-800">
          <p>Discount</p>
          <p className="font-bold italic">-${finalDiscount.toFixed(2)}</p>
        </div>
      )}
      <div className="font-lato mt-4 flex justify-between text-sm tracking-wide text-gray-100 dark:text-slate-800">
        <p>Total</p>
        <p className="text-lg font-bold">${total.toFixed(2)}</p>
      </div>

      <button
        type="button"
        disabled={isPaying || isCartEmpty}
        className={`font-lato mt-6 flex h-10 w-full items-center justify-center rounded-xl bg-slate-200 p-4 text-gray-800 hover:bg-slate-100 dark:bg-slate-800 dark:text-gray-50 hover:dark:bg-slate-700 ${isPaying || isCartEmpty ? "opacity-40" : ""}`}
        onClick={onCheckout}
      >
        {isPaying ? "Redirecting..." : "Checkout"}
      </button>
    </div>
  );
};
