// src/pages/profile/modulos/PerfilCupones.jsx
import { useState } from 'react';
// Constante
import { COLECCION } from '@constants/collections';
// Componentes
import { Empty } from '@blocks/Empty';
import { EstadoCarga } from '@blocks/EstadoCarga';
// Hooks
import { useFirestoreQuery } from '@hooks/useFirestore';
// Utilidad
import { getCouponStatus } from '@utils/Utils';

const toTime = (valor) => valor?.toDate ? valor.toDate().getTime() : new Date(valor).getTime();

// El importe se muestra segun el tipo de descuento
const mostrarDescuento = ({ discountType, discountValue }) =>
    discountType === 'percentage' ? `-${discountValue}%` : `$${discountValue}`;

export function PerfilCupones() {

    const { data: cupones, loading, error } = useFirestoreQuery(COLECCION.cupones, {
        order: ['expirationDate', 'asc']
    });
    // Se calcula una sola vez al montar (evita impureza en el render)
    const [ahora] = useState(() => Date.now());

    if (loading) return <EstadoCarga cargando={loading} mensajeCargando="Cargando cupones..." />;
    if (error) return <Empty tipo="error" />;

    const vigentes = (cupones ?? []).filter(cupon =>
        cupon.isActive &&
        ahora >= toTime(cupon.startDate) &&
        ahora <= toTime(cupon.expirationDate)
    );

    if (vigentes.length === 0) {
        return <Empty heading="No hay cupones vigentes" content="Cuando haya descuentos activos vas a encontrarlos acá." />;
    }

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
            {vigentes.map(cupon => (
                <article key={cupon.id} className="bg-surface border border-color rounded-lg p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-2">
                        <span className="badge badge-info font-bold">{cupon.code}</span>
                        <span className="text-brand font-black text-lg">{mostrarDescuento(cupon)}</span>
                    </div>
                    <h3 className="text-lg font-bold">{cupon.title}</h3>
                    <p className="text-sm text-muted">{cupon.description}</p>
                    <p className="text-xs text-muted mt-auto">
                        {getCouponStatus(cupon.startDate, cupon.expirationDate)}
                    </p>
                </article>
            ))}
        </div>
    );
}
