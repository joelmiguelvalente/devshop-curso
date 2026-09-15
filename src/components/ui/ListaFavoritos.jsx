// /src/components/ui/ListaFavoritos.jsx
import { useState } from 'react';
import { useFetch } from '@hooks/useFetch';
import useNavbarFavoritos from '@hooks/useNavbarFavoritos';
import Precio from '@ui/Precio';

export const ListaFavoritos = () => {

    const { datos: todosProductos } = useFetch('/data/productos.json');

    const { favoritos, favoritosContar } = useNavbarFavoritos();
    const [dropdownAbierto, setDropdownAbierto] = useState(false);

    const setFavoritos = new Set(favoritos);
    const mostrar = todosProductos?.filter(producto => setFavoritos.has(producto.id));
    console.log(mostrar)
    const dropdownEstado = () => setDropdownAbierto(prev => !prev);

    return (
        <div className="cart-status relative" aria-live="polite">
            <span onClick={dropdownEstado} style={{ cursor: 'pointer' }}>
                ❤️
                <strong>{favoritosContar}</strong>
            </span>
            {favoritosContar > 0 && dropdownAbierto && (
                <div id="showDropdown" className="dropdown favoritos flex justify-start items-start flex-col overflow-hidden">
                    {mostrar.map((producto) => {
                        const { id, title, price, discount } = producto;
                        return (
                            <div className="dropdown-item p-1 w-full border-color" key={id}>
                                <span className="font-bold block">{title}</span>
                                <div className="small flex justify-between items-center gap-2 flex-row-reverse text-xs">
                                    <Precio precio={price} descuento={discount} />
                                </div>
                            </div>
                        )}
                    )}
                </div>
            )}
        </div>
    )
}