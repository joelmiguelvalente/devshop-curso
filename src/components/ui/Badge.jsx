// src/components/ui/Badge.jsx

export function Badge({
    content,
    variant = 'brand',
    size = 'sm',
    cx
}) {
    const extend = (cx === '') ? '' : ` ${cx}`;
    const text = 'text-' + (variant === 'surface' ? 'brand' : `${variant}-foreground`);

    return (
        <small
            className={`badge bg-${variant} ${text} font-black text-${size} rounded-6 px-2${extend}`}
        >
            {content}
        </small>
    );
}