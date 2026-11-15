import { loadStripe } from "@stripe/stripe-js";
import {
  BACKEND_URL,
  REQUEST_TIMEOUT_MS,
  STRIPE_PUBLISHABLE_KEY,
} from "../utils/constants";

type CartItem = {
  name: string;
  image: string;
  price: number;
  productId: string;
  purpose: string;
  quantity: number;
};

export const cartPaymentApi = async (
  cartItems: CartItem[],
  parsedCartItems: CartItem[],
  country: string,
  couponCode?: string,
) => {
  const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  try {
    // console.log("Accepted in Modal");
    // console.log("Implement page redirect to Stripe here");
    const res = await fetch(`${BACKEND_URL}/payment/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        items: cartItems.length > 0 ? cartItems : parsedCartItems,
        country,
        couponCode,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!res.ok) {
      throw new Error("Creating checkout session failed");
    }

    const { sessionId } = await res.json();
    const stripe = await stripePromise;

    if (!stripe || !sessionId) {
      throw new Error("Stripe or sessionId is missing");
    }

    const { error } = await stripe.redirectToCheckout({ sessionId }); // Use sessionId here
    if (error) {
      throw new Error(error.message);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};
