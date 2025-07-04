const defaultTheme = require("tailwindcss/defaultTheme");

function withOpacity(colorValue) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(${colorValue}, ${opacityValue})`;
    }
    return `rgb(${colorValue})`;
  };
}

function fromVariable(variableName) {
  return withOpacity(`var(${variableName})`);
}

/** @param {number} r @param {number} g @param {number} b */
function fromRGB(r, g, b) {
  return withOpacity(`${r}, ${g}, ${b}`);
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      typography: () => {
        return {
          DEFAULT: {
            css: {
              "--tw-prose-body": fromVariable("--color-text-body")(1),
              "--tw-prose-headings": fromVariable("--color-text-heading")(1),
              h1: {
                lineHeight: "1.3",
                fontWeight: "700",
              },
            },
          },
        };
      },
      colors: {
        kol: fromVariable("--color-kol"),
        sand: {
          100: fromVariable("--color-sand-plus"),
          200: fromVariable("--color-sand"),
          300: fromVariable("--color-sand-minus"),
          900: fromRGB(44, 35, 30),
        },
        skog: {
          400: fromVariable("--color-skog-plus"),
          700: fromVariable("--color-skog"),
          900: fromVariable("--color-skog-minus"),
        },
        tegel: fromVariable("--color-tegel"),
        section: fromVariable("--color-bg-section"),
      },
      textColor: {
        theme: {
          heading: fromVariable("--color-text-heading"),
          body: fromVariable("--color-text-body"),
          muted: fromVariable("--color-text-muted"),
          "muted-hover": fromVariable("--color-text-muted-hover"),
        },
      },
      borderColor: {
        theme: {
          div: fromVariable("--color-border-div"),
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        sang: ["SangBleu", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        "5xl": ["2.5rem", { lineHeight: "1.1" }],
        "4xl": ["2.25rem", { lineHeight: "1.1" }],
        "lg-heading": ["1.125rem", { lineHeight: "2rem", fontWeight: "500" }],
        lg: ["1.125rem", { lineHeight: "2rem", fontWeight: "300" }],
        "xl-summary": ["1.125rem", { lineHeight: "28px", fontWeight: "300" }],
        "2xl-summary": ["1.375rem", { lineHeight: "36px", fontWeight: "300" }],
        base: ["1rem", { lineHeight: "1.5rem", fontWeight: "300" }],
        "base-medium": ["1rem", { lineHeight: "1.5rem", fontWeight: "500" }],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
