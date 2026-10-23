// src/components/ui/Form.jsx
export function Legend({ value, children }) {
    return (
        <legend className="font-bold text-2xl text-center block mt-3 mb-6">{value ?? children}</legend>
    )
}

export function Form({ children, onSubmit }) {
    return (
        <>
            <form
                className="w-full my-4 mx-auto"
                style={{ minWidth: '320px', maxWidth: '560px' }}
                onSubmit={onSubmit}
                noValidate
            >
                {children}
            </form>
        </>
    )
}