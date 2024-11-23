import { LOCAL_BACKEND_API } from "../../utils/constants";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";

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

type LoginResponse = {
  user: User;
  cartNumber: number;
  cartTotal: number;
};

const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const res = await fetch(`${LOCAL_BACKEND_API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      throw new Error("User no exist");
    }

    const {
      data: { user },
    } = await res.json();

    console.log(user);

    let cartNumber, cartTotal;

    // Create the cart
    if (user) {
      const res2 = await fetch(`${LOCAL_BACKEND_API}/carts/createCart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ totalPrice: 0, cartItems: [] }),
      });

      const { data } = await res2.json();
      cartNumber = data[0].cartItems.length;
      cartTotal = data[0].totalPrice;
    }

    return {
      user,
      cartNumber,
      cartTotal,
    };

    // return userData;
  } catch (err) {
    console.log(err);
  }

  return {
    user: {},
    cartNumber: 0,
    cartTotal: 0,
  };
};

export const useLoginUser = () => {
  const { setCartNumber, setCartTotal } = useCart();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: LoginVariables) =>
      loginUser(email, password),
    onSuccess: ({
      user,
      cartNumber,
      cartTotal,
    }: {
      user: User;
      cartNumber: number;
      cartTotal: number;
    }) => {
      queryClient.setQueryData(["user"], user as User);
      setCartNumber(cartNumber);
      setCartTotal(cartTotal);
      navigate("/", { replace: true });
    },
    onError: (err: unknown) => {
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
};
