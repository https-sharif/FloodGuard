/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            screens: {
                'hide-div': {'max': '767px'},
            },
        },
    },
    plugins: [
        function({ addUtilities }) {
            addUtilities({
                '.hide-div': {
                    '@screen hide-div': {
                        display: 'none',
                    },
                },
            });
        },
    ],
}
