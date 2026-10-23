// src/pages/admin/productos/ProductosPages.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { COLECCION, SINGULAR } from '@constants/collections';
import { Button } from '@ui/Button';
import { EstadoCarga } from '@blocks/EstadoCarga';
import { Paginator, PageWrap, PagePrev, PageNext, PageCount } from '@ui/Paginator';
import { SubSection } from '@ui/Section';
import { Table, THead, THeadItem, TBody, TRow, TData } from '@ui/Table';
import { ModalEliminar } from '@ui/ModalEliminar';
import { useEliminar } from '@hooks/useEliminar';
import { useProductos } from '@hooks/useProductos';

export function ProductosPage() {

    const [ordenar, setOrdenar] = useState('nombre-az');

    const { data: datos, error, loading: cargando } = useProductos();

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

    const { abrir, modalEliminar } = useEliminar({
        coleccion: COLECCION.productos,
        singular:  SINGULAR.producto
    });

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando...">
            <SubSection label="Seccion para administrar todos los productos" linkTo="/admin/productos/agregar"
                linkLabel="Añadir producto">
                Gestionar productos
            </SubSection>

            <div className="flex justify-end items-center gap-2 mb-4 bg-surface border border-color rounded-lg p-3">
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
                                <TData value={title} label="Nombre" />
                                <TData cx="font-bold text-center" value={stock} label="Stock" />
                                <TData cx="accion" label="Acción">
                                    <div className="flex justify-center items-center gap-2">
                                        <Button variant="ghost" onClick={() => abrir(id)}>Eliminar</Button>
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
            <ModalEliminar {...modalEliminar} />
        </EstadoCarga>
    )
}