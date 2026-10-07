// src/pages/public/Politicas.jsx
export const Politicas = () => {

    return (
        <main className="container max-w-4xl py-12 animate-fade-in">
            <h1 className="text-3xl font-bold mb-2">Políticas de Privacidad</h1>
            <p className="text-sm text-muted mb-8">Última actualización: Septiembre 2026</p>

            <div className="flex flex-col gap-6 text-foreground/90 leading-relaxed">
                <section className="bg-surface p-6 rounded-lg border border-color">
                    <h2 className="text-xl font-semibold mb-3">1. Información General</h2>
                    <p className="text-sm text-muted">
                        En <strong className="font-semibold text-foreground">DevShop</strong>, valoramos y respetamos tu privacidad. Esta política detalla cómo recopilamos, usamos y protegemos tus datos personales cuando visitas nuestra tienda de demostración educativa.
                    </p>
                </section>

                <section className="bg-surface p-6 rounded-lg border border-color">
                    <h2 className="text-xl font-semibold mb-3">2. Datos Recopilados</h2>
                    <p className="text-sm text-muted mb-2">
                        Al tratarse de un entorno de pruebas académicas, no recopilamos información financiera real. Sin embargo, el sitio puede procesar:
                    </p>
                    <ul className="list-disc list-inside text-sm text-muted flex flex-col gap-1 pl-2">
                        <li>Información de contacto simulada (como tu correo en el formulario de newsletter).</li>
                        <li>Datos de navegación esenciales para el correcto funcionamiento del catálogo de productos.</li>
                        <li>Preferencias locales de almacenamiento (como los artículos guardados temporalmente en el carrito).</li>
                    </ul>
                </section>

                <section className="bg-surface p-6 rounded-lg border border-color">
                    <h2 className="text-xl font-semibold mb-3">3. Uso de la Información</h2>
                    <p className="text-sm text-muted">
                        Los datos ingresados en esta plataforma se utilizan exclusivamente con fines de desarrollo, optimización de la experiencia de usuario y validación del proyecto para el curso de React. Bajo ninguna circunstancia comercializamos ni distribuimos tus datos a terceros.
                    </p>
                </section>

                <section className="bg-surface p-6 rounded-lg border border-color">
                    <h2 className="text-xl font-semibold mb-3">4. Seguridad de los Datos</h2>
                    <p className="text-sm text-muted">
                        Implementamos medidas técnicas y organizativas estándar para proteger la información contra accesos no autorizados, pérdidas o alteraciones accidentales mediante la infraestructura segura provista por Vercel.
                    </p>
                </section>

                <section className="bg-surface p-6 rounded-lg border border-color">
                    <h2 className="text-xl font-semibold mb-3">5. Contacto</h2>
                    <p className="text-sm text-muted">
                        Si tienes dudas o consultas sobre estas políticas de privacidad académicas, puedes comunicarte con nuestro equipo de soporte simulado escribiendo a <span className="text-primary underline">soporte@devshop.com</span>.
                    </p>
                </section>
            </div>
        </main>
    );
};
