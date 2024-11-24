import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FORM_BASE_INPUT_STYLE,
  FORM_ERROR_STYLE,
  SIGN_UP_BOX_STYLE,
  SIGN_UP_SCREEN_BACKGROUND_STYLE,
} from "../utils/constants";
import { useSignUpUser } from "../features/users/useSignUpUser";
import { useValidateBirthday } from "../utils/useValidateBirthday";
import { useState } from "react";

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

const SignUpPage = ({
  setIsAuthenticated,
}: {
  setIsAuthenticated: (auth: boolean) => void;
}) => {
  const { signup, isLoading } = useSignUpUser();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    watch,
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data: SignUpVariables) => {
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.password ||
      !data.dateOfBirth
    ) {
      return;
    }

    signup(data, {
      onSuccess: () => {
        setIsAuthenticated(true);
        reset();
      },
      onError: () => setIsAuthenticated(false),
    });
  };

  const password = watch("password");

  return (
    <main className={SIGN_UP_SCREEN_BACKGROUND_STYLE}>
      <div className={SIGN_UP_BOX_STYLE}>
        <img
          className="max-h-16 max-w-16 self-start"
          src="./src/assets/company-logo-2.svg"
          alt="Company logo"
        />
        <h1 className="mt-4 self-start text-5xl tracking-wide">Sign Up</h1>
        <p className="mt-3 self-start text-sm tracking-wide text-gray-600">
          Enter your details below to create your account and get started.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid h-[32rem] grid-cols-2 grid-rows-5 gap-x-6 gap-y-1"
        >
          <div>
            <p>
              Full Name &nbsp;
              {errors.name && (
                <span className={FORM_ERROR_STYLE}>{errors.name.message}</span>
              )}
            </p>
            <input
              disabled={isLoading}
              className={FORM_BASE_INPUT_STYLE}
              type="name"
              placeholder="Enter name"
              id="name"
              {...register("name", {
                required: "This field is required",
              })}
            />
          </div>

          <div>
            <p>
              Email &nbsp;
              {errors.email && (
                <span className={FORM_ERROR_STYLE}>{errors.email.message}</span>
              )}
            </p>
            <input
              disabled={isLoading}
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
          </div>

          <div>
            <p>
              Date of birth &nbsp;
              {errors.dateOfBirth && (
                <span className={FORM_ERROR_STYLE}>
                  {errors.dateOfBirth.message}
                </span>
              )}
            </p>
            <input
              disabled={isLoading}
              className={`${FORM_BASE_INPUT_STYLE} text-gray-400 hover:text-black focus:text-black`}
              type="date"
              placeholder="MM/DD/YYYY"
              id="dateOfBirth"
              {...register("dateOfBirth", {
                required: "This field is required",
                validate: useValidateBirthday,
              })}
            />
          </div>

          <div>
            <p>
              Symptoms &nbsp;
              {errors.symptoms && (
                <span className={FORM_ERROR_STYLE}>
                  {errors.symptoms.message}
                </span>
              )}
            </p>
            <input
              disabled={isLoading}
              className={FORM_BASE_INPUT_STYLE}
              type="text"
              placeholder="Optional"
              id="symptoms"
              {...register("symptoms")}
            />
          </div>

          <div>
            <p>
              Height (m) &nbsp;
              {errors.height && (
                <span className={FORM_ERROR_STYLE}>
                  {errors.height.message}
                </span>
              )}
            </p>
            <input
              disabled={isLoading}
              className={FORM_BASE_INPUT_STYLE}
              type="number"
              min="0"
              max="5"
              step="0.01"
              placeholder="Optional"
              id="height"
              {...register("height")}
            />
          </div>

          <div>
            <p>
              Weight (kg) &nbsp;
              {errors.weight && (
                <span className={FORM_ERROR_STYLE}>
                  {errors.weight.message}
                </span>
              )}
            </p>
            <input
              disabled={isLoading}
              className={FORM_BASE_INPUT_STYLE}
              type="number"
              min="0"
              max="300"
              step="0.01"
              placeholder="Optional"
              id="weight"
              {...register("weight")}
            />
          </div>

          <div>
            <p>
              Password &nbsp;
              {errors.password && (
                <span className={FORM_ERROR_STYLE}>
                  {errors.password.message}
                </span>
              )}
            </p>
            <input
              disabled={isLoading}
              className={FORM_BASE_INPUT_STYLE}
              type={showPassword ? "text" : "password"}
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
            <p>
              Confirm Password &nbsp;
              {errors.passwordConfirm && (
                <span className={FORM_ERROR_STYLE}>
                  {errors.passwordConfirm.message}
                </span>
              )}
            </p>
            <input
              disabled={isLoading}
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
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="mt-6 h-12 w-full rounded-lg border-2 border-slate-200 bg-white"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
            type="submit"
            className="mt-6 h-12 w-full rounded-lg bg-blue-800 text-white hover:bg-blue-700"
          >
            Confirm
          </button>
        </form>

        <div className="mt- flex justify-center">
          <p className="self-center text-sm tracking-wide text-gray-600">
            Already have an account? &nbsp;
          </p>
          <NavLink
            className="text-md self-center tracking-wide text-blue-800 hover:text-blue-600"
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
