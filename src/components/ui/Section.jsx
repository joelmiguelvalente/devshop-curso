export function Section({ label, mensaje, submensaje, ctaLink, ctaText }) {

    return (
        <section className="section" aria-label={label}>
            <div>
                <h2>{mensaje}</h2>
                {submensaje?.trim() && (
                    <p>{submensaje}</p>
                )}
            </div>

            {ctaLink?.trim() && (
                <a href={ctaLink}>{ctaText}</a>
            )}
        </section>
    );
}