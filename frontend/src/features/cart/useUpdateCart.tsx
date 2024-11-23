import toast from "react-hot-toast";
import { LOCAL_BACKEND_API } from "../../utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateVariables = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export const updateCart = async (
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

    if (!res.ok) {
      throw new Error("Adding to cart failed. Make sure you are logged in");
    }

    const { data } = await res.json();

    return data;
  } catch (err: any) {
    toast.error(err.message);
    console.error(err);
  }
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  const { mutate: update, isLoading } = useMutation({
    mutationFn: ({ productId, name, price, quantity }: UpdateVariables) =>
      updateCart(productId, name, price, quantity),
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart"], cart);
      toast.success("Successfully updated user cart");
    },
    onError: () => {
      toast.error("Error when updating user cart");
    },
  });

  return { update, isLoading };
};
