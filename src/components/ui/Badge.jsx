// src/components/ui/Badge.jsx
export function Badge({
    content,
    children,
    variant = 'brand',
    size = 'sm',
    cx
}) {
    const extend = (cx === '') ? '' : ` ${cx}`;
    const text = 'text-' + (variant === 'surface' ? 'brand' : `${variant}-foreground`);

    return (
        <small
            className={`badge badge-${variant} ${text} text-${size} font-black ${extend}`}
        >
            {children ?? content}
        </small>
    );
}