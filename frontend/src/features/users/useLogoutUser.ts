import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LOCAL_BACKEND_API } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const logoutUser = async () => {
  try {
    const res = await fetch(`${LOCAL_BACKEND_API}/users/logout`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error("Error occurred when logging out user");
    }

    return true;
  } catch (err: unknown) {
    console.error(err);
    return false;
  }
};

export const useLogoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/", { replace: true });
      toast.success("Successfully logged out user");
    },
    onError: () => {
      toast.error("Error when logging out user");
    },
  });

  return { logout, isPending };
};
