import { BACKEND_URL } from "../utils/constants";

export const getProductsApi = async () => {
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
