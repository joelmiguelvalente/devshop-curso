// src/components/ui/Inputs.jsx
const inputBaseClass = "p-1 border rounded-2 w-full text-base focus-ring shrink-1";

const Wrapper = ({ children }) => <div className="flex flex-col gap-2 mb-3 pr-2 pl-2">{children}</div>;

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
                aria-required={required}
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
                aria-required={required}
            >
                <option value="" disabled hidden>{placeholder || "Seleccione una opción"}</option>
                {options.map((opt) => <option key={opt.value ?? opt.slug} value={opt.value ?? opt.slug}>{opt.label ?? opt.name}</option>)}
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
    required = false,
    error
}) {

    const params = { label, name };

    const getAutocompleteValue = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('email')) return 'email';
        if (lower.includes('name') || lower.includes('nombre')) return 'name';
        if (lower.includes('phone') || lower.includes('tel')) return 'tel';
        if (lower.includes('zip') || lower.includes('postal')) return 'postal-code';
        return 'off';
    };

    if (type === 'checkbox' || type === 'radio') {
        const uniqueId = `${name}-${value}`;
        return (
            <div className="flex items-center gap-2 mb-3 pr-2 pl-2">
                <input
                    type={type}
                    name={name}
                    id={uniqueId}
                    value={value || ''}
                    checked={type === 'checkbox' ? !!value : undefined}
                    onChange={onChange}
                    disabled={disabled}
                    className="focus-ring shrink-0"
                    style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--brand)' }}
                    required={required}
                    aria-required={required}
                    aria-invalid={!!error}
                />
                <Label label={label} name={uniqueId} />
                {error && <p className="text-sm text-error">{error}</p>}
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
                className={`${inputBaseClass} ${error ? 'border-error' : ''}`}
                disabled={disabled}
                required={required}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                aria-required={required}
                autoComplete={getAutocompleteValue(name)}
            />
            {error && <p id={`${name}-error`} className="text-sm text-error">{error}</p>}
        </Wrapper>
    );
}
