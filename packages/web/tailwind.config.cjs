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
      colors: {
        kol: fromVariable("--color-kol"),
        sand: {
          100: fromVariable("--color-sand-plus"),
          200: fromVariable("--color-sand"),
          300: fromVariable("--color-sand-minus")
        },
        skog: {
          400: fromVariable("--color-skog-plus"),
          700: fromVariable("--color-skog"),
          900: fromVariable("--color-skog-minus")
        },
        tegel: fromVariable("--color-tegel")
      },
      textColor: {
        theme: {
          heading: fromVariable("--color-text-heading"),
          body: fromVariable("--color-text-body"),
          muted: fromVariable("--color-text-muted"),
          "muted-hover": fromVariable("--color-text-muted-hover")
        }
      },
      backgroundColor: {
        theme: {
          section: fromVariable("--color-bg-section")
        }
      },
      borderColor: {
        theme: {
          div: fromVariable("--color-border-div")
        }
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        sang: ["SangBleu", ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        "6xl": ["3.75rem", { lineHeight: "1.1" }],
        lg: ["1.125rem", { lineHeight: "2rem", fontWeight: "300" }]
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
