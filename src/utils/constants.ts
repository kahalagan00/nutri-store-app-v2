// Payment integration
export const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51QJNj4KXU3G1bVf7KUBRiSlum1YeXAy5tsCB1iKQESwmchg8Sx7Zp99pDGuyvVufcrGyK2K7m5eHYLI0lJUhPcxj00TsNrksje";

// Numbers
export const ADD_TO_CART_DELAY: number = 3000;

// Text
export const STORE_ADDRESS: string =
  "3708 Las Vegas Blvd S, Las Vegas, NV 89109";
export const STORE_PHONE_NUMBER: string = "+1-702-GET-JHUV";
export const STORE_WEBSITE: string = "jhuvNutri@vegas.com.us";

// URLs
// Set per mode in .env.development / .env.production
export const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;
export const ASSETS_R2_URL: string = import.meta.env.VITE_ASSETS_R2_URL;

// Images
export const PAYMENT_METHODS_SRC: string = `${ASSETS_R2_URL}/footer/payment_methods`;

// Styles
export const FORM_ERROR_STYLE: string = "font-lato font-light text-red-500";
export const FORM_BASE_INPUT_STYLE: string =
  "font-lato h-12 w-full rounded-md border-2 border-slate-200 bg-white px-4 text-sm tracking-wide drop-shadow-sm mt-1";
export const SIGN_UP_BOX_STYLE: string =
  " w-full max-w-[50rem] m-4 p-6 rounded-xl bg-slate-100 dark:bg-slate-700 border-[1px] border-slate-600 drop-shadow-xl font-lato ";
export const SIGN_UP_SCREEN_BACKGROUND_STYLE: string =
  "h-full min-h-screen flex w-full items-start md:items-center justify-center bg-login-gradient antialiased dark:bg-dark-login-gradient";
export const LOG_IN_BOX_STYLE: string =
  "flex w-full max-w-[28rem] dark:bg-slate-700 m-4 flex-col justify-start rounded-xl px-6 sm:px-12 py-10 drop-shadow-xl bg-slate-100 border-[1px] border-slate-600 ";
export const LOG_IN_SCREEN_BACKGROUND_STYLE: string =
  "flex h-full min-h-screen w-full items-center justify-center bg-red-400 bg-login-gradient antialiased dark:bg-dark-login-gradient";
export const PAGE_BASE_BACKGROUND_STYLE: string =
  "h-full bg-white p-8 dark:bg-slate-700";
