// En src/componentens/Formulario/FormularioProducto
import { Input, Textarea, Select } from '@ui/Inputs';
import { Button } from '@ui/Button';
import { Form, Legend } from '@ui/Form';
import { useAll } from '@hooks/useQuery';

// Por ahora, es un componente súper simple. Solo muestra el HTML.
export function FormularioProducto({
    cargando,
    cargandoImagen,
    errorImagen,
    imagen,
    datosForm,
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen
}) {

    const { datos: categorias } = useAll('categories', {
        order: ['name', 'asc']
    });

    return (
        <Form onSubmit={manejarEnvio}>
            <Legend>Agregar Nuevo Producto</Legend>
            <Input
                label="Nombre del Producto:"
                type="text"
                name="title"
                placeholder="Ej: Teclado Mecánico"
                value={datosForm.title}
                onChange={manejarCambio}
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
                <Input
                    label="Descuento:"
                    type="number"
                    name="discount"
                    placeholder="Ej: 10"
                    value={datosForm.discount}
                    onChange={manejarCambio}
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
                options={categorias}
            />
            <Input
                label="Etiquetas del Producto:"
                type="text"
                name="tags"
                placeholder="Ej: teclado, mecanico, accesorio"
                value={datosForm.tags}
                onChange={manejarCambio}
                required
            />
            <Input
                label="Destacado?"
                type="checkbox"
                name="outstanding"
                value={datosForm.outstanding}
                onChange={manejarCambio}
            />
            <Input
                label="Imagen:"
                type="file"
                name="image"
                onChange={manejarCambioImagen}
                key={imagen ? 'subida' : 'pendiente'}
            />
            {cargandoImagen && <p className="text-sm text-muted">Subiendo imagen...</p>}
            {errorImagen && <p className="text-sm text-error">{errorImagen}</p>}
            {imagen && <img src={imagen} alt="Vista previa" className="my-2 object-cover rounded-2" style={{ width: "180px" }} />}

            <Button type="submit" variant="brand" disabled={cargando || cargandoImagen} fullWidth size="md">
                {cargando ? 'Guardando...' : 'Guardar Producto'}
            </Button>
        </Form>
    );
}
