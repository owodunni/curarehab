function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

const colorStep = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function createColor(name) {
  return Object.fromEntries(
    colorStep.map((step) => [step, withOpacity(`--color-${name}-${step}`)])
  );
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        success: createColor("success"),
        tertiary: createColor("tertiary"),
        error: createColor("error"),
        surface: createColor("surface")
      }
    }
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")]
};
