import toast from "react-hot-toast";
import { BACKEND_URL, REQUEST_TIMEOUT_MS } from "../utils/constants";

type UpdateVariables = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  purpose: string;
  image: string;
};

export const updateCartApi = async (updateData: UpdateVariables) => {
  try {
    const { productId, name, price, quantity, purpose, image } = updateData;
    const res = await fetch(`${BACKEND_URL}/carts/updateCart`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        productId,
        name,
        price,
        quantity,
        purpose,
        image,
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!res.ok) {
      throw new Error("Adding to cart failed. Make sure you are logged in");
    }

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    // The raw timeout message means nothing to a shopper, and the add may
    // still have gone through on the server
    if ((err as Error).name === "TimeoutError") {
      throw new Error(
        "Adding to cart took too long. Check your cart before trying again",
      );
    }
    throw err;
  }
};

export const removeItemFromCartApi = async (productId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/carts/remove/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message ||
        "Something went wrong when trying to remove item from cart",
      );
    }

    return true;
  } catch (err) {
    console.error(err);
    toast.error("Removing item from cart failed");
    return false;
  }
};
