// En src/componentens/Formulario/FormularioProducto
import { Input, Textarea, Select } from '@components/Formulario/FormularioInputs';
import { Button } from '@ui/Button';

// Por ahora, es un componente súper simple. Solo muestra el HTML.
export function FormularioProducto({
    cargando,
    datosForm,
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen
}) {

    return (
        <form className="w-full my-4 mx-auto" style={{ minWidth: '320px', maxWidth: '560px' }} onSubmit={manejarEnvio}>
            <legend className="font-bold text-2xl text-center block mt-3 mb-6">Agregar Nuevo Producto</legend>
            <Input
                label="Nombre del Producto:"
                type="text"
                name="title"
                placeholder="Ej: Teclado Mecánico"
                value={datosForm.title}
                onChange={manejarCambio}
                required
            />
            <div className="grid grid-cols-2 gap-2">
                <Input
                    label="Precio:"
                    type="number"
                    name="price"
                    placeholder="Ej: 95"
                    value={datosForm.price}
                    onChange={manejarCambio}
                    required
                />
                <Input
                    label="Stock:"
                    type="number"
                    name="stock"
                    placeholder="Ej: 5"
                    value={datosForm.stock}
                    onChange={manejarCambio}
                    required
                />
            </div>
            <Textarea
                label="Extracto:"
                name="excerpt"
                placeholder="Una pequeña descripción"
                value={datosForm.excerpt}
                onChange={manejarCambio}
            />
            <Textarea
                label="Descripción:"
                name="description"
                placeholder="Añada una descripción del producto"
                value={datosForm.description}
                onChange={manejarCambio}
            />
            <Select
                label="Categoría:"
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
            <Button type="submit" variant="brand" disabled={cargando} fullWidth size="md">
                {cargando ? 'Guardando...' : 'Guardar Producto'}
            </Button>
        </form>
    );
}