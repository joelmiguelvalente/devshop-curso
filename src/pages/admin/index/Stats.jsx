// src/pages/admin/index/Stats.jsx
import { useMemo } from 'react';
import {
    ShoppingCartPlus,
    ShoppingCartMinus,
    DollarSign,
    Clock,
    Ban,
    TicketPercent
} from 'lucide-react';

export function Stats({ data }) {
    const [usuarios, productos, cupones] = data;

    const { totalConStock, totalSinStock } = useMemo(() => {
        let conStock = 0;
        let sinStock = 0;
        productos.forEach(producto => {
            if (producto.stock > 0) conStock++;
            else sinStock++;
        });
        return {
            totalConStock: conStock,
            totalSinStock: sinStock
        };
    }, [productos]);

    // --- DATOS HARDCODEADOS POR EL MOMENTO ---
    const totalVentas = "$0";
    const pedidosPendientes = 0;
    const pedidosCancelados = 0;
    const totalUsuarios = usuarios.length;

    const cards = [
        {
            'title': 'Productos',
            'subtitle': 'En stock',
            'icon': <ShoppingCartPlus color="var(--success)" />,
            'number': totalConStock,
            'color': 'success'
        },
        {
            'title': 'Productos',
            'subtitle': 'Sin stock',
            'icon': <ShoppingCartMinus color="var(--error)" />,
            'number': totalSinStock,
            'color': 'error'
        },
        {
            'title': 'Cupones',
            'subtitle': 'Cupones',
            'icon': <TicketPercent color="var(--text)" />,
            'number': cupones.length,
            'color': 'text'
        },
        {
            'title': 'Ventas',
            'subtitle': 'Total neto',
            'icon': <DollarSign color="var(--info)" />,
            'number': totalVentas,
            'color': 'info'
        },
        {
            'title': 'Pedidos',
            'subtitle': 'Pendientes',
            'icon': <Clock color="var(--warning)" />,
            'number': pedidosPendientes,
            'color': 'warning'
        },
        {
            'title': 'Pedidos',
            'subtitle': 'Cancelados',
            'icon': <Ban color="var(--error)" />,
            'number': pedidosCancelados,
            'color': 'error'
        }
    ];

    return (
        <section>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 py-4">
                {cards.map(({ subtitle, icon, number, color }, i) => {
                    return (
                        <div key={i} className={`border rounded-3 py-6 px-4 relative overflow-hidden flex justify-between items-center gap-3 bg-${color} border-${color}`}>
                            <div className="card-left flex justify-start items-center gap-2">
                                {icon} <h2 className="text-xl">{subtitle}</h2>
                            </div>
                            <div className="card-right flex justify-center items-center">
                                <span className="text-xl font-black">{number}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}