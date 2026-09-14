// En src/componentens/Formulario/FormularioProducto
import { Input } from '@components/Formulario/FormularioInput';

// Por ahora, es un componente súper simple. Solo muestra el HTML.
export function FormularioProducto({
    cargando,
    datosForm,
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen
}) {

    return (
        <form className="w-full my-3 mx-auto p-3 border rounded-3" style={{ minWidth: '320px', maxWidth: '560px' }} onSubmit={manejarEnvio}>
            <legend className="font-bold text-2xl text-center block mb-2">Agregar Nuevo Producto</legend>
            <Input
                label="Nombre del Producto:"
                type="text"
                name="title"
                placeholder="Ej: Teclado Mecánico"
                value={datosForm.title}
                onChange={manejarCambio}
            />
            <Input
                label="Precio:"
                type="number"
                name="price"
                placeholder="Ej: 95"
                value={datosForm.price}
                onChange={manejarCambio}
            />
            <Input
                label="Stock:"
                type="number"
                name="stock"
                placeholder="Ej: 5"
                value={datosForm.stock}
                onChange={manejarCambio}
            />
            <Input
                label="Extracto:"
                type="textarea"
                name="excerpt"
                placeholder="Una pequeña descripción"
                value={datosForm.excerpt}
                onChange={manejarCambio}
            />
            <Input
                label="Descripción:"
                type="textarea"
                name="description"
                placeholder="Añada una descripción del producto"
                value={datosForm.description}
                onChange={manejarCambio}
            />
            <Input
                label="Categoría:"
                type="select"
                name="category"
                placeholder="Selecciona una categoría"
                value={datosForm.category}
                onChange={manejarCambio}
                options={[
                    { value: 'accesorios', label: 'Accesorios' },
                    { value: 'almacenamiento', label: 'Almacenamiento' },
                    { value: 'audio', label: 'Audio' },
                    { value: 'gaming', label: 'Gaming' },
                    { value: 'monitores', label: 'Monitores' },
                    { value: 'notebooks', label: 'Notebooks' },
                    { value: 'oficina', label: 'Oficina' },
                    { value: 'periféricos', label: 'Periféricos' },
                    { value: 'redes', label: 'Redes' },
                    { value: 'smartphones', label: 'Smartphones' },
                    { value: 'tablets', label: 'Tablets' },
                    { value: 'wearables', label: 'Wearables' }
                ]}
            />
            <Input
                label="Imagen:"
                type="file"
                name="image"
                onChange={manejarCambioImagen}
                key={cargando ? 'cargando' : 'listo'}
            />
            <button
                type="submit"
                disabled={cargando}
                className="w-full p-2 bg-primary text-secondary font-bold rounded-2 transition bg-primary-hover"
            >
                {cargando ? 'Guardando...' : 'Guardar Producto'}
            </button>
        </form>
    );
}