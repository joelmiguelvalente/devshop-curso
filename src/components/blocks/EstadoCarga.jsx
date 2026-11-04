// src/components/blocks/EstadoCarga.jsx
export function EstadoCarga({
    cargando,
    mensajeCargando = 'Cargando, por favor espere...'
}) {
    if (cargando) {
        return <div className="cargando text-lg text-uppercase text-center py-4">{mensajeCargando}</div>;
    }
}