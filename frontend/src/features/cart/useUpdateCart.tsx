import { LOCAL_BACKEND_API } from "../../utils/constants";

export const useUpdateCart = async (
  productId: string,
  name: string,
  price: number,
  quantity: number,
) => {
  try {
    const res = await fetch(`${LOCAL_BACKEND_API}/carts/updateCart`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ productId, name, price, quantity }),
    });

    console.log(res);

    const { data } = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
