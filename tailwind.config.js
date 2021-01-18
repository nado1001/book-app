module.exports = {
  purge: ["./src/pages/**/*.jsx", "./src/components/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        block02: "#333",
        secondary: "#46C9E5",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
