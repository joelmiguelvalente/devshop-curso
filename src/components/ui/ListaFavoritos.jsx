// /src/components/ui/ListaFavoritos.jsx
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useProductos } from '@hooks/useProductos';
import useFavoritoNavbar from '@hooks/useFavorito';
import Precio from '@ui/Precio';

export const ListaFavoritos = () => {

    const { datos } = useProductos();

    const { favoritos, favoritosContar } = useFavoritoNavbar();
    const [dropdown, setDropdown] = useState(false);

    const setFavoritos = new Set(favoritos);
    const mostrar = datos?.filter(producto => setFavoritos.has(producto.id));

    const dropdownEstado = () => setDropdown(prev => !prev);

    return (
        <div className="relative" aria-live="polite">
            <span onClick={dropdownEstado} className="flex justify-start items-start gap-1" style={{ cursor: 'pointer' }}>
                <Heart className="nv" /> {favoritosContar && <small>({favoritosContar})</small>}
            </span>
            {favoritosContar > 0 && dropdown && (
                <div id="showDropdown" className="dropdown favoritos flex justify-start items-start flex-col overflow-hidden">
                    {mostrar.map((producto) => {
                        const { id, title, price, discount } = producto;
                        return (
                            <div className="dropdown-item p-1 w-full border-color" key={id}>
                                <span className="font-bold block">{title}</span>
                                <div className="small flex justify-between items-center gap-2 flex-row-reverse text-xs">
                                    <Precio price={price} discount={discount} size="sm" />
                                </div>
                            </div>
                        )}
                    )}
                </div>
            )}
        </div>
    )
}