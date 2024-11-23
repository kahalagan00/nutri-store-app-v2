import { LOCAL_BACKEND_API } from "../../utils/constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getProducts = async () => {
  axios.defaults.withCredentials = true;
  try {
    const res = await axios.get(`${LOCAL_BACKEND_API}/products`);
    const data: object[] = res.data.data;
    return data;
  } catch (err) {
    console.log(err);
  }
  return;
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
