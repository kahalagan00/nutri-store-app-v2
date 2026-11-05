import { NavLink } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginUser } from "../features/users/useLoginUser";
import {
  FORM_BASE_INPUT_STYLE,
  FORM_ERROR_STYLE,
  LOG_IN_BOX_STYLE,
  LOG_IN_SCREEN_BACKGROUND_STYLE,
} from "../utils/constants";

interface LoginVariables {
  email: string;
  password: string;
}

// Enables the user to log in
const LoginPage = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (auth: boolean) => void;
}) => {
  const { login, isPending: isLoggingIn } = useLoginUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginVariables>();

  const onSubmit: SubmitHandler<LoginVariables> = (data) => {
    if (!data.email || !data.password) {
      return;
    }

    login(data, {
      onSuccess: () => {
        setIsAuthenticated(true);
        reset();
      },
      onError: () => setIsAuthenticated(false),
    });
  };

  return (
    <main className={LOG_IN_SCREEN_BACKGROUND_STYLE}>
      <div className={LOG_IN_BOX_STYLE}>
        <img
          className="max-h-16 max-w-16 self-center"
          src="/images/company-logo-2.svg"
          alt="Company logo"
        />
        <h1 className="font-lato self-center text-center text-5xl tracking-wide dark:text-gray-50">
          Welcome Back
        </h1>
        <p className="font-lato mt-4 self-center text-sm tracking-wide text-gray-600 dark:text-gray-200">
          Glad to see you again 👋
        </p>
        <p className="font-lato self-center text-sm tracking-wide text-gray-600 dark:text-gray-200">
          Login to your account below
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="font-lato mb-1 mt-8 dark:text-gray-200">
            Email <span className="font-bold text-red-500">*</span> &nbsp;
            {errors.email && (
              <span className={FORM_ERROR_STYLE}>{errors.email.message}</span>
            )}
          </p>
          <input
            disabled={isLoggingIn}
            className={FORM_BASE_INPUT_STYLE}
            type="email"
            placeholder="Enter email"
            id="email"
            {...register("email", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />

          <p className="font-lato mb-1 mt-6 dark:text-gray-200">
            Password <span className="font-bold text-red-500">*</span> &nbsp;
            {errors.password && (
              <span className={FORM_ERROR_STYLE}>
                {errors.password.message}
              </span>
            )}
          </p>
          <input
            disabled={isLoggingIn}
            className={FORM_BASE_INPUT_STYLE}
            type="password"
            placeholder="Enter password"
            id="password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              },
            })}
          />

          <button
            type="submit"
            className="mt-6 h-12 w-full rounded-lg bg-blue-800 text-white hover:bg-blue-700 dark:bg-cyan-400 dark:text-slate-900 hover:dark:bg-cyan-300"
          >
            Login
          </button>
        </form>
        <div className="mt-5 flex justify-center">
          <p className="font-lato self-center text-sm tracking-wide text-gray-600 dark:text-gray-200">
            Don't have an account? &nbsp;
          </p>
          <NavLink
            className="font-lato text-md self-center tracking-wide text-blue-800 hover:text-blue-600 dark:text-cyan-400 dark:hover:text-cyan-300"
            to="/signup"
          >
            Sign up for Free
          </NavLink>
        </div>
        <div className="flex justify-center">
          <NavLink
            to="/forgotPassword"
            className="font-lato self-center border-b-2 border-b-transparent text-sm tracking-wide text-gray-600 hover:border-b-slate-400 dark:text-gray-200"
          >
            Forgot your password? &nbsp;
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
