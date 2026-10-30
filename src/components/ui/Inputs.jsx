// src/components/ui/Inputs.jsx
import { forwardRef } from 'react';

const inputBaseClass = "p-1 border rounded-2 w-full text-base focus-ring shrink-1";
const Wrapper = ({ children }) => <div className="flex flex-col gap-2 mb-3 pr-2 pl-2">{children}</div>;

function Label({ label, name }) {
    if(label !== '') {
        return <label htmlFor={name} className="font-semibold text">{label}</label>;
    }
    return;
}

function ErrorMessage({ name, error }) {
    if (!error) return null;
    return <p id={`${name}-error`} className="text-sm text-error">{error}</p>;
}

export const Textarea = forwardRef(function Textarea({
    label,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    disabled = false,
    required = false,
    error
}, ref) {
    const controlled = value !== undefined;
    return (
        <Wrapper>
            <Label label={label} name={name} />
            <textarea
                ref={ref}
                name={name}
                id={name}
                placeholder={placeholder}
                value={controlled ? (value || '') : undefined}
                onChange={onChange}
                onBlur={onBlur}
                className={`${inputBaseClass} ${error ? 'border-error' : ''}`}
                disabled={disabled}
                required={required}
                aria-required={required}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
            />
            <ErrorMessage name={name} error={error} />
        </Wrapper>
    );
});

export const Select = forwardRef(function Select({
    label,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    disabled = false,
    options = [],
    required = false,
    error
}, ref) {
    const controlled = value !== undefined;
    return (
        <Wrapper>
            <Label label={label} name={name} />
            <select
                ref={ref}
                name={name}
                id={name}
                value={controlled ? (value || '') : undefined}
                onChange={onChange}
                onBlur={onBlur}
                className={`${inputBaseClass} ${error ? 'border-error' : ''}`}
                disabled={disabled}
                required={required}
                aria-required={required}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
            >
                <option value="" disabled hidden>{placeholder || "Seleccione una opción"}</option>
                {options.map((opt) => <option key={opt.value ?? opt.slug} value={opt.value ?? opt.slug}>{opt.label ?? opt.name}</option>)}
            </select>
            <ErrorMessage name={name} error={error} />
        </Wrapper>
    );
});

export const Input = forwardRef(function Input({
    label,
    type = 'text', // 'text', 'number', 'file', 'checkbox', 'radio'
    name,
    value,
    onChange,
    onBlur,
    placeholder,
    autoComplete,
    disabled = false,
    readOnly = false,
    required = false,
    error
}, ref) {

    const params = { label, name };
    const controlled = value !== undefined;

    const getAutocompleteValue = (name) => {
        const lower = name.toLowerCase();
        if (lower.includes('email')) return 'email';
        if (lower.includes('name') || lower.includes('nombre')) return 'name';
        if (lower.includes('phone') || lower.includes('tel')) return 'tel';
        if (lower.includes('zip') || lower.includes('postal')) return 'postal-code';
        return 'off';
    };

    if (type === 'checkbox' || type === 'radio') {
        const uniqueId = `${name}${value !== undefined ? `-${value}` : ''}`;
        return (
            <div className="flex items-center gap-2 mb-3 pr-2 pl-2">
                <input
                    ref={ref}
                    type={type}
                    name={name}
                    id={uniqueId}
                    value={value || ''}
                    checked={controlled && type === 'checkbox' ? !!value : undefined}
                    onChange={onChange}
                    onBlur={onBlur}
                    disabled={disabled}
                    className="focus-ring shrink-0"
                    style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--brand)' }}
                    required={required}
                    aria-required={required}
                    aria-invalid={!!error}
                />
                <Label label={label} name={uniqueId} />
                <ErrorMessage name={name} error={error} />
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
                ref={ref}
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={type === 'file' || !controlled ? undefined : (value || '')}
                onChange={onChange}
                onBlur={onBlur}
                className={`${inputBaseClass} ${error ? 'border-error' : ''}`}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                aria-required={required}
                autoComplete={autoComplete ?? getAutocompleteValue(name)}
            />
            <ErrorMessage name={name} error={error} />
        </Wrapper>
    );
});
