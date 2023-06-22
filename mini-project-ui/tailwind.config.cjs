/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            poppins: ["Poppins", "sans-serif"],
         },
      },
      container: {
         center: true,
         padding: {
            DEFAULT: "1rem",
            sm: "1rem",
            lg: "4rem",
         },
      },
   },
   screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
   },
   plugins: [],
};
