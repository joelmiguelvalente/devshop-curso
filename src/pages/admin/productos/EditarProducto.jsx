// src/pages/admin/productos/EditarProducto.jsx
import { useParams, useNavigate } from 'react-router';
import { useSingle, updateDocument } from '@hooks/useQuery';
import { Formulario } from '@dashboard/productos/Formulario';

export function EditarProducto() {
    const { id } = useParams();
    const { datos } = useSingle('products', id);
    const navigate = useNavigate();

    // Esperamos a que los datos de Firebase estén listos
    if (!datos) {
        return <p>Cargando datos del producto...</p>;
    }

    const actualizar = async (datosRecibidos) => {
        await updateDocument('products', id, datosRecibidos);
        console.log(id, datosRecibidos)
        // Redirección después de editar
        setTimeout(() => navigate('/admin/productos'), 2000);
    };

    return (
        <Formulario
            key={id}
            datosIniciales={datos}
            titulo="Formulario para editar al producto"
            etiquetaBoton="Guardar Cambios"
            alEnviar={actualizar}
        />
    );
}