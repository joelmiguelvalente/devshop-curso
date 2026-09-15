// /src/components/ui/BtnComprar.jsx
export function BtnComprar({ onClick, disabled = false }) {
    return (
        <button className="al-carrito rounded-2 font-medium text-uppercase text-lg" onClick={onClick} disabled={disabled} type="button">Comprar</button>
    )
}