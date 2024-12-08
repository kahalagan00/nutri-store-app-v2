import toast from "react-hot-toast";
import { BACKEND_URL } from "../../utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateVariables = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  purpose: string;
  image: string;
};

export const updateCart = async (updateData: UpdateVariables) => {
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
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  const { mutate: update, isPending } = useMutation({
    mutationFn: ({
      productId,
      name,
      price,
      quantity,
      purpose,
      image,
    }: UpdateVariables) =>
      updateCart({ productId, name, price, quantity, purpose, image }),
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart"], cart);
      toast.success("Successfully updated user cart");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { update, isPending };
};
