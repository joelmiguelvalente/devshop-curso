import { ShoppingCartPlus, ShoppingCartMinus } from 'lucide-react';
import { SubSection } from '@ui/Section';
import { CardDashboard } from '@ui/CardDashboard';
import { useCount } from '@hooks/useQuery';

export function Welcome() {

    const { datos: totalConStock } = useCount('products', {
        filters: [['stock', '>', 0]]
    });
    const { datos: totalSinStock } = useCount('products', {
        filters: [['stock', '==', 0]]
    });

    return (
        <>
            <SubSection label="Bienvenida">
                Bienvenido @usuario!
            </SubSection>
            <section>
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-4">
                    <CardDashboard cx="flex justify-between items-center gap-3 border-success">
                        <ShoppingCartPlus  className="absolute nz-1 opacity-1" size={110} style={{ right: '1rem', color: 'var(--success)' }} />
                        <div className="card-left">
                            <h2 className="text-2xl">Productos</h2>
                            <p>En stock</p>
                        </div>
                        <div className="card-right flex justify-center items-center">
                            <span className="text-3xl font-black">{totalConStock}</span>
                        </div>
                    </CardDashboard>
                    <CardDashboard cx="flex justify-between items-center gap-3 border-error">
                        <ShoppingCartMinus className="absolute nz-1 opacity-1" size={110} style={{ right: '1rem', color: 'var(--error)' }} />
                        <div className="card-left">
                            <h2 className="text-2xl">Productos</h2>
                            <p>Sin stock</p>
                        </div>
                        <div className="card-right flex justify-center items-center">
                            <span className="text-3xl font-black">{totalSinStock}</span>
                        </div>
                    </CardDashboard>
                </div>
            </section>
        </>
    );
}