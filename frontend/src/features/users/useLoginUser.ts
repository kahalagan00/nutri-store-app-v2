import { LOCAL_BACKEND_API } from "../../utils/constants";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;

type LoginVariables = {
  email: string;
  password: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    // const res = await axios.post(
    //   `${LOCAL_BACKEND_API}/users/login`,
    //   { email, password },
    //   { withCredentials: true },
    // );

    const res = await fetch(`${LOCAL_BACKEND_API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    // console.log(res.headers);
    // const user: User = res.data.data;
    const user = await res.json();

    console.log(user);

    console.log(document.cookie);

    if (user) {
      const res2 = await fetch(`${LOCAL_BACKEND_API}/carts/createCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ totalPrice: 0, cartItems: [] }),
      });

      const cart = await res2.json();
      console.log(cart);
    }

    return user;
  } catch (err) {
    console.log(err.response.data.message);
    throw new Error("Failed to log in or create cart.");
  }
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginVariables) =>
      loginUser(email, password),
    onSuccess: (user: any) => {
      queryClient.setQueryData(["user"], user.user as User);
      navigate("/", { replace: true });
    },
    onError: (err: unknown) => {
      console.log("ERROR 💩", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
};
