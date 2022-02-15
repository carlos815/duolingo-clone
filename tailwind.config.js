module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      body: ["Red Hat Display", "Arial", "sans-serif"],
    },
    colors: {
      gray: "#4F5D5B",
      "gray-medium": "#CACECE",
      "gray-light": "#F2F3F4",
      red: "#CC0000",
      white: "#FFFFFF",
    },
    extend: {
      animation: {
        shake: "shake 0.1s ease-in forwards 2",
      },

      keyframes: {
        shake: {
          "0%, 100%": { translate: "translate(0, 0)" },
          "25%": { transform: "translate(5px, 0)" },
          "75%": { transform: "translate(-5px, 0)" },
        },
      },

      backgroundImage: {
        mobile: "url('/public/mobile-background.png')",

        desktop: "url('/public/desktop-background.png')",
      },
    },
  },
  plugins: [],
};
