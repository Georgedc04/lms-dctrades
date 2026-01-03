/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Maps 'font-sans' to our Inter variable from RootLayout
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        // Maps 'font-handwritten' to our Caveat variable
        handwritten: ["var(--font-handwritten)", "cursive"],
      },
      // Adding a custom "fine" letter spacing for that premium look
      letterSpacing: {
        tightest: "-.04em",
      },
      // You can also add custom border radii if you want that "super-round" bento look
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      }
    },
  },
  plugins: [],
};