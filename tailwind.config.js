module.exports = {
  purge: ["./src/pages/**/*.jsx", "./src/components/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        block02: "#333",
        secondary: "#46C9E5",
      },
      width: {
        30: "30%",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
