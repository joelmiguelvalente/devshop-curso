// En src/Formulario/FormularioContainer.jsx
import { useState } from 'react';
import { FormularioProducto } from '@components/Formulario/FormularioProducto';
import { Alerta } from '@ui/Alerta';
import { addDocument } from '@hooks/useFirebaseDB';
import { useUpload } from '@hooks/useUpload';

const inputDefault = {
    title: '',
    price: 0,
    stock: 0,
    description: '',
    excerpt: '',
    category: '',
    discount: '',
    tags: [],
    outstanding: false
}

export function FormularioContainer() {
    // Inicializamos vacio
    const [datosForm, setDatosForm] = useState(inputDefault);
    const [alert, setAlerta] = useState({ tipo: '', mensaje: '' });
    // Estado de carga
    const [cargando, setCargando] = useState(false);
    // Subida de imagen (loading/error independientes)
    const { uploadImage, cargando: cargandoImagen, error: errorImagen, imagen, limpiar } = useUpload();

    const manejarCambioImagen = async ({ target: { files } }) => {
        const file = files[0];
        if (file) await uploadImage(file);
    };

    // Manejo de cambios
    const manejarCambio = ({
        target: { name, value, type, checked }
    }) => setDatosForm({ ...datosForm, [name]: type === 'checkbox' ? checked : value });

    // Manejo de envio
    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        if (!imagen) {
            setAlerta({
                tipo: 'error',
                mensaje: 'Por favor, selecciona una imagen para el producto.'
            });
            return;
        }
        setCargando(true);

        const tags = datosForm.tags.split(/\s*,\s*/).map(item => {
            return item.toLowerCase().normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")
            .trim();
        });

        try {
            const producto = {
                ...datosForm,
                price: Number(datosForm.price),
                stock: Number(datosForm.stock),
                discount: Number(datosForm.discount) || 0,
                image: imagen,
                rating: { rate: 0, count: 0 },
                tags
            };
            await addDocument('products', producto);
            setAlerta({
                tipo: 'success',
                mensaje: 'Producto guardado correctamente.'
            });
            setDatosForm(inputDefault);
            limpiar();
        } catch (err) {
            console.error("Error en el proceso de envío:", err);
            setAlerta({
                tipo: 'error',
                mensaje: 'Hubo un error al guardar el producto. Por favor, intentá de nuevo.'
            });
        } finally {
            setCargando(false);
        }
    };

    // Lo que le pasaremos al componente "FormularioProducto"
    const valores = {
        cargando,
        cargandoImagen,
        errorImagen,
        imagen,
        datosForm,
        manejarCambio,
        manejarEnvio,
        manejarCambioImagen
    }

    return (
        <>
            {alert.mensaje && (
                <div className="mb-3">
                    <Alerta
                        type={alert.tipo}
                        message={alert.mensaje}
                        onClose={() => setAlerta({ tipo: '', mensaje: '' })}
                    />
                </div>
            )}
            <FormularioProducto {...valores} />
        </>
    );
}
