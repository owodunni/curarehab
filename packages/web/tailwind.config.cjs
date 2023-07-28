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
  // TODO make font-weight 300 default§
  theme: {
    extend: {
      colors: {
        kol: withOpacity(37, 37, 35),
        sand: {
          100: withOpacity(243, 242, 236), // Sand+
          200: withOpacity(224, 218, 207), // Sand
          300: withOpacity(200, 193, 183), // Sand-
        },
        skog: {
          400: withOpacity(111, 129, 103), // <-- Skog+
          700: withOpacity(74, 88, 73), // <-- Skog
          900: withOpacity(57, 65, 53) // <-- Skog-
        },
        tegel:  withOpacity(213, 71, 33)
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        sang: ["SangBleu", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
