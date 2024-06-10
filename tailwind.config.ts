import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
	prefix: '',
	darkMode: ['selector', '[data-theme="dark"]'],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				'font': 'var(--color-font)',
				'font-2': 'var(--color-font-2)',
				'font-faded': 'var(--color-font-faded)',

				'font-shadow': '--color-font-shadow',
				'font-shadow-highlight': '--color-font-shadow-highlight',

				'background-start': 'var(--color-background-start)',
				'background-end': 'var(--color-background-end)',

				'app': 'var(--color-app)',
				'app-accent': 'var(--color-app-accent)',
				'app-contrast': 'var(--color-app-contrast)',
				'app-color': 'var(--color-app-color)',

				hinted: {
					DEFAULT: 'var(--color-hinted-3)',
					0: 'var(--color-hinted-0)',
					100: 'var(--color-hinted-1)',
					200: 'var(--color-hinted-2)',
					300: 'var(--color-hinted-3)',
					400: 'var(--color-hinted-4)',
					450: 'var(--color-hinted-45)',
					500: 'var(--color-hinted-5)',
					600: 'var(--color-hinted-6)',
					700: 'var(--color-hinted-7)',
					750: 'var(--color-hinted-75)',
					800: 'var(--color-hinted-8)',
					900: 'var(--color-hinted-9)',
					1000: 'var(--color-hinted-10)',
					1100: 'var(--color-hinted-11)',
					1200: 'var(--color-hinted-12)',
					1300: 'var(--color-hinted-13)',
					1400: 'var(--color-hinted-14)',
					1500: 'var(--color-hinted-15)'
				},

				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},

			borderWidth: {
				'3': '3px',
				'6': '6px'
			},

			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},

			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},

			boxShadow: {
				'theme-button': '0px 0px 4px var(--color-background-end)',
				'theme-button-hover': '0px 0px 2px 0.5px var(--color-app-contrast), 0px 0px 4px var(--color-background-end)'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
} satisfies Config;

export default config;
