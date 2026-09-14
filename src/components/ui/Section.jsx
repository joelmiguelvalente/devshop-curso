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
        <section className="section" aria-label={label}>
            <div>
                <h2>{mensaje}</h2>
                {submensaje?.trim() && (
                    <p>{submensaje}</p>
                )}
            </div>

            {enlace?.trim() && (
                <Link to={enlace}>{texto}</Link>
            )}
        </section>
    );
}