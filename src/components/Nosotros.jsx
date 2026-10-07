// /src/components/Nosotros.jsx
import { EstadoCarga } from '@ui/EstadoCarga';
import { useAll } from '@hooks/useQuery';
import Image from '@ui/Image';

export function Nosotros() {
    //
    const { datos, error, cargando } = useAll('team', {
        order: ['name', 'asc']
    });

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando al equipo...">
            <div className="container pt-8 pb-4 border-b border-color">
                <p className="font-bold text-center text-lg mb-6">Nuestro Equipo</p>
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {datos?.map(({ avatar, name, email, role }, index) => (
                        <div key={index} className="flex items-center flex-col md:flex-row gap-3 p-4 rounded-lg bg-background">
                            <Image
                                image={avatar}
                                alt={name}
                                type="avatar"
                                size="90"
                                cx="rounded-3 border border-color bg-muted"
                            />
                            <div className="flex flex-col text-center md:text-left">
                                <span className="font-bold text-md">{name}</span>
                                <span className="text-xs text-muted">{role}</span>
                                <a href={`mailto:${email}`} target="_blank" rel="noreferrer" className="text-sm text-brand font-black hover:underline">
                                    {email}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </EstadoCarga>
    );
}