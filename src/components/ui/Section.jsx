// src/components/iu/Section.jsx
// Libreria
import { Link } from 'react-router';
// Utilidad
import { cn } from '@utils/Utils';

export function Section({
    label,
    mensaje,
    submensaje,
    accion = { texto: '', enlace: '' }
}) {
    const { texto, enlace } = accion;

    return (
        <section className="section sm:py-4 flex justify-between items-center md:flex-row flex-col" aria-label={label}>
            <div className="text-center md:text-left">
                <h2 className="text-2xl">{mensaje}</h2>
                {submensaje?.trim() && (
                    <p className="text-3 font-italic md:mt-1 my-1">{submensaje}</p>
                )}
            </div>

            {enlace?.trim() && (
                <Link className="bg-brand bg-brand-hover text-brand-foreground inline-block py-1 px-3 rounded-6 font-bold" to={enlace}>{texto}</Link>
            )}
        </section>
    );
}

export function SubSection({ label, linkTo, linkLabel, children, value }) {
    const active = (linkTo !== '' && linkLabel !== '');
    const clase = cn("py-1 border-b border-brand w-full", active && "flex justify-between items-center");

    return (
        <section className={clase} aria-label={label}>
            <span className="text-xl font-bold">{children ?? value ?? label}</span>
            {linkTo && linkLabel && (
                <Link className="font-bold text-brand" to={linkTo}>
                    {linkLabel}
                </Link>
            )}
        </section>
    )
}