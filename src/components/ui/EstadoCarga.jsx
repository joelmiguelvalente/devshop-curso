// Con esto evito hacer duplicación de bloques
export function EstadoCarga({
    cargando,
    error,
    mensajeCargando = 'Cargando, por favor espere...',
    children
}) {
    if (cargando) {
        return <div className="cargando text-lg text-uppercase text-center py-4">{mensajeCargando}</div>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    return children;
}