import purgecss from '@fullhuman/postcss-purgecss';

export default {
	plugins: [
		process.env.NODE_ENV === 'production' &&
			purgecss({
				content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
				defaultExtractor: (content) => {
					// eslint-disable-next-line no-useless-escape
					return content.match(/[a-zA-Z0-9_\-\/:]+/g) || [];
				},
				safelist: {
					standard: [
						'html', 'body', 'root', 'open', 'active', 'pending', 'transitioning',
						/^popover/, /^anchor/
					],
					greedy: [/^lucide-/]
				}
			}),
	].filter(Boolean),
};
