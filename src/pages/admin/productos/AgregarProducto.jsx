// src/pages/admin/productos/AgregarProducto.jsx
import { useNavigate } from 'react-router';
import { addDocument } from '@hooks/useQuery';
import { Formulario } from '@dashboard/productos/Formulario';
import { useProductos } from '@hooks/useProductos';

export function AgregarProducto() {
    const navigate = useNavigate();
    const { recargar } = useProductos();

    const guardarNuevoProducto = async (datosRecibidos) => {
        await addDocument('products', datosRecibidos);
        console.log(datosRecibidos);
        await recargar();
        // Redirección después de crear
        setTimeout(() => navigate('/admin/productos'), 2000);
    };

    return (
        <Formulario
            titulo="Formulario para agregar producto"
            etiquetaBoton="Crear Producto"
            alEnviar={guardarNuevoProducto}
        />
    );
}
