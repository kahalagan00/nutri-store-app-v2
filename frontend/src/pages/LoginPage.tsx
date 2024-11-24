import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../features/users/useLoginUser";
import {
  FORM_BASE_INPUT_STYLE,
  FORM_ERROR_STYLE,
  LOG_IN_BOX_STYLE,
  LOG_IN_SCREEN_BACKGROUND_STYLE,
} from "../utils/constants";

type LoginVariables = {
  email: string;
  password: string;
};

const LoginPage = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (auth: boolean) => void;
}) => {
  const { login, isLoading: isLoggingIn } = useLoginUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: LoginVariables) => {
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
          src="./src/assets/company-logo-2.svg"
          alt="Company logo"
        />
        <h1 className="font-lato self-center text-5xl tracking-wide">
          Welcome Back
        </h1>
        <p className="font-lato mt-4 self-center text-sm tracking-wide text-gray-600">
          Glad to see you again 👋
        </p>
        <p className="font-lato self-center text-sm tracking-wide text-gray-600">
          Login to your account below
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="font-lato mb-1 mt-8">
            Email &nbsp;
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

          <p className="font-lato mb-1 mt-6">
            Password &nbsp;
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
            className="mt-6 h-12 w-full rounded-lg bg-blue-800 text-white hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <div className="mt-5 flex justify-center">
          <p className="font-lato self-center text-sm tracking-wide text-gray-600">
            Don't have an account? &nbsp;
          </p>
          <NavLink
            className="font-lato text-md self-center tracking-wide text-blue-800 hover:text-blue-600"
            to="/signup"
          >
            Sign up for Free
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
