const defaultTheme = require("tailwindcss/defaultTheme");

/** @param {number} r @param {number} g @param {number} b */
function withOpacity(r, g, b) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(${r}, ${g}, ${b}, ${opacityValue})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        punch: {
          50: withOpacity(253, 245, 239),
          100: withOpacity(251, 232, 217),
          200: withOpacity(246, 205, 178),
          300: withOpacity(240, 171, 129),
          400: withOpacity(233, 128, 78),
          500: withOpacity(228, 95, 43),
          600: withOpacity(213, 71, 33), // <-- Pontus orange
          700: withOpacity(177, 53, 29),
          800: withOpacity(141, 44, 31),
          900: withOpacity(61, 17, 13)
        },
        "lunar-green": {
          50: withOpacity(245, 248, 245),
          100: withOpacity(224, 231, 225),
          200: withOpacity(192, 207, 193),
          300: withOpacity(153, 175, 156),
          400: withOpacity(117, 138, 120), // <-- Pontus green 1-
          500: withOpacity(89, 115, 93),
          600: withOpacity(70, 91, 73),
          700: withOpacity(61, 78, 64), // <-- Pontus green 1
          800: withOpacity(49, 62, 51),
          900: withOpacity(45, 53, 44) // <-- Pontus green 1+
        },
        "moon-mist": {
          50: withOpacity(248, 246, 244),
          100: withOpacity(243, 242, 236), // <-- Pontus gray 2+
          200: withOpacity(224, 218, 207), // <-- Pontus gray 2
          300: withOpacity(200, 188, 169), // <-- Not actually Pontus gray 2- which is 218 214 206
          400: withOpacity(177, 158, 134),
          500: withOpacity(161, 137, 110),
          600: withOpacity(147, 120, 99),
          700: withOpacity(123, 99, 83),
          800: withOpacity(101, 82, 71),
          900: withOpacity(44, 35, 30)
        }
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        sang: ["SangBleu", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
