// En src/contenedores/FormularioContainer/FormularioContainer.jsx
import { useState } from 'react';
import { FormularioProducto } from '@components/Formulario/FormularioProducto';
import { Alerta } from '@ui/Alerta';

const setearValores = {
    nombre: '',
    precio: 0,
    stock: 0,
    descripcion: '',
    categoria: '',
    descuento: '',
    destacado: false
}

export function FormularioContainer() {
    // Inicializamos vacio
    const [datosForm, setDatosForm] = useState(setearValores);
    const [alert, setAlerta] = useState({ tipo: '', mensaje: '' });
    // Estado de carga
    const [cargando, setCargando] = useState(false);
    // Manejo de imagen
    const [imagenFile, setImagenFile] = useState(null);
    const manejarCambioImagen = (evento) => setImagenFile(evento.target.files[0]);
    // Manejo de cambios
    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({ ...datosForm, [name]: value });
    };

    // Manejo de envio
    const manejarEnvio = async (evento) => {
        evento.preventDefault();
        setCargando(true);
        // Validamos que el usuario haya seleccionado una imagen
        if (!imagenFile) {
            setCargando(false);
            setAlerta({
                tipo: 'error',
                mensaje: 'Por favor, selecciona una imagen para el producto.'
            });
            return;
        }

        // --- Lógica para subir la imagen a Imgbb ---
        const apiKey = import.meta.env.VITE_API_KEY;
        const formData = new FormData();
        formData.append('image', imagenFile);

        try {
            console.log("Subiendo imagen a Imgbb...");
            const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                method: 'POST',
                body: formData,
            });
            const datosImgbb = await respuestaImgbb.json();
            if (datosImgbb.success) {
                setAlerta({
                    tipo: 'success',
                    mensaje: 'Imagen subida con éxito'
                });
                const imgbb = datosImgbb.data;
                console.log("Data de Imgbb:", imgbb);
                // Seteamos los valores
                setDatosForm(setearValores);
                setImagenFile(null);
                // Unimos la URL de la imagen con el resto de los datos del formulario
                const productoCompleto = {
                    ...datosForm,
                    imagen: {
                        'large':     imgbb.image.url,
                        'small':     imgbb.medium.url,
                        'thumbnail': imgbb.thumb.url
                    }
                };
                console.log('Enviando los siguientes datos COMPLETOS a la API:', productoCompleto);
                setAlerta({
                    tipo: 'success',
                    mensaje: 'Formulario enviado correctamente.'
                });
            } else {
                setAlerta({
                    tipo: 'warning',
                    mensaje: 'La subida de la imagen a Imgbb falló.'
                });
                throw new Error('La subida de la imagen a Imgbb falló.');
            }
        } catch (error) {
            console.error("Error en el proceso de envío:", error);
            setAlerta({
                tipo: 'error',
                mensaje: 'Hubo un error al subir la imagen. Por favor, intentá de nuevo.'
            });
        } finally {
            setCargando(false);
        }
    };

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
            <FormularioProducto
                cargando={cargando}
                datosForm={datosForm}
                manejarCambio={manejarCambio}
                manejarEnvio={manejarEnvio}
                manejarCambioImagen={manejarCambioImagen}
            />
        </>
    );
}
