// src/components/Formulario/FormularioInput.jsx
const inputBaseClass = "p-1 border rounded-2 w-full text-base focus-ring shrink-1";

function Wrapper({ children }) {
    return (
        <div className="flex flex-col gap-2 mb-3 pr-2 pl-2">
            {children}
        </div>
    );
}

function Label({ label, name }) {
    if(label !== '') {
        return <label htmlFor={name} className="font-semibold text">{label}</label>;
    }
    return;
}

export function Textarea({
    label,
    name,
    placeholder,
    value,
    onChange,
    disabled = false,
    required = false
}) {
    return (
        <Wrapper>
            <Label label={label} name={name} />
            <textarea
                name={name}
                id={name}
                placeholder={placeholder}
                value={value || ''}
                onChange={onChange}
                className={inputBaseClass}
                disabled={disabled}
                required={required}
            />
        </Wrapper>
    );
}

export function Select({
    label,
    name,
    placeholder,
    value,
    onChange,
    disabled = false,
    options = [],
    required = false
}) {
    return (
        <Wrapper>
            <Label label={label} name={name} />
            <select
                name={name}
                id={name}
                value={value || ''}
                onChange={onChange}
                className={inputBaseClass}
                disabled={disabled}
                required={required}
            >
                <option value="" disabled hidden>{placeholder || "Seleccione una opción"}</option>
                {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </Wrapper>
    );
}

export function Input({
    label,
    type = 'text', // 'text', 'number', 'file', 'checkbox', 'radio'
    name,
    value,
    onChange,
    placeholder,
    disabled = false,
    required = false
}) {

    const params = { label, name };

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
                <Label label={label} name={`${name}-${value}`} />
            </div>
        );
    }

    const Lbl = (type === 'file') ? (
        <label htmlFor={name} className="font-semibold text input-file py-4 text-center inline-flex gap-2 border border-brand border-2 border-dashed text-brand rounded-2">
            📁 Seleccionar archivo
        </label>
    ) : <Label {...params} />;

    return (
        <Wrapper>
            {Lbl}
            <input
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={type !== 'file' ? (value || '') : undefined}
                onChange={onChange}
                className={inputBaseClass}
                disabled={disabled}
                required={required}
            />
        </Wrapper>
    );
}
