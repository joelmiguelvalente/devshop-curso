// /src/componentes/List/Nosotros.jsx
import { EstadoCarga } from '@ui/EstadoCarga';
import { useFetch } from '@hooks/useFetch';

export function Nosotros() {
    // De esta forma evito repetir el fetch
    const { datos, error, cargando } = useFetch('/data/nosotros.json');

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando al equipo...">
            <div className="productos grid grid-cols-4 gap-4 py-4">
                {datos?.map(({ id, nombre, email, puesto }) => {
                    return (
                    <div key={id} className="bg-background shadow-md rounded border border-brand overflow-hidden">
                        <span className="block font-bold bg-brand text-brand-foreground py-1 px-2 w-full">{puesto}</span>
                        <div className="p-3 flex justify-center items-center flex-col">
                            <img className="rounded-6 my-3" src={`/images/avatar/avatar${id}.svg`} alt={nombre} width="120" height="120" />
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