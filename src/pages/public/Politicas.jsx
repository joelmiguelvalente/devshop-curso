// src/pages/public/Politicas.jsx
import { Link } from "react-router";
import { Calendar, CircleCheck, Lock, ShieldCheck, Server, Mail } from 'lucide-react';

const TocItem = ({ n, href, children }) => (
    <a href={href} className="flex items-center gap-2 text-brand font-medium">
        <span className="font-bold">{n}.</span> {children}
    </a>
);

const SectionTitle = ({ n, children }) => (
    <h2 className="flex items-center gap-3 text-xl font-bold mb-4">
        <span
            className="bg-brand text-brand-foreground rounded-full font-bold flex items-center justify-center shrink-0"
            style={{ width: '2rem', height: '2rem' }}
        >
            {n}
        </span>
        {children}
    </h2>
);

const CheckItem = ({ children }) => (
    <li className="flex items-start gap-2">
        <CircleCheck size={18} className="text-success shrink-0" style={{ marginTop: '0.2rem' }} />
        <span>{children}</span>
    </li>
);

const SecurityCard = ({ icon, title, children }) => (
    <div className="bg-background border border-color rounded-2 p-4 flex flex-col gap-2">
        <span className="text-brand">{icon}</span>
        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-sm text-muted">{children}</p>
    </div>
);

export const Politicas = () => {

    return (
        <main className="container py-8">
            <span className="badge badge-info">Documento legal</span>
            <h1 className="text-3xl font-bold mt-3">Política de Privacidad</h1>
            <p className="flex items-center gap-2 text-sm text-muted mt-2 mb-4">
                <Calendar size={16} />
                Última actualización: 14 de octubre de 2026 · Versión 2.1
            </p>

            <div className="flex flex-col gap-4">
                <section className="bg-surface border border-color rounded-lg p-6">
                    <p className="text text-lg">
                        En <strong>DevShop S.R.L.</strong> la privacidad de nuestros clientes es una
                        prioridad. Esta política describe qué datos personales recopilamos, con qué
                        finalidad los tratamos, cómo los protegemos y qué derechos te asisten conforme
                        a la Ley N.º 25.326 de Protección de Datos Personales de la República Argentina.
                    </p>
                    <div className="grid gap-3 md:grid-cols-3 mt-4">
                        <div className="bg-background border border-color rounded-2 p-4">
                            <p className="text-sm text-muted">Responsable</p>
                            <p className="font-bold">DevShop S.R.L.</p>
                        </div>
                        <div className="bg-background border border-color rounded-2 p-4">
                            <p className="text-sm text-muted">Contacto de privacidad</p>
                            <p className="font-bold">privacidad@devshop.com</p>
                        </div>
                        <div className="bg-background border border-color rounded-2 p-4">
                            <p className="text-sm text-muted">Jurisdicción</p>
                            <p className="font-bold">CABA, Argentina</p>
                        </div>
                    </div>
                </section>

                <nav className="bg-surface border border-color rounded-lg p-6" aria-label="Índice del documento">
                    <p className="text-sm font-bold text-uppercase text-muted mb-3">Contenido</p>
                    <div className="grid gap-2 md:grid-cols-2">
                        <TocItem n="1" href="#objeto">Objeto y ámbito de aplicación</TocItem>
                        <TocItem n="2" href="#datos">Datos que recopilamos</TocItem>
                        <TocItem n="3" href="#finalidad">Finalidad del tratamiento</TocItem>
                        <TocItem n="4" href="#cookies">Cookies y almacenamiento local</TocItem>
                        <TocItem n="5" href="#seguridad">Seguridad de la información</TocItem>
                        <TocItem n="6" href="#derechos">Tus derechos</TocItem>
                        <TocItem n="7" href="#conservacion">Conservación y supresión</TocItem>
                        <TocItem n="8" href="#contacto">Contacto</TocItem>
                    </div>
                </nav>

                <section id="objeto" className="bg-surface border border-color rounded-lg p-6">
                    <SectionTitle n="1">Objeto y ámbito de aplicación</SectionTitle>
                    <p className="text-muted">
                        Esta política se aplica a todos los datos personales tratados a través de nuestro
                        sitio web, aplicaciones y canales de atención: navegación por el catálogo, creación
                        de cuentas, gestión de pedidos, suscripción al boletín de novedades y comunicaciones
                        con nuestro equipo de soporte.
                    </p>
                </section>

                <section id="datos" className="bg-surface border border-color rounded-lg p-6">
                    <SectionTitle n="2">Datos que recopilamos</SectionTitle>
                    <p className="text-muted mb-3">
                        Solo solicitamos los datos estrictamente necesarios para brindarte el servicio:
                    </p>
                    <div className="overflow-auto">
                        <table className="table">
                            <thead className="table-heading">
                                <tr><th>Categoría</th><th>Ejemplos</th><th>Finalidad</th></tr>
                            </thead>
                            <tbody>
                                <tr className="table-strip">
                                    <td className="table-item font-bold" data-label="Categoría">Identificación</td>
                                    <td className="table-item" data-label="Ejemplos">Nombre, apellido, DNI</td>
                                    <td className="table-item" data-label="Finalidad">Facturación y entrega de pedidos</td>
                                </tr>
                                <tr className="table-strip">
                                    <td className="table-item font-bold" data-label="Categoría">Contacto</td>
                                    <td className="table-item" data-label="Ejemplos">Correo electrónico, teléfono, domicilio</td>
                                    <td className="table-item" data-label="Finalidad">Comunicaciones y notificaciones del pedido</td>
                                </tr>
                                <tr className="table-strip">
                                    <td className="table-item font-bold" data-label="Categoría">Transaccionales</td>
                                    <td className="table-item" data-label="Ejemplos">Historial de compras y pagos</td>
                                    <td className="table-item" data-label="Finalidad">Gestión comercial y garantía</td>
                                </tr>
                                <tr className="table-strip">
                                    <td className="table-item font-bold" data-label="Categoría">Navegación</td>
                                    <td className="table-item" data-label="Ejemplos">Preferencias, carrito y favoritos</td>
                                    <td className="table-item" data-label="Finalidad">Funcionamiento del sitio</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>

                <section id="finalidad" className="bg-surface border border-color rounded-lg p-6">
                    <SectionTitle n="3">Finalidad del tratamiento</SectionTitle>
                    <ul className="flex flex-col gap-2 text-muted">
                        <CheckItem>Procesar tus pedidos, coordinar envíos y gestionar devoluciones o garantías.</CheckItem>
                        <CheckItem>Enviarte comunicaciones operativas: confirmaciones, estados de envío y facturas.</CheckItem>
                        <CheckItem>Remitirte novedades y promociones, únicamente si otorgaste tu consentimiento previo.</CheckItem>
                        <CheckItem>Mejorar nuestro catálogo y tu experiencia de compra a partir de estadísticas agregadas y anónimas.</CheckItem>
                        <CheckItem>Cumplir con nuestras obligaciones fiscales y legales vigentes.</CheckItem>
                    </ul>
                </section>

                <section id="cookies" className="bg-surface border border-color rounded-lg p-6">
                    <SectionTitle n="4">Cookies y almacenamiento local</SectionTitle>
                    <p className="text-muted mb-3">
                        Utilizamos almacenamiento local del navegador para que el sitio funcione correctamente,
                        sin recurrir a cookies de rastreo de terceros:
                    </p>
                    <ul className="flex flex-col gap-2 text-muted">
                        <CheckItem><span><span className="badge badge-surface">carrito</span> conserva los productos que agregás a tu compra.</span></CheckItem>
                        <CheckItem><span><span className="badge badge-surface">favoritos</span> recuerda los artículos que marcaste.</span></CheckItem>
                        <CheckItem><span><span className="badge badge-surface">tema</span> guarda tu preferencia de modo claro u oscuro.</span></CheckItem>
                    </ul>
                    <p className="text-muted mt-3">
                        Podés borrar estos datos en cualquier momento desde la configuración de tu navegador;
                        al hacerlo, el carrito y las preferencias guardadas se restablecerán.
                    </p>
                </section>

                <section id="seguridad" className="bg-surface border border-color rounded-lg p-6">
                    <SectionTitle n="5">Seguridad de la información</SectionTitle>
                    <p className="text-muted mb-3">
                        Aplicamos medidas técnicas y organizativas razonables para proteger tus datos contra
                        el acceso no autorizado, la pérdida o la alteración:
                    </p>
                    <div className="grid gap-3 md:grid-cols-3">
                        <SecurityCard icon={<Lock size={22} />} title="Cifrado en tránsito">
                            Todas las comunicaciones viajan bajo TLS. Nunca te pediremos claves ni datos de tarjetas por correo o mensajería.
                        </SecurityCard>
                        <SecurityCard icon={<ShieldCheck size={22} />} title="Acceso restringido">
                            Solo el personal autorizado accede a los datos personales, bajo acuerdos de confidencialidad y registros de auditoría.
                        </SecurityCard>
                        <SecurityCard icon={<Server size={22} />} title="Respaldo y monitoreo">
                            Infraestructura con copias de seguridad periódicas y monitoreo continuo de disponibilidad e intrusiones.
                        </SecurityCard>
                    </div>
                </section>

                <section id="derechos" className="bg-surface border border-color rounded-lg p-6">
                    <SectionTitle n="6">Tus derechos</SectionTitle>
                    <p className="text-muted mb-3">
                        Podés ejercer tus derechos de <strong>acceso, rectificación, actualización y supresión</strong> de
                        tus datos personales, así como retirar tu consentimiento para comunicaciones promocionales,
                        escribiendo a <span className="text-brand font-semibold">privacidad@devshop.com</span>.
                        Respondemos todas las solicitudes dentro de los <strong>15 días hábiles</strong>.
                    </p>
                    <p className="text-muted">
                        También tenés derecho a recurrir ante la Agencia de Acceso a la Información Pública,
                        órgano de control de la Ley N.º 25.326, si considerás que tu solicitud no fue atendida
                        adecuadamente.
                    </p>
                </section>

                <section id="conservacion" className="bg-surface border border-color rounded-lg p-6">
                    <SectionTitle n="7">Conservación y supresión</SectionTitle>
                    <p className="text-muted">
                        Conservamos tus datos únicamente durante el tiempo necesario para las finalidades descritas:
                        los datos de cuenta mientras mantengas tu registro, los transaccionales por los plazos
                        exigidos por la normativa fiscal (10 años) y los de navegación hasta que los elimines de
                        tu navegador. Vencidos esos plazos, los datos se suprimen o anonimizan de forma segura.
                    </p>
                </section>

                <section id="contacto" className="bg-surface rounded-lg p-6">
                    <h2 className="flex items-center gap-3 text-xl font-bold mb-3">
                        <Mail size={22} />
                        8. Contacto
                    </h2>
                    <p className="mb-3">
                        Si tenés dudas sobre esta política o querés ejercer tus derechos, escribinos a:
                    </p>
                    <p className="text-xl font-bold">
                        <span className="text-decoration-underline">privacidad@devshop.com</span>
                    </p>
                    <p className="text-sm mt-3" style={{ opacity: '0.85' }}>
                        DevShop S.R.L. · CUIT 30-12345678-9 · Av. Corrientes 1234, CABA, Argentina
                    </p>
                </section>

                <div className="flex justify-center">
                    <Link className="btn btn-brand btn-md" to="/">Volver al inicio</Link>
                </div>
            </div>
        </main>
    );
};
