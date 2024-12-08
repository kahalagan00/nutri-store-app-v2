import { BACKEND_URL } from "../../utils/constants";
import { useQuery } from "@tanstack/react-query";

const getProducts = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/products`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
  }
  return [];
};

export const useGetProducts = () => {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { isLoading, error, products };
};
