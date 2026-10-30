// src/pages/admin/index/Stats.jsx
// Librerias
import { useMemo } from 'react';
import { ShoppingCartPlus, ShoppingCartMinus, Users, TicketPercent } from 'lucide-react';

export function Stats({ data }) {
    const [usuarios, productos, cupones] = data;

    const { totalConStock, totalSinStock, cuponesActivos } = useMemo(() => {
        let conStock = 0;
        let sinStock = 0;
        productos.forEach(producto => {
            if (producto.stock > 0) conStock++;
            else sinStock++;
        });
        return {
            totalConStock: conStock,
            totalSinStock: sinStock,
            cuponesActivos: cupones.filter(cupon => cupon.isActive).length
        };
    }, [productos, cupones]);

    const cards = [
        {
            'label': 'Productos en stock',
            'icon': <ShoppingCartPlus color="var(--success)" />,
            'number': totalConStock,
            'color': 'success'
        },
        {
            'label': 'Productos sin stock',
            'icon': <ShoppingCartMinus color="var(--error)" />,
            'number': totalSinStock,
            'color': 'error'
        },
        {
            'label': 'Miembros del equipo',
            'icon': <Users color="var(--info)" />,
            'number': usuarios.length,
            'color': 'info'
        },
        {
            'label': 'Cupones activos',
            'icon': <TicketPercent color="var(--warning)" />,
            'number': cuponesActivos,
            'color': 'warning'
        }
    ];

    return (
        <section>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4">
                {cards.map(({ label, icon, number, color }, i) => {
                    return (
                        <div key={i} className="bg-surface border border-color rounded-lg shadow-sm p-4 flex items-center gap-3">
                            <span className={`bg-${color} rounded-lg p-3 flex items-center shrink-0`}>
                                {icon}
                            </span>
                            <div>
                                <p className="text-2xl font-black">{number}</p>
                                <p className="text-xs font-bold text-muted text-uppercase">{label}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
