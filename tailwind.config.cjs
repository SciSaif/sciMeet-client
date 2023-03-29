/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                dark: "#35393f",
            },
        },
    },
    darkMode: "class",
    plugins: [require("@tailwindcss/forms")],
};
