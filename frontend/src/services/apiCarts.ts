import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/constants";

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
    });

    if (!res.ok) {
      throw new Error("Adding to cart failed. Make sure you are logged in");
    }

    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const removeItemFromCartApi = async (productId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/carts/remove/${productId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message ||
          "Something went wrong when trying to remove item from cart",
      );
    }

    const data = await res.json();

    console.log(data);

    toast.success("Successfully removed item from cart");
  } catch (err) {
    console.error(err);
    toast.error("Removing item from cart failed");
  }
};
