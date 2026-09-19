// src/components/iu/Section.jsx
import { Link } from "react-router";

export function Section({
    label,
    mensaje,
    submensaje,
    accion = { texto: '', enlace: '' }
}) {
    const { texto, enlace } = accion;

    return (
        <section className="section px-2 sm:py-4 md:px-3 flex justify-between items-center md:flex-row flex-col" aria-label={label}>
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