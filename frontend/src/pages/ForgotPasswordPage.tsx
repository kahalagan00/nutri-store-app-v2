import { useState } from "react";
import {
  FORM_BASE_INPUT_STYLE,
  FORM_ERROR_STYLE,
  LOG_IN_BOX_STYLE,
  LOG_IN_SCREEN_BACKGROUND_STYLE,
} from "../utils/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResetPassword } from "../features/users/useResetPassword";
import { forgotPasswordApi } from "../services/apiUsers";
import Spinner from "../ui/Spinner";

interface ResetPasswordVariables {
  password: string;
  passwordConfirm: string;
  token: string;
}

interface ForgotPasswordVariables {
  email: string;
}

// Enables the user the send a token to their email to reset their password
const ForgotPasswordPage: React.FC = () => {
  const [isSentToken, setIsSentToken] = useState(false);
  const { resetPassword, isPending: isResetting } = useResetPassword();

  // Form 1: Forgot Password
  const {
    register: registerForgotPassword,
    handleSubmit: handleSubmitForgotPassword,
    formState: { errors: forgotPasswordErrors },
    reset: resetForgotPassword,
  } = useForm<ForgotPasswordVariables>();

  const onSubmitForgotPassword: SubmitHandler<ForgotPasswordVariables> = (
    data,
  ) => {
    setIsSentToken(true);
    forgotPasswordApi(data.email);
    resetForgotPassword(); // Reset form after submission
  };

  // Form 2: Reset Password
  const {
    register: registerResetPassword,
    handleSubmit: handleSubmitResetPassword,
    formState: { errors: resetPasswordErrors },
    reset: resetResetPassword,
    watch,
  } = useForm<ResetPasswordVariables>();

  const onSubmitResetPassword: SubmitHandler<ResetPasswordVariables> = (
    data,
  ) => {
    if (!data.token) {
      return;
    }
    resetPassword(data, {
      onSettled: () => resetResetPassword(),
    });
  };

  const password = watch("password");

  return (
    <main className={LOG_IN_SCREEN_BACKGROUND_STYLE}>
      {isResetting ? (
        <Spinner />
      ) : (
        <div className={LOG_IN_BOX_STYLE}>
          <h1 className="font-lato self-center text-2xl tracking-wide">
            Reset Password
          </h1>
          {!isSentToken ? (
            <form onSubmit={handleSubmitForgotPassword(onSubmitForgotPassword)}>
              <p className="font-lato mb-1 mt-8">
                Email <span className="font-bold text-red-500">*</span> &nbsp;
                {forgotPasswordErrors.email && (
                  <span className={FORM_ERROR_STYLE}>
                    {forgotPasswordErrors.email.message}
                  </span>
                )}
              </p>
              <input
                // disabled={isLoggingIn}
                className={FORM_BASE_INPUT_STYLE}
                placeholder="Email"
                type="email"
                id="email"
                {...registerForgotPassword("email", {
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
            <form onSubmit={handleSubmitResetPassword(onSubmitResetPassword)}>
              <p className="font-lato mb-1 mt-6">
                Token <span className="font-bold text-red-500">*</span> &nbsp;
                {resetPasswordErrors.token && (
                  <span className={FORM_ERROR_STYLE}>
                    {resetPasswordErrors.token.message}
                  </span>
                )}
              </p>
              <input
                // disabled={isLoggingIn}
                className={FORM_BASE_INPUT_STYLE}
                type="text"
                placeholder="Enter token"
                id="token"
                {...registerResetPassword("token", {
                  required: "This field is required to reset password",
                })}
              />

              <p className="font-lato mb-1 mt-6">
                Password <span className="font-bold text-red-500">*</span>{" "}
                &nbsp;
                {resetPasswordErrors.password && (
                  <span className={FORM_ERROR_STYLE}>
                    {resetPasswordErrors.password.message}
                  </span>
                )}
              </p>
              <input
                // disabled={isLoggingIn}
                className={FORM_BASE_INPUT_STYLE}
                type="password"
                placeholder="Enter password"
                id="password"
                {...registerResetPassword("password", {
                  required: "This field is required",
                  minLength: {
                    value: 8,
                    message: "Password needs a minimum of 8 characters",
                  },
                })}
              />

              <p className="font-lato mb-1 mt-6">
                Confirm Password &nbsp;
                {resetPasswordErrors.passwordConfirm && (
                  <span className={FORM_ERROR_STYLE}>
                    {resetPasswordErrors.passwordConfirm.message}
                  </span>
                )}
              </p>
              <input
                // disabled={isLoading}
                className={FORM_BASE_INPUT_STYLE}
                type="password"
                placeholder="Enter password"
                id="passwordConfirm"
                {...registerResetPassword("passwordConfirm", {
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
      )}
    </main>
  );
};

export default ForgotPasswordPage;
