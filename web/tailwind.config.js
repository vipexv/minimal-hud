/* eslint-disable no-undef */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 2px 4px var(--tw-shadow-color)",
        lg: "0 8px 16px var(--tw-shadow-color)",
      },
      fontFamily: {
        geist: [
          "Geist",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        roboto: ["Roboto", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      screens: {
        1920: "1920px",
        "2k": "2560px",
        "4k": "3840px",
      },
      colors: {
        primary: "#94f024",
        border: "#434346",
        secondaryBorder: "#646260",
        gradientDark: {
          from: "#3c3a3c7a",
          via: "#3c3a3cc7",
          to: "#3c3a3c7a",
        },
        gradientMuted: {
          from: "#5a585662",
          via: "#5a58569f",
          to: "#5a585662",
        },
      },
    },
  },
  plugins: [],
};
