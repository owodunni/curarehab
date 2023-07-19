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
        sycamore: {
          50: withOpacity(236, 237, 228),
          100: withOpacity(229, 231, 219),
          200: withOpacity(223, 225, 211),
          300: withOpacity(204, 207, 184),
          400: withOpacity(165, 170, 130),
          500: withOpacity(127, 134, 77),
          600: withOpacity(114, 121, 69),
          700: withOpacity(95, 101, 58),
          800: withOpacity(76, 80, 46),
          900: withOpacity(62, 66, 38)
        },
        tussock: {
          50: withOpacity(244, 236, 226),
          100: withOpacity(240, 230, 217),
          200: withOpacity(237, 224, 207),
          300: withOpacity(225, 205, 179),
          400: withOpacity(203, 168, 121),
          500: withOpacity(181, 131, 64),
          600: withOpacity(163, 118, 58),
          700: withOpacity(136, 98, 48),
          800: withOpacity(109, 79, 38),
          900: withOpacity(89, 64, 31)
        },
        teak: {
          50: withOpacity(253, 246, 239),
          100: withOpacity(252, 243, 234),
          200: withOpacity(251, 240, 228),
          300: withOpacity(249, 230, 212),
          400: withOpacity(245, 212, 180),
          500: withOpacity(240, 193, 148),
          600: withOpacity(216, 174, 133),
          700: withOpacity(180, 145, 111),
          800: withOpacity(144, 116, 89),
          900: withOpacity(118, 95, 73)
        },
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
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
