/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'jap-navy': '#194569',   // Deepest blue - Text, Primary Actions
                'jap-blue': '#5F84A2',   // Muted blue - Secondary Text, Icons
                'jap-mist': '#91AEC4',   // Soft blue - Borders, Dividers
                'jap-sky': '#B7D0E1',    // Pale blue - Backgrounds
                'jap-cloud': '#CADEED',  // Lighter blue - Card Backgrounds
                'jap-ice': '#DBECF4',    // Lightest blue - Highlights, Hover states
                'glass-border': 'rgba(255, 255, 255, 0.2)',
                'glass-surface': 'rgba(255, 255, 255, 0.1)',
            },
            fontFamily: {
                sans: ['"Zen Kaku Gothic New"', 'sans-serif'], // Japanese-style gothic font
                serif: ['"Zen Old Mincho"', 'serif'],
            },
            backgroundImage: {
                'washi-pattern': "url('https://www.transparenttextures.com/patterns/washi.png')", // Subtle paper texture
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'slide-up': 'slideUp 0.8s ease-out forwards',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            }
        },
    },
    plugins: [],
}
