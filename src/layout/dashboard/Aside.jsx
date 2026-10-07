import { NavLink } from 'react-router';

const Aside = () => {

    const status = ({ isActive }) => {
        const clases = ['menu-link', 'hover:text-brand', 'text', 'font-bold'];
        if(isActive) clases.push('active');
        return clases.join(' ');
    }

    return (
        <div className="bg-background fixed lg:relative min-screen lateral">
            <aside className="p-1 sticky top-0 mt-0">
                <div className="list">
                    <NavLink className={status} to="/admin/" end>Centro</NavLink>
                    <h4 className="list-heading">General</h4>
                    <NavLink className={status} to="/admin/productos">Productos</NavLink>
                    <NavLink className={status} to="/admin/usuarios">Usuarios</NavLink>
                </div>
            </aside>
        </div>
    )
}

export default Aside;