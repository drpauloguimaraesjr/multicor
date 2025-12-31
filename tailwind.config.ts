import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Paleta sofisticada e minimalista
                background: '#0a0a0a', // Quase preto, mais suave que #000
                surface: '#121212',
                primary: '#ffffff',
                secondary: '#a1a1aa', // Cinza neutro
                accent: '#3b82f6', // Azul elétrico sutil para CTAs, se necessário
            },
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
                display: ['var(--font-outfit)', 'system-ui', 'sans-serif'], // Pode ser trocada por uma serifada se desejar
            },
            transitionTimingFunction: {
                'custom-bezier': 'cubic-bezier(0.625, 0.05, 0, 1)', // Curva do site referência
            },
            transitionDuration: {
                '700': '700ms',
            },
            scale: {
                '102': '1.02',
            }
        },
    },
    plugins: [],
};

export default config;
