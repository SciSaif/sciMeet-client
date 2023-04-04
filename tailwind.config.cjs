/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#35393f",
                bgColor: "#1D1E1E",
            },
        },
    },
    darkMode: "class",
    plugins: [require("@tailwindcss/forms")],
};
