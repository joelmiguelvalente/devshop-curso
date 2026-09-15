import { useEffect } from 'react';

export function Alerta({
    type = 'info', // 'success', 'error', 'warning', 'info'
    message,
    onClose,
    duration = 4000
}) {

    useEffect(() => {
        if (!message || !onClose || duration <= 0) return;
        // Agregando auto-cerrado
        const tiempo = setTimeout(onClose, duration);
        return () => clearTimeout(tiempo);
    }, [message, onClose, duration]);

    if (!message) return null;

    // obtener emoji tecla Win + . "verificación"
    const config = {
        success:    { bgClass: "bg-success border-success text-success", icon: "✅" },
        error:      { bgClass: "bg-error border-error text-error",       icon: "💥" },
        warning:    { bgClass: "bg-warning border-warning text-warning", icon: "⚠" },
        info:       { bgClass: "bg-info border-info text-info",          icon: "ℹ️" }
    };

    // Si falla el primero, tendrá como respaldo el 'info'
    const currentConfig = config[type] || config.info;

    return (
        <div
            className={`flex items-center justify-between p-3 border border-1 rounded-3 shadow-sm transition ease-in-out fixed bottom-1 right-1 z-2 ${currentConfig.bgClass}`}
            role="alert"
        >
            <div className="flex items-center gap-3">
                <span className="text-xl shrink-0" aria-hidden="true">{currentConfig.icon}</span>
                <p className="font-medium text-base m-0 text-wrap">{message}</p>
            </div>

            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-3 p-1 rounded-full text-current opacity-6 bg-primary-hover transition cursor-pointer flex items-center justify-center"
                    style={{ width: '24px', height: '24px', background: 'transparent' }}
                    aria-label="Cerrar alerta"
                >
                    ❌
                </button>
            )}
        </div>
    );
}
