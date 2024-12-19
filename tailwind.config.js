/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"]
      },
      fontSize: {
        "3xl": 28
      },
      colors: {
        primary: {
          100: "#70C3FF",
          200: "#4B65FF"
        },
        secondary: {
          100: "#F4F9FF",
          200: "#E0EDFB"
        },
        midnight: "#4A4E71",
        sky: "#6F91BC",
        emerald: "#27B274",
        coral: "#FF8080",
        blush: "#FDEFEE",
        light: "#CFE1F4"
      }
    }
  },
  plugins: []
}
