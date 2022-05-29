module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightGray: "#303439",
        darkGray: "#1D1E22",
        gradientBlue: "#04BDD7",
        gradientGreen: "#12972F",
        orange: "#E76E3C",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
