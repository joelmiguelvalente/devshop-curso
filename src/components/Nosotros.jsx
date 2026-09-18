// /src/components/Nosotros.jsx
import { EstadoCarga } from '@ui/EstadoCarga';
import { useFetch } from '@hooks/useFetch';
import Image from '@ui/Image';

export function Nosotros() {
    const { datos, error, cargando } = useFetch('/data/nosotros.json');

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando al equipo...">
            <div className="container pt-8 pb-4 border-b border-color">
                <p className="font-bold text-center text-lg mb-6">Nuestro Equipo</p>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {datos?.map(({ id, nombre, email, rol }, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 border border-color rounded-lg bg-background shadow-sm">
                            <Image
                                id={id}
                                alt={nombre}
                                type="avatar"
                                cx="rounded-full border border-color bg-muted"
                            />
                            <div className="flex flex-col">
                                <span className="font-bold text-sm">{nombre}</span>
                                <span className="text-xs text-muted mb-1">{rol}</span>
                                <a href={`mailto:${email}`} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">
                                    {email} →
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </EstadoCarga>
    );
}