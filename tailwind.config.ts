// tailwind.config.js
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
	theme: {
		extend: {
			colors: {
				'base-100': 'var(--color-base-100)',
				'base-200': 'var(--color-base-200)',
				'base-300': 'var(--color-base-300)',
				'base-content': 'var(--color-base-content)',

				primary: {
					DEFAULT: 'var(--color-primary)',
					dark: 'var(--color-primary-dark)',
					content: 'var(--color-primary-content)'
				},
				secondary: {
					DEFAULT: 'var(--color-secondary)',
					dark: 'var(--color-secondary-dark)',
					content: 'var(--color-secondary-content)'
				},
				accent: {
					DEFAULT: 'var(--color-accent)',
					dark: 'var(--color-accent-dark)',
					content: 'var(--color-accent-content)'
				},
				neutral: {
					DEFAULT: 'var(--color-neutral)',
					dark: 'var(--color-neutral-dark)',
					content: 'var(--color-neutral-content)'
				},
				info: {
					DEFAULT: 'var(--color-info)',
					dark: 'var(--color-info-dark)',
					content: 'var(--color-info-content)'
				},
				success: {
					DEFAULT: 'var(--color-success)',
					dark: 'var(--color-success-dark)',
					content: 'var(--color-success-content)'
				},
				warning: {
					DEFAULT: 'var(--color-warning)',
					dark: 'var(--color-warning-dark)',
					content: 'var(--color-warning-content)'
				},
				error: {
					DEFAULT: 'var(--color-error)',
					dark: 'var(--color-error-dark)',
					content: 'var(--color-error-content)'
				}
			}
		}
	},
	plugins: []
};
