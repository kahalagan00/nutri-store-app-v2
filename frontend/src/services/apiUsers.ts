import toast from "react-hot-toast";
import { LOCAL_BACKEND_API } from "../utils/constants";

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

export const loginUserApi = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const res = await fetch(`${LOCAL_BACKEND_API}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong when trying to log in",
    );
  }

  const {
    data: { user },
  } = await res.json();

  // console.log(user);
  let cartNumber = 0;
  let cartTotal = 0;

  // Create the cart
  if (user) {
    const res2 = await fetch(`${LOCAL_BACKEND_API}/carts/createCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ totalPrice: 0, cartItems: [] }),
    });

    if (!res2.ok) {
      const errorData = await res2.json();
      throw new Error(
        errorData.message ||
          "Something went wrong when trying to create or load user cart",
      );
    }

    const { data } = await res2.json();

    // If the user already had a cart then "data" will be an array
    // if not then it's an object
    if (Array.isArray(data)) {
      cartTotal = data[0].totalPrice;
      cartNumber = data[0].cartItems?.length;
    }
  }

  return {
    user,
    cartNumber,
    cartTotal,
  };
};

export const signUpUserApi = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string,
  dateOfBirth: Date,
  symptoms: string,
  height: number,
  weight: number,
): Promise<LoginResponse> => {
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
    const errorData = await res.json();
    throw new Error(
      errorData.message || "Something went wrong when trying to log in",
    );
  }

  const {
    data: { user },
  } = await res.json();

  let cartNumber = 0;
  let cartTotal = 0;

  // Create the cart
  if (user) {
    const res2 = await fetch(`${LOCAL_BACKEND_API}/carts/createCart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ totalPrice: 0, cartItems: [] }),
    });

    if (!res2.ok) {
      const errorData = await res2.json();
      throw new Error(
        errorData.message ||
          "Something went wrong when trying to create or load user cart",
      );
    }

    const { data } = await res2.json();

    // If the user already had a cart then "data" will be an array
    // if not then it's an object
    if (Array.isArray(data)) {
      cartTotal = data[0].totalPrice;
      cartNumber = data[0].cartItems?.length;
    }
  }

  return {
    user,
    cartTotal,
    cartNumber,
  };
};

export const forgotPasswordApi = async (email: string) => {
  try {
    const res = await fetch(`${LOCAL_BACKEND_API}/users/forgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message ||
          "Something went wrong when trying to send token to user",
      );
    }

    toast.success("Token successfully sent");
  } catch (err) {
    console.error(err);
  }
};

export const resetPasswordUserApi = async (
  password: string,
  passwordConfirm: string,
  token: string,
): Promise<User> => {
  try {
    const res = await fetch(
      `${LOCAL_BACKEND_API}/users/resetPassword/${token}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password, passwordConfirm }),
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message ||
          "Something went wrong when trying to reset user password",
      );
    }

    const { data } = await res.json();

    return data.user;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
