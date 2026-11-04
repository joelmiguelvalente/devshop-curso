// src/components/seo/SEO.jsx
export const SEO = ({ title, description, canonical, preload, image, noIndex = false, type = 'website' }) => (
	<>
		{title && <title>{title}</title>}
		{description && <meta name="description" content={description} />}
		{canonical && <link rel="canonical" href={`https://devshop-curso.vercel.app${canonical}`} />}
		{preload && <link rel="preload" href={image} as="image" fetchPriority="high" />}
		{image && <meta property="og:image" content={image} />}
		<meta property="og:type" content={type} />
		{title && <meta property="og:title" content={title} />}
		{description && <meta property="og:description" content={description} />}
		<meta name="twitter:card" content="summary_large_image" />
		{noIndex && <meta name="robots" content="noindex, nofollow" />}
	</>
);