import { useState } from "react";
import {
  FORM_BASE_INPUT_STYLE,
  FORM_ERROR_STYLE,
  LOG_IN_BOX_STYLE,
  LOG_IN_SCREEN_BACKGROUND_STYLE,
} from "../utils/constants";
import { useForm } from "react-hook-form";

const ForgotPasswordPage: React.FC = () => {
  const [isSentToken, setIsSentToken] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm();

  const onEmailSubmit = () => {
    setIsSentToken(true);
    reset();
  };

  const onPasswordReset = (data) => {
    console.log(data);
  };

  const password = watch("password");

  return (
    <main className={LOG_IN_SCREEN_BACKGROUND_STYLE}>
      <div className={LOG_IN_BOX_STYLE}>
        <h1 className="font-lato self-center text-2xl tracking-wide">
          Reset Password
        </h1>
        {!isSentToken ? (
          <form onSubmit={handleSubmit(onEmailSubmit)}>
            <p className="font-lato mb-1 mt-8">
              Email <span className="font-bold text-red-500">*</span> &nbsp;
              {errors.email && (
                <span className={FORM_ERROR_STYLE}>{errors.email.message}</span>
              )}
            </p>
            <input
              // disabled={isLoggingIn}
              className={FORM_BASE_INPUT_STYLE}
              placeholder="Email"
              type="email"
              id="email"
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
            <button
              type="submit"
              className="mt-6 h-12 w-full rounded-lg bg-blue-800 text-white hover:bg-blue-700"
            >
              Send token
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit(onPasswordReset)}>
            <p className="font-lato mb-1 mt-6">
              Token <span className="font-bold text-red-500">*</span> &nbsp;
              {errors.token && (
                <span className={FORM_ERROR_STYLE}>{errors.token.message}</span>
              )}
            </p>
            <input
              // disabled={isLoggingIn}
              className={FORM_BASE_INPUT_STYLE}
              type="text"
              placeholder="Enter token"
              id="token"
              {...register("token", {
                required: "This field is required to reset password",
              })}
            />

            <p className="font-lato mb-1 mt-6">
              Password <span className="font-bold text-red-500">*</span> &nbsp;
              {errors.password && (
                <span className={FORM_ERROR_STYLE}>
                  {errors.password.message}
                </span>
              )}
            </p>
            <input
              // disabled={isLoggingIn}
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

            <p className="font-lato mb-1 mt-6">
              Confirm Password &nbsp;
              {errors.passwordConfirm && (
                <span className={FORM_ERROR_STYLE}>
                  {errors.passwordConfirm.message}
                </span>
              )}
            </p>
            <input
              // disabled={isLoading}
              className={FORM_BASE_INPUT_STYLE}
              type="password"
              placeholder="Enter password"
              id="passwordConfirm"
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />

            <button
              type="submit"
              className="mt-6 h-12 w-full rounded-lg bg-blue-800 text-white hover:bg-blue-700"
            >
              Change password
            </button>
          </form>
        )}
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
