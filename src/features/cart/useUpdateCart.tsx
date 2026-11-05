import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCartApi } from "../../services/apiCarts";

type UpdateVariables = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  purpose: string;
  image: string;
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  const { mutate: updateCart, isPending } = useMutation({
    mutationFn: ({
      productId,
      name,
      price,
      quantity,
      purpose,
      image,
    }: UpdateVariables) =>
      updateCartApi({ productId, name, price, quantity, purpose, image }),
    onSuccess: (cart) => {
      queryClient.setQueryData(["cart"], cart);
      toast.success("Successfully added item to cart");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { updateCart, isPending };
};
