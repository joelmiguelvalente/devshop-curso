// src/components/ui/Badge.jsx

// Mapeos con strings literales completos para que PurgeCSS detecte las clases.
const badgeVariantClasses = {
    brand: 'badge-brand',
    surface: 'badge-surface',
    success: 'badge-success',
    warning: 'badge-warning',
    error: 'badge-error',
    info: 'badge-info',
};

const badgeTextClasses = {
    brand: 'text-brand-foreground',
    surface: 'text-brand',
    success: 'text-success-foreground',
    warning: 'text-warning-foreground',
    error: 'text-error-foreground',
    info: 'text-info-foreground',
};

const badgeSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
};

export function Badge({
    content,
    children,
    variant = 'brand',
    size = 'sm',
    cx
}) {
    const extend = (cx === '') ? '' : ` ${cx}`;
    const variantClass = badgeVariantClasses[variant] ?? 'badge-brand';
    const textClass = badgeTextClasses[variant] ?? 'text-brand-foreground';
    const sizeClass = badgeSizeClasses[size] ?? 'text-sm';

    const className = [
        'badge',
        variantClass,
        textClass,
        sizeClass,
        'font-black',
        extend
    ].filter(Boolean).join(' ');

    return (
        <small className={className}>
            {children ?? content}
        </small>
    );
}