import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signUpUserApi } from "../../services/apiUsers";
import { useCart } from "../../context/CartContext";

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

export const useSignUpUser = (setIsAuthenticated: (auth: boolean) => void) => {
  const { setCartNumber, setCartTotal } = useCart();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signup, isPending } = useMutation({
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
      signUpUserApi(
        name,
        email,
        password,
        passwordConfirm,
        dateOfBirth,
        symptoms,
        height,
        weight,
      ),
    onSuccess: ({ user, cartNumber, cartTotal }) => {
      setIsAuthenticated(true);
      queryClient.setQueryData(["user"], user);
      setCartNumber(cartNumber);
      setCartTotal(cartTotal);
      navigate("/", { replace: true });
      toast.success("Successfully signed up");
    },
    onError: (err: Error) => {
      setIsAuthenticated(false);
      // console.log("ERROR 💩", err);
      toast.error(err.message);
    },
  });

  return { signup, isPending };
};
