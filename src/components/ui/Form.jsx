// src/components/ui/Form.jsx
export function Legend({ value, children }) {
    return (
        <legend className="font-bold text-2xl text-center block mt-3 mb-6">{value ?? children}</legend>
    )
}

export function Form({ children, onSubmit, className }) {
    // Sin className personalizado conserva las medidas por defecto (como antes)
    const custom = !!className;
    return (
        <>
            <form
                className={custom ? className : 'w-full my-4 mx-auto'}
                style={custom ? undefined : { minWidth: '320px', maxWidth: '560px' }}
                onSubmit={onSubmit}
                noValidate
            >
                {children}
            </form>
        </>
    )
}