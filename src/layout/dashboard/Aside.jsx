// src/layout/dashboard/Aside.jsx
import { NavLink } from 'react-router';
// Libreria
import { LayoutDashboard, BadgeDollarSign, Package, Users, Tag, TicketPercent } from 'lucide-react';

const link = ({ isActive }) => {
    const clases = ['menu-link', 'hover:text-brand', 'text', 'font-bold', 'shrink-0'];
    if (isActive) clases.push('active');
    return clases.join(' ');
};

const Item = ({ to, end, icon, children }) => (
    <NavLink className={link} to={to} end={end}>
        <span className="flex items-center gap-2">{icon}{children}</span>
    </NavLink>
);

const Menu = [
    { Slug: 'categorias', Label: 'Categorias', Icono: Tag },
    { Slug: 'cupones', Label: 'Cupones', Icono: TicketPercent },
    { Slug: 'productos', Label: 'Productos', Icono: Package },
    { Slug: 'usuarios', Label: 'Usuarios', Icono: Users }
];

const Aside = () => {

    return (
        <div className="lateral">
            <aside className="lg:sticky lg:top-10 lg:mt-0 bg-surface border border-color rounded-lg p-3">
                <div className="list flex flex-row lg:flex-col gap-2 overflow-auto">
                    <h4 className="list-heading none lg:block">Principal</h4>
                    <Item to="/admin/" end icon={<LayoutDashboard size={18} aria-hidden="true" />}>Centro</Item>
                    <Item to="/admin/#ventas" end icon={<BadgeDollarSign size={18} aria-hidden="true" />}>Ventas</Item>
                    <h4 className="list-heading none lg:block">General</h4>
                    {Menu.map(
                        ({ Slug, Label, Icono }) => <Item key={Slug} to={`/admin/${Slug}`}><Icono size={18} aria-hidden="true" /> {Label}</Item>
                    )}
                </div>
            </aside>
        </div>
    )
}

export default Aside;
