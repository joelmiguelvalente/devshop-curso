// src/pages/admin/index/Welcome.jsx
import { COLECCION } from '@constants/collections';
import { SubSection } from '@ui/Section';
import { EstadoCarga } from '@blocks/EstadoCarga';
import { useFirestoreQuery } from '@hooks/useFirestore';
import { Stats } from './Stats';
import { StockBajo } from './StockBajo';
import { TopRating } from './TopRating';
import { CuponesPorVencer } from './CuponesPorVencer';
import { PorCategoria } from './PorCategoria';
import { LastOrders } from './LastOrders';

export function Welcome() {
    // Custom Hooks
    const { data: usuarios  = [] } = useFirestoreQuery(COLECCION.usuarios);
    const { data: productos = [], loading: cargando, error } = useFirestoreQuery(COLECCION.productos);
    const { data: cupones   = [] } = useFirestoreQuery(COLECCION.cupones);

    const hoy = new Date().toLocaleDateString('es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    });

    return (
        <>
            <SubSection label="Panel de control">
                Panel de control
            </SubSection>
            <p className="text-sm text-muted mt-2 mb-4">{hoy}</p>
            <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando estadísticas...">
                <Stats data={[usuarios, productos, cupones]} />
                <div className="grid gap-4 lg:grid-cols-2">
                    <StockBajo productos={productos} />
                    <TopRating productos={productos} />
                </div>
                <div className="grid gap-4 lg:grid-cols-2 mt-4">
                    <CuponesPorVencer cupones={cupones} />
                    <PorCategoria productos={productos} />
                </div>
                <LastOrders />
            </EstadoCarga>
        </>
    );
}
