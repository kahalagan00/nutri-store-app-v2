import { useQuery } from "@tanstack/react-query";
import { getProductsApi } from "../../services/apiProducts";

export const useGetProducts = () => {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  return { isLoading, error, products };
};
