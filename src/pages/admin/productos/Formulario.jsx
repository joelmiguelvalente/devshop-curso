// src/pages/admin/productos/Formulario.jsx
import { useState } from 'react';
import Image from '@ui/Image';
import { Alerta } from '@ui/Alerta';
import { Button } from '@ui/Button';
import { Form, Legend } from '@ui/Form';
import { Input, Textarea, Select } from '@ui/Inputs';
import { SubSection } from '@ui/Section';
import { useUpload } from '@hooks/useUpload';
import { useAll } from '@hooks/useQuery';
import { validarInputsProductos } from '@utils/Validate';

const formDefault = {
    title: '',
    price: 0,
    stock: 0,
    description: '',
    excerpt: '',
    category: '',
    discount: '',
    tags: '',
    outstanding: false,
    image: null
};

const normalizarDatos = (datos) => ({
    ...datos,
    // Si tags es un array (viene de la BD), lo transformamos a string para el input
    tags: Array.isArray(datos?.tags) ? datos.tags.join(', ') : datos?.tags || ''
});

export function Formulario({ datosIniciales = formDefault, titulo, etiquetaBoton, alEnviar }) {

    const { datos: categorias } = useAll('categories', {
        order: ['name', 'asc']
    });

    // Se inicializa una sola vez al montar. Al navegar entre ids el padre
    // fuerza remontaje con key={id}, así no hace falta ningún useEffect
    // de sincronización (evita set-state-in-effect y deps por identidad).
    const [datosForm, setDatosForm] = useState(() => normalizarDatos(datosIniciales));
    const [errores, setErrores] = useState({});
    const [alert, setAlerta] = useState({ tipo: '', mensaje: '' });
    const [cargando, setCargando] = useState(false);

    const { uploadImage, cargando: cargandoImagen, error: errorImagen, limpiar } = useUpload();

    const manejarCambioImagen = async ({ target: { files } }) => {
        const file = files[0];
        if (!file) return;
        // uploadImage ya retorna la URL: actualizamos directo, sin efecto puente
        const url = await uploadImage(file);
        if (url) setDatosForm(prev => ({ ...prev, image: url }));
    };

    const manejarCambio = ({ target: { name, value, type, checked } }) => {
        setDatosForm({ ...datosForm, [name]: type === 'checkbox' ? checked : value });
    };

    const e = validarInputsProductos(datosForm);

    const manejarEnvioLocal = async (evento) => {
        evento.preventDefault();

        if (!datosForm.image) {
            setAlerta({ tipo: 'error', mensaje: 'Por favor, selecciona una imagen para el producto.' });
            return;
        }
        setErrores(e);
        if (Object.keys(e).length > 0) {
          setAlerta({ tipo: 'error', mensaje: 'Revisa los campos marcados.' });
          return;
        }

        setCargando(true);
        setAlerta({ tipo: '', mensaje: '' });
        // Procesamos las etiquetas a formato Array plano e indexable
        const tagsArray = typeof datosForm.tags === 'string' ? datosForm.tags.split(/\s*,\s*/).map(item =>
            item.toLowerCase().normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-")
            .trim()
          ).filter(Boolean)
        : [];
        try {
            const productoProcesado = {
                ...datosForm,
                price: Number(datosForm.price),
                stock: Number(datosForm.stock),
                discount: Number(datosForm.discount) || 0,
                image: datosForm.image,
                tags: tagsArray,
                rating: {
                    rate: 0,
                    count: 0
                }
            };
            await alEnviar(productoProcesado);
            setAlerta({ tipo: 'success', mensaje: 'Operación realizada correctamente.' });
            if (!datosIniciales?.id) {
                setDatosForm(datosIniciales);
                limpiar();
            }
        } catch (err) {
            console.error("Error en el proceso de envío:", err);
            setAlerta({ tipo: 'error', mensaje: 'Hubo un error al guardar el producto.' });
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
            <SubSection label={titulo} />
            <Form onSubmit={manejarEnvioLocal} alert={alert}>
                <Legend>Administrar datos</Legend>
                <Input
                    label="Nombre del Producto:"
                    type="text"
                    name="title"
                    placeholder="Ej: Teclado Mecánico"
                    value={datosForm.title}
                    onChange={manejarCambio}
                    error={errores.title}
                    required
                />
                <div className="grid grid-cols-3 gap-2">
                    <Input
                        label="Precio:"
                        type="number"
                        name="price"
                        placeholder="Ej: 95"
                        value={datosForm.price}
                        onChange={manejarCambio}
                        error={errores.price}
                        required
                    />
                    <Input
                        label="Stock:"
                        type="number"
                        name="stock"
                        placeholder="Ej: 5"
                        value={datosForm.stock}
                        onChange={manejarCambio}
                        error={errores.stock}
                        required
                    />
                    <Input
                        label="Descuento:"
                        type="number"
                        name="discount"
                        placeholder="Ej: 10"
                        value={datosForm.discount}
                        onChange={manejarCambio}
                        error={errores.discount}
                    />
                </div>
                <Textarea
                    label="Extracto:"
                    name="excerpt"
                    placeholder="Una pequeña descripción"
                    value={datosForm.excerpt}
                    onChange={manejarCambio}
                    error={errores.excerpt}
                />
                <Textarea
                    label="Descripción:"
                    name="description"
                    placeholder="Añada una descripción del producto"
                    value={datosForm.description}
                    onChange={manejarCambio}
                    error={errores.description}
                />
                <Select
                    label="Categoría:"
                    name="category"
                    placeholder="Selecciona una categoría"
                    value={datosForm.category}
                    onChange={manejarCambio}
                    options={categorias}
                    error={errores.category}
                />
                <Input
                    label="Etiquetas del Producto:"
                    type="text"
                    name="tags"
                    placeholder="Ej: teclado, mecanico, accesorio"
                    value={datosForm.tags}
                    onChange={manejarCambio}
                    error={errores.tags}
                    required
                />
                <Input
                    label="Destacado?"
                    type="checkbox"
                    name="outstanding"
                    value={datosForm.outstanding}
                    onChange={manejarCambio}
                    error={errores.outstanding}
                />
                <Input
                    label="Imagen:"
                    type="file"
                    name="image"
                    onChange={manejarCambioImagen}
                    key={datosForm.image ? 'subida' : 'pendiente'}
                />

                {cargandoImagen && <p className="text-sm text-muted">Subiendo imagen...</p>}
                {errorImagen && <p className="text-sm text-error">{errorImagen}</p>}
                {datosForm.image && (
                    <Image
                        image={datosForm.image}
                        alt="Vista previa"
                        cx="my-2 object-cover rounded-2"
                        type="portada"
                        size="180"
                    />
                )}

                <Button type="submit" variant="brand" disabled={cargando || cargandoImagen} fullWidth size="md">
                    {cargando ? 'Guardando...' : etiquetaBoton}
                </Button>
            </Form>
        </>
    );
}
