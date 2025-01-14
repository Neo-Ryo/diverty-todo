/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    safelist: [
        {
            pattern:
                /(text|bg)-(red|green|blue|orange|purple|gray|yellow|pink)-(100|500|700)/, // so tailwind render dynamically selected colors
            variants: [],
        },
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
