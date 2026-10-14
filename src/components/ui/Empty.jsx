// src/components/ui/Empty.jsx
export function Empty({ heading, content }) {
	return (
		<div className="empty">
			<h1 className="text-4xl pb-4">{heading}</h1>
			<p className="text-xl">{content}</p>
		</div>
	);
}