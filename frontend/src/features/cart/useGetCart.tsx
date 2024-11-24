import toast from "react-hot-toast";
import { LOCAL_BACKEND_API } from "../../utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const getCart = async () => {
  try {
    const res = await fetch(`${LOCAL_BACKEND_API}/carts/cart`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Retrieving cart failed. Make sure you are logged in");
    }

    const { data } = await res.json();

    return data;
  } catch (err: any) {
    console.error(err);
    throw err;
  }
};

export const useGetCart = () => {
  const queryClient = useQueryClient();

  const { mutate: get, isLoading } = useMutation({
    mutationFn: getCart,
    onSuccess: (cart) => {
      // queryClient.setQueryData(["cart"], cart);
    },
    onError: () => {
      toast.error("Error when fetching user cart");
    },
  });

  return { get, isLoading };
};
