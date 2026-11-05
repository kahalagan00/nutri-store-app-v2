import { NavLink, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  FORM_BASE_INPUT_STYLE,
  FORM_ERROR_STYLE,
  SIGN_UP_BOX_STYLE,
  SIGN_UP_SCREEN_BACKGROUND_STYLE,
} from "../utils/constants";
import { useSignUpUser } from "../features/users/useSignUpUser";
import { useValidateBirthday } from "../utils/useValidateBirthday";
import { useState } from "react";

interface SignUpVariables {
  name: string;
  email: string;
  height: number;
  weight: number;
  dateOfBirth: Date;
  symptoms: string;
  password: string;
  passwordConfirm: string;
}

// Enables the user to sign in
const SignUpPage = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (auth: boolean) => void;
}) => {
  const { signup, isPending: isSigningUp } = useSignUpUser(setIsAuthenticated);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<SignUpVariables>();

  const onSubmit: SubmitHandler<SignUpVariables> = (data) => {
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.passwordConfirm ||
      !data.dateOfBirth
    ) {
      return;
    }

    signup(data, { onSuccess: () => reset() });
  };

  const password = watch("password");

  return (
    <main className={SIGN_UP_SCREEN_BACKGROUND_STYLE}>
      <div className={SIGN_UP_BOX_STYLE}>
        <img
          className="max-h-16 max-w-16 self-start"
          src="/images/company-logo-2.svg"
          alt="Company logo"
        />
        <h1 className="mt-4 self-start text-5xl tracking-wide dark:text-gray-50">
          Sign Up
        </h1>
        <p className="mt-3 self-start text-sm tracking-wide text-gray-600 dark:text-gray-100">
          Enter your details below to create your account and get started.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-8 grid grid-rows-5 gap-x-6 gap-y-1 md:grid-cols-2 dark:text-gray-50"
        >
          <div>
            <label htmlFor="name" className="block">
              Full Name
            </label>
            <input
              disabled={isSigningUp}
              className={FORM_BASE_INPUT_STYLE}
              type="text"
              placeholder="Enter name"
              id="name"
              autoComplete="name"
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "name-error" : undefined}
              {...register("name", {
                required: "This field is required",
              })}
            />
            {errors.name && (
              <p id="name-error" className={`${FORM_ERROR_STYLE} mt-1 text-sm`}>
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              disabled={isSigningUp}
              className={FORM_BASE_INPUT_STYLE}
              type="email"
              placeholder="Enter email"
              id="email"
              autoComplete="email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please provide a valid email address",
                },
              })}
            />
            {errors.email && (
              <p
                id="email-error"
                className={`${FORM_ERROR_STYLE} mt-1 text-sm`}
              >
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block">
              Date of birth
            </label>
            <input
              disabled={isSigningUp}
              className={`${FORM_BASE_INPUT_STYLE} text-gray-400 hover:text-black focus:text-black`}
              type="date"
              placeholder="MM/DD/YYYY"
              id="dateOfBirth"
              autoComplete="bday"
              aria-invalid={errors.dateOfBirth ? "true" : "false"}
              aria-describedby={
                errors.dateOfBirth ? "dateOfBirth-error" : undefined
              }
              {...register("dateOfBirth", {
                required: "This field is required",
                validate: useValidateBirthday,
              })}
            />
            {errors.dateOfBirth && (
              <p
                id="dateOfBirth-error"
                className={`${FORM_ERROR_STYLE} mt-1 text-sm`}
              >
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="symptoms" className="block">
              Symptoms
            </label>
            <input
              disabled={isSigningUp}
              className={FORM_BASE_INPUT_STYLE}
              type="text"
              placeholder="Optional"
              id="symptoms"
              aria-invalid={errors.symptoms ? "true" : "false"}
              aria-describedby={errors.symptoms ? "symptoms-error" : undefined}
              {...register("symptoms")}
            />
            {errors.symptoms && (
              <p
                id="symptoms-error"
                className={`${FORM_ERROR_STYLE} mt-1 text-sm`}
              >
                {errors.symptoms.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="height" className="block">
              Height (m)
            </label>
            <input
              disabled={isSigningUp}
              className={FORM_BASE_INPUT_STYLE}
              type="number"
              min="0"
              max="5"
              step="0.01"
              placeholder="Optional"
              id="height"
              aria-invalid={errors.height ? "true" : "false"}
              aria-describedby={errors.height ? "height-error" : undefined}
              {...register("height", {
                min: { value: 0, message: "Height can't be negative" },
                max: { value: 5, message: "Height must be 5 m or less" },
              })}
            />
            {errors.height && (
              <p
                id="height-error"
                className={`${FORM_ERROR_STYLE} mt-1 text-sm`}
              >
                {errors.height.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="weight" className="block">
              Weight (kg)
            </label>
            <input
              disabled={isSigningUp}
              className={FORM_BASE_INPUT_STYLE}
              type="number"
              min="0"
              max="300"
              step="0.01"
              placeholder="Optional"
              id="weight"
              aria-invalid={errors.weight ? "true" : "false"}
              aria-describedby={errors.weight ? "weight-error" : undefined}
              {...register("weight", {
                min: { value: 0, message: "Weight can't be negative" },
                max: { value: 300, message: "Weight must be 300 kg or less" },
              })}
            />
            {errors.weight && (
              <p
                id="weight-error"
                className={`${FORM_ERROR_STYLE} mt-1 text-sm`}
              >
                {errors.weight.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <input
              disabled={isSigningUp}
              className={FORM_BASE_INPUT_STYLE}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              id="password"
              autoComplete="new-password"
              aria-invalid={errors.password ? "true" : "false"}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 8,
                  message: "Password needs a minimum of 8 characters",
                },
              })}
            />
            {errors.password && (
              <p
                id="password-error"
                className={`${FORM_ERROR_STYLE} mt-1 text-sm`}
              >
                {errors.password.message}
              </p>
            )}
            <label className="mt-2 flex items-center">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>&nbsp; &nbsp; Show password</span>
            </label>
          </div>

          <div className="flex flex-col">
            <label htmlFor="passwordConfirm" className="block">
              Confirm Password
            </label>
            <input
              disabled={isSigningUp}
              className={FORM_BASE_INPUT_STYLE}
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              id="passwordConfirm"
              autoComplete="new-password"
              aria-invalid={errors.passwordConfirm ? "true" : "false"}
              aria-describedby={
                errors.passwordConfirm ? "passwordConfirm-error" : undefined
              }
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.passwordConfirm && (
              <p
                id="passwordConfirm-error"
                className={`${FORM_ERROR_STYLE} mt-1 text-sm`}
              >
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>

          <button
            disabled={isSigningUp}
            type="button"
            onClick={() => navigate("/")}
            className="mt-6 h-12 w-full rounded-lg border-2 border-slate-200 bg-white dark:text-black"
          >
            Cancel
          </button>

          <button
            disabled={isSigningUp}
            type="submit"
            className="mt-6 h-12 w-full rounded-lg bg-blue-800 text-white hover:bg-blue-700 dark:bg-cyan-400 dark:text-slate-900 hover:dark:bg-cyan-300"
          >
            Confirm
          </button>
        </form>

        <div className="mt- flex justify-center">
          <p className="self-center text-sm tracking-wide text-gray-600 dark:text-gray-200">
            Already have an account? &nbsp;
          </p>
          <NavLink
            className="text-md self-center tracking-wide text-blue-800 hover:text-blue-600 dark:text-cyan-400 dark:hover:text-cyan-300"
            to="/login"
          >
            Login
          </NavLink>
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
