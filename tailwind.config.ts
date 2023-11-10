/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(118, 11%, 21%)", // Border: hsl(118, 11%, 21%)
				input: "hsl(211, 50%, 46%)",
				ring: "hsl(118, 14%, 21%)",
				background: "hsl(118, 16%, 21%)", // Fundo Principal: hsl(118, 16%, 21%)
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(--primary)",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))", // destructive
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(118, 16%, 31%)",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(118, 32%, 21%)", // Cartas/Opções: Selecionado
					foreground: "hsl(118, 16%, 31%)", // Cartas/Opções: Não-Selecionado
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))", // --118, 34%, 21% --card
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: 0 },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: 0 },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				shake: "head-shake 1s ease-in-out",
				tada: "tada 1s ease-in-out forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
