// /src/components/Nosotros.jsx
import { EstadoCarga } from '@ui/EstadoCarga';
import { useFetch } from '@hooks/useFetch';
import Image from '@ui/Image';

export function Nosotros() {
    const { datos, error, cargando } = useFetch('/data/nosotros.json');

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando al equipo...">
            <div className="productos grid grid-cols-4 gap-4 py-4">
                {datos?.map(({ id, nombre, email, puesto }) => {
                    return (
                    <div key={id} className="bg-background shadow-md rounded border border-brand overflow-hidden">
                        <span className="block font-bold bg-brand text-brand-foreground py-1 px-2 w-full">{puesto}</span>
                        <div className="p-3 flex justify-center items-center flex-col">
                            <Image
                                id={id}
                                alt={nombre}
                                type="avatar"
                                cx="rounded-6 my-3"
                            />
                            {nombre}
                            <small className="block font-bold text-brand">{email}</small>
                        </div>
                    </div>
                    )
                })}
            </div>
        </EstadoCarga>
    );
}