/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./data/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dam: {
          dark: "#282328",
          bronze: "#9B6F4C",
          beige: "#E6DCC8",
          cream: "#F5EFE3",
          ink: "#171417",
        },
      },
      boxShadow: {
        bronze: "0 24px 80px rgba(155, 111, 76, 0.26)",
      },
      backgroundImage: {
        "dam-texture":
          "radial-gradient(circle at 20% 20%, rgba(155,111,76,0.18), transparent 26%), radial-gradient(circle at 80% 0%, rgba(40,35,40,0.12), transparent 24%), linear-gradient(135deg, #F5EFE3 0%, #E6DCC8 48%, #D8C9AF 100%)",
      },
    },
  },
  plugins: [],
};
