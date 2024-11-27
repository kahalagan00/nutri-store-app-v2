import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../../context/CartContext";
import { loginUserApi } from "../../services/apiUsers";

type LoginVariables = {
  email: string;
  password: string;
};

export const useLoginUser = () => {
  const { setCartNumber, setCartTotal } = useCart();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: LoginVariables) =>
      loginUserApi(email, password),
    onSuccess: ({ user, cartNumber, cartTotal }) => {
      queryClient.setQueryData(["user"], user);
      setCartNumber(cartNumber);
      setCartTotal(cartTotal);
      navigate("/", { replace: true });
      toast.success("Successfully logged in");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { login, isPending };
};
