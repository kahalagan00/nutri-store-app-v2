import { loadStripe } from "@stripe/stripe-js";
import { BACKEND_URL, STRIPE_PUBLISHABLE_KEY } from "../utils/constants";

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
        items: cartItems ? cartItems : parsedCartItems,
      }),
    });

    const { sessionId } = await res.json();
    const stripe = await stripePromise;

    if (stripe && sessionId) {
      await stripe.redirectToCheckout({ sessionId }); // Use sessionId here
    } else {
      console.error("Stripe or sessionId is missing");
    }
  } catch (err) {
    console.error(err);
  }
};
