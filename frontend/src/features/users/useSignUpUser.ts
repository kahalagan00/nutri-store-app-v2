import { LOCAL_BACKEND_API } from "../../utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type SignUpVariables = {
  name: string;
  email: string;
  height: number;
  weight: number;
  dateOfBirth: Date;
  symptoms: string;
  password: string;
  passwordConfirm: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  passwordChangedAt: Date;
  role: string;
  slug: string;
  symptoms: string;
};

const signUpUser = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  dateOfBirth: Date,
  symptoms: string,
  height: number,
  weight: number,
): Promise<User> => {
  try {
    const res = await fetch(`${LOCAL_BACKEND_API}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
        password,
        passwordConfirm,
        dateOfBirth,
        symptoms,
        height,
        weight,
      }),
    });

    if (!res.ok) {
      throw new Error("Signup process failed");
    }

    const {
      data: { user: userData },
    } = await res.json();

    // Create the cart
    if (userData) {
      const res2 = await fetch(`${LOCAL_BACKEND_API}/carts/createCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Includes the JWT in the req.cookie
        body: JSON.stringify({ totalPrice: 0, cartItems: [] }),
      });

      if (!res2.ok) {
        throw new Error("Cart creation process failed");
      }

      const cart = await res2.json();
      console.log(cart);
      return userData;
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const useSignUpUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({
      name,
      email,
      password,
      passwordConfirm,
      dateOfBirth,
      symptoms,
      height,
      weight,
    }: SignUpVariables) =>
      signUpUser(
        name,
        email,
        password,
        passwordConfirm,
        dateOfBirth,
        symptoms,
        height,
        weight,
      ),
    onSuccess: (user: User) => {
      queryClient.setQueryData(["user"], user as User);
      navigate("/", { replace: true });
    },
    onError: (err: unknown) => {
      console.log("ERROR 💩", err);
      toast.error("Fill out all fields correctly to sign up");
    },
  });

  return { signup, isLoading };
};
