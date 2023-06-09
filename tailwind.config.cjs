/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#35393f",
                primaryDark: "#1D1E1E",
                secondaryDark: "#2D2E2E",

                primaryAccent: "#1DB954",
                primaryAccentLighter: "#1ED760",
                textGray: "#b3b3b3",
                textGray2: "#a3a3a3",
                textGray3: "#737373",
            },
        },
    },
    darkMode: "class",
    plugins: [require("@tailwindcss/forms"), require("autoprefixer")],
};
