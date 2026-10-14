import { Link } from "react-router";

export function Informacion() {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-bold text-md">Empresa</p>
            <Link className="text-muted hover:underline" to="/politicas">Políticas de Privacidad</Link>
            <div className="text flex flex-col gap-1 mt-1">
                <span className="font-semibold text-foreground text-md">Contacto:</span>
                <span className="text-muted">soporte@devshop.com</span>
            </div>
            <div className="text flex flex-col gap-1 mt-1">
                <span className="font-semibold text-foreground text-md">Sucursales / Sedes:</span>
                <span className="text-muted">Sede Central: Av. Siempre viva 1234, CABA</span>
            </div>
        </div>
    )
}