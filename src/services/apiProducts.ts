import { BACKEND_URL, REQUEST_TIMEOUT_MS } from "../utils/constants";

export const getProductsApi = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/products`, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const { data } = await res.json();

    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
