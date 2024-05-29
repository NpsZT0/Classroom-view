import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontSize: {
        "h1": "64px",
        "h2": "30px",
        "h3": "24px",
        "h4": "20px",
        "h5": "18px",
        "h6": "16px",
      }
    },
  },
  plugins: [flowbite.plugin()],
};
