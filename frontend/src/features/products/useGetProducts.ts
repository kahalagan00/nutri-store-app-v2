import { LOCAL_BACKEND_API } from "../../utils/constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getProducts = async () => {
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
  const { data: products, error } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { error, products };
};
