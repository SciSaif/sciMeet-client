/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,css}"],
    theme: {
        extend: {
            colors: {
                dark: "#35393f",
                // primary: { ...colors.cyan, DEFAULT: colors.cyan[100] },
                // secondary: { ...colors.teal, DEFAULT: colors.teal[500] },
                // tertiary: { ...colors.pink, DEFAULT: colors.pink[500] },
                primary: { ...colors.slate, DEFAULT: colors.slate[800] },
                secondary: { ...colors.teal, DEFAULT: colors.teal[500] },
                tertiary: { ...colors.pink, DEFAULT: colors.pink[500] },
                // text1: "#353535",
                // text2: "#2e2e2e",
                // text3: "#131313",
                text1: "#b3b3b3",
                text2: "#a3a3a3",
                text3: "#737373",
                text: { ...colors.zinc, DEFAULT: colors.zinc[400] },
                // text2: { ...colors.teal, DEFAULT: colors.teal[500] },
                // text3: { ...colors.pink, DEFAULT: colors.pink[500] },
            },
        },
    },
    darkMode: "class",
    plugins: [require("@tailwindcss/forms"), require("autoprefixer")],
};
