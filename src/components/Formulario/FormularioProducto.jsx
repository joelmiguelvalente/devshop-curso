// En src/componentens/Formulario/FormularioProducto
import { Input } from '@components/Formulario/FormularioInput';
import { Alerta } from '@ui/Alerta';

// Por ahora, es un componente súper simple. Solo muestra el HTML.
export function FormularioProducto({
    cargando,
    datosForm,
    manejarCambio,
    manejarEnvio,
    manejarCambioImagen,
    alerta,
    setAlerta
}) {

    return (
        <form className="w-full my-3 mx-auto p-3 border rounded-3" style={{ minWidth: '320px', maxWidth: '560px' }} onSubmit={manejarEnvio}>
            {alerta.mensaje && (
                <div className="mb-3">
                    <Alerta
                        type={alerta.tipo}
                        message={alerta.mensaje}
                        onClose={() => setAlerta({ tipo: '', mensaje: '' })}
                    />
                </div>
            )}
            <legend className="font-bold text-2xl text-center block mb-2">Agregar Nuevo Producto</legend>
            <Input
                label="Nombre del Producto:"
                type="text"
                name="nombre"
                placeholder="Ej: Teclado Mecánico"
                value={datosForm.nombre}
                onChange={manejarCambio}
            />
            <Input
                label="Precio:"
                type="number"
                name="precio"
                placeholder="Ej: 95"
                value={datosForm.precio}
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
                label="Descripción:"
                type="textarea"
                name="descripcion"
                placeholder="Añada una descripción del producto"
                value={datosForm.descripcion}
                onChange={manejarCambio}
            />
            <Input
                label="Categoría:"
                type="select"
                name="categoria"
                placeholder="Selecciona una categoría"
                value={datosForm.categoria}
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
                name="imagen"
                onChange={manejarCambioImagen}
                key={cargando ? 'cargando' : 'listo'}
            />
            <button
                type="submit"
                disabled={cargando}
                className="w-full p-2 bg-primary text-primary-foreground font-bold rounded-2 transition bg-primary-hover"
            >
                {cargando ? 'Guardando...' : 'Guardar Producto'}
            </button>
        </form>
    );
}