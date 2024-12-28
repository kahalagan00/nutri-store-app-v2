/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        neuton: ["Neuton", "serif"],
        lato: ["Lato", "sans-serif"],
      },
      backgroundImage: {
        "login-gradient": "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
        "dark-login-gradient":
          "linear-gradient(120deg, #5b6f90 0%, #718a95 100%)",
      },
    },
  },
  plugins: [],
};
