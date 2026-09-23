// /src/components/ui/Button.jsx
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
        `btn-${variant}`,
        `btn-${size}`,
        fullWidth ? 'grow-1 w-full' : '',
        isOnlyIcon ? 'btn-icon' : ''
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