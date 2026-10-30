// src/components/ui/Form.jsx
export function Legend({ value, children }) {
    return (
        <legend className="font-bold text-2xl text-center block mt-3 mb-6">{value ?? children}</legend>
    )
}

export function Form({ children, onSubmit, className }) {
    let resetClass = (className === '') ? 'w-full my-4 mx-auto' : className;
    return (
        <>
            <form
                className={resetClass}
                onSubmit={onSubmit}
                noValidate
            >
                {children}
            </form>
        </>
    )
}