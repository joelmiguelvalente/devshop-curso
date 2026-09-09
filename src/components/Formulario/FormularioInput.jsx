// src/components/Formulario/FormularioInput.jsx
export function Input({
    label,
    type = 'text', // 'text', 'number', 'file', 'checkbox', 'radio', 'select', 'textarea'
    name,
    value,
    onChange,
    placeholder,
    options = [],
    disabled = false
}) {
    const wrapperClass = "flex flex-col gap-2 mb-3 pr-2 pl-2";
    const inputBaseClass = "p-2 border rounded-2 w-full text-base focus-ring";

    if (type === 'textarea') {
        return (
            <div className={wrapperClass}>
                {label && <label className="font-semibold text">{label}</label>}
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={value || ''}
                    onChange={onChange}
                    className={inputBaseClass}
                    disabled={disabled}
                />
            </div>
        );
    }

    if (type === 'select') {
        return (
            <div className={wrapperClass}>
                {label && <label className="font-semibold text">{label}</label>}
                <select
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    className={inputBaseClass}
                    disabled={disabled}
                >
                    <option value="" disabled hidden>{placeholder || "Seleccione una opción"}</option>
                    {options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    if (type === 'checkbox' || type === 'radio') {
        return (
            <div className="flex items-center gap-2 mb-3 pr-2 pl-2">
                <input
                    type={type}
                    name={name}
                    id={`${name}-${value}`}
                    value={value || ''}
                    checked={type === 'checkbox' ? !!value : undefined} 
                    onChange={onChange}
                    disabled={disabled}
                    className="focus-ring"
                />
                {label && <label htmlFor={`${name}-${value}`} className="font-semibold text">{label}</label>}
            </div>
        );
    }

    return (
        <div className={wrapperClass}>
            {label && <label className="font-semibold text">{label}</label>}
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={type !== 'file' ? (value || '') : undefined}
                onChange={onChange}
                className={inputBaseClass}
                disabled={disabled}
            />
        </div>
    );
}
