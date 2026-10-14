// src/pages/admin/index/Welcome.jsx
import { SubSection } from '@ui/Section';
import { EstadoCarga } from '@ui/EstadoCarga';
import { useFirestoreQuery } from '@hooks/useFirestore';
import { Stats } from './Stats';
import { LastOrders } from './LastOrders';

export function Welcome() {
    // Custom Hooks
    const { data: usuarios  = [] } = useFirestoreQuery('team');
    const { data: productos = [], loading: cargando, error } = useFirestoreQuery('products');
    const { data: cupones   = [] } = useFirestoreQuery('coupons');

    return (
        <>
            <SubSection label="Bienvenida">
                Bienvenido @usuario!
            </SubSection>
            <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando estadísticas...">
                <Stats data={[usuarios, productos, cupones]} />
                <LastOrders />
            </EstadoCarga>
        </>
    );
}