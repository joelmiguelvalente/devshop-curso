// src/pages/admin/productos/Productos.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Button } from '@ui/Button';
import { EstadoCarga } from '@ui/EstadoCarga';
import { Modal, ModalButtons, ModalCancel, ModalConfirm } from '@ui/Modal';
import { Paginator, PageWrap, PagePrev, PageNext, PageCount } from '@ui/Paginator';
import { SubSection } from '@ui/Section';
import { Table, THead, THeadItem, TBody, TRow, TData } from '@ui/Table';
import { useProductos } from '@hooks/useProductos';
import { destroyDoc } from '@services/firestore.service';

export function ProductosPage() {

    const [modalAbierto, setModalAbierto]   = useState(false);
    const [idEliminar, setUIDEliminar]      = useState(null);
    const [ordenar, setOrdenar]             = useState('nombre-az');

    const { data: datos, error, loading: cargando }        = useProductos();

    const datosOrdenados = useMemo(() => {
        if (!datos) return [];
        // Clonamos el array original para evitar mutar el estado directamente
        return [...datos].sort((a, b) => {
            switch (ordenar) {
                case 'nombre-az':  return (a.title || '').localeCompare(b.title || '');
                case 'nombre-za':  return (b.title || '').localeCompare(a.title || '');
                case 'stock-asc':  return Number(a.stock || 0) - Number(b.stock || 0);
                case 'stock-desc': return Number(b.stock || 0) - Number(a.stock || 0);
                default: return 0;
            }
        });
    }, [datos, ordenar]);

    const { data, current, next, prev, total } = Paginator({
        data: datosOrdenados,
        limit: 12
    });

    // Mostramos modal
    const idEliminarFn = id => {
        setUIDEliminar(id);
        setModalAbierto(true);
    };

    // Cerramos modal
    const modalCerrar = () => {
        setModalAbierto(false);
        setUIDEliminar(null);
    }

    const confirmaEliminacion = async () => {
        if (!idEliminar) return;
        try {
            await destroyDoc('team', idEliminar);
            console.log(`Usuario ${idEliminar} eliminado con éxito`);
        } catch (err) {
            console.error("Error al intentar eliminar el producto:", err);
        } finally {
            setModalAbierto(false);
            setUIDEliminar(null);
        }
    };

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando...">
            <SubSection label="Seccion para administrar todos los productos" linkTo="/admin/productos/agregar"
                linkLabel="Añadir producto">
                Gestionar productos
            </SubSection>

            <div className="flex justify-end items-center gap-2 mb-4 bg-surface py-2">
                <label htmlFor="ordenar-productos" className="text-sm font-medium text-muted">Ordenar por:</label>
                <select
                    id="ordenar-productos"
                    value={ordenar}
                    onChange={(e) => setOrdenar(e.target.value)}
                    className="p-1 text-sm bg-background border rounded cursor-pointer"
                >
                    <option value="nombre-az">Nombre A-Z</option>
                    <option value="nombre-za">Nombre Z-A</option>
                    <option value="stock-asc">Menos Stock</option>
                    <option value="stock-desc">Más Stock</option>
                </select>
            </div>

            <Table>
                <THead>
                    <TRow>
                        <THeadItem>Nombre</THeadItem>
                        <THeadItem>Stock</THeadItem>
                        <THeadItem>Acción</THeadItem>
                    </TRow>
                </THead>
                <TBody>
                    {data?.map(({ id, title, stock }) => {
                        return (
                            <TRow key={id} cx={`${stock === 0 ? 'error' : 'text'}`}>
                                <TData value={title} />
                                <TData cx="font-bold text-center" value={stock} />
                                <TData cx="accion">
                                    <div className="flex justify-center items-center gap-2">
                                        <Button variant="ghost" onClick={() => idEliminarFn(id)}>Eliminar</Button>
                                        <Link to={`/admin/productos/editar/${id}`}>
                                            <Button variant="success">Editar</Button>
                                        </Link>
                                    </div>
                                </TData>
                            </TRow>
                        )
                    })}
                </TBody>
            </Table>
            {total > 1 && (
                <PageWrap>
                    <PagePrev prev={prev} current={current} />
                    <PageCount current={current} total={total} />
                    <PageNext next={next} current={current} total={total} />
                </PageWrap>
            )}
            <Modal isOpen={modalAbierto} onClose={modalCerrar} title="¿Eliminar producto definitivamente?">
                <p className="mb-2">
                    ¿Estás seguro de que deseas eliminar a este producto del sistema?
                </p>
                <p className="text-error font-semibold mb-4 bg-error px-2 py-1 rounded-2 text-sm">
                    ⚠️ Esta acción es irreversible y se borrarán todos sus registros permanentemente.
                </p>
                <ModalButtons>
                    <ModalCancel onClick={modalCerrar}>
                        Cancelar
                    </ModalCancel>
                    <ModalConfirm
                        onClick={confirmaEliminacion}
                        variant="error"
                        value="Sí, eliminar producto"
                    />
                </ModalButtons>
            </Modal>
        </EstadoCarga>
    )
}