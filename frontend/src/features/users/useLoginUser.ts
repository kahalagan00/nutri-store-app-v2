import { LOCAL_BACKEND_API } from "../../utils/constants";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type LoginVariables = {
  email: string;
  password: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  passwordChangedAt: Date;
  role: string;
  slug: string;
  symptoms: string[];
};

const loginUser = async (email: string, password: string): Promise<User> => {
  try {
    const res = await fetch(`${LOCAL_BACKEND_API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const user = await res.json();

    console.log(user);

    // Create the cart
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

    return user.data.user;
  } catch (err) {
    throw new Error("Failed to log in or create cart.");
  }
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginVariables) =>
      loginUser(email, password),
    onSuccess: (user: User) => {
      queryClient.setQueryData(["user"], user as User);
      navigate("/", { replace: true });
    },
    onError: (err: unknown) => {
      console.log("ERROR 💩", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
};
