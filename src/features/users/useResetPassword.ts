import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { resetPasswordUserApi } from "../../services/apiUsers";

type ResetPasswordVariables = {
  password: string;
  passwordConfirm: string;
  token: string;
};

export const useResetPassword = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending } = useMutation({
    mutationFn: ({
      password,
      passwordConfirm,
      token,
    }: ResetPasswordVariables) =>
      resetPasswordUserApi(password, passwordConfirm, token),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/login", { replace: true });
      toast.success("Successfully changed user's password");
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { resetPassword, isPending };
};
