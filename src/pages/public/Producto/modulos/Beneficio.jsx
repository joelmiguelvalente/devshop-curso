// src/pages/public/Producto/modulos/Beneficio.jsx
export const Beneficio = ({ icon, title, children }) => (
    <div className="flex items-center gap-3">
        <span className="text-brand shrink-0">{icon}</span>
        <div>
            <p className="text-sm font-bold">{title}</p>
            <p className="text-sm text-muted">{children}</p>
        </div>
    </div>
);