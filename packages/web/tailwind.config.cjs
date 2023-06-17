const colors = require('tailwindcss/colors')

function valueToHex(c) {
  return c.toString(16);
}

function rgbToHex(r, g, b) {
  return "#" + valueToHex(r) + valueToHex(g) + valueToHex(b);
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        surface: {
          "50": rgbToHex(253, 246, 239),
          "100": rgbToHex(252, 243, 234),
          "200": rgbToHex(251, 240, 228),
          "300": rgbToHex(249, 230, 212),
          "400": rgbToHex(245, 212, 180),
          "500": rgbToHex(240, 193, 148),
          "600": rgbToHex(216, 174, 133),
          "700": rgbToHex(180, 145, 111),
          "800": rgbToHex(144, 116, 89),
          "900": rgbToHex(118, 95, 73),
        },
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
