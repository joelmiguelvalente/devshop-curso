// /src/components/ui/Button.jsx

// Mapeos con strings literales completos para que PurgeCSS detecte las clases.
const buttonVariantClasses = {
    brand: 'btn-brand',
    success: 'btn-success',
    error: 'btn-error',
    ghost: 'btn-ghost',
};

const buttonSizeClasses = {
    sm: 'btn-sm',
    md: 'btn-md',
    lg: 'btn-lg',
    xl: 'btn-xl',
};

function ButtonGroup({ children, fullWidth = false }) {
    const classes = [
        'btn-group mt-2',
        fullWidth ? 'full flex' : 'inline-flex items-center'
    ];

    const className = classes.filter(Boolean).join(' ');

    return (
        <div className={className} role="group">
            {children}
        </div>
    );
}

function Button({
    variant = 'brand',
    size = 'sm',
    fullWidth = false,
    isOnlyIcon = false,
    onClick,
    children,
    disabled = false,
    ...props
}) {

    // Lista de clases condicionales
    const classes = [
        'btn',
        buttonVariantClasses[variant] ?? 'btn-brand',
        buttonSizeClasses[size] ?? 'btn-sm',
        fullWidth ? 'grow-1 w-full' : '',
        isOnlyIcon ? 'px-4' : ''
    ];

    const className = classes.filter(Boolean).join(' ');

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled}
            type="button"
            {...props}
        >{children}</button>
    )
}

export { ButtonGroup, Button }