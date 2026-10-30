// src/pages/admin/cupones/CuponesPage.jsx
import { useState, useMemo } from 'react';
// Libreria
import { Link } from 'react-router';
// Constante
import { COLECCION, SINGULAR } from '@constants/collections';
// Componentes
import { EstadoCarga } from '@blocks/EstadoCarga';
import { Button } from '@ui/Button';
import { Paginator, PageWrap, PagePrev, PageNext, PageCount } from '@ui/Paginator';
import { SubSection } from '@ui/Section';
import { ModalEliminar } from '@ui/ModalEliminar';
// Hooks
import { useEliminar } from '@hooks/useEliminar';
import { useFirestoreLive } from '@hooks/useFirestore';
// Uitilidad
import { getCouponStatus } from '@utils/Utils';

export function CuponesPage() {

    const [ordenar, setOrdenar] = useState('nombre-az');
    const [filtrar, setFiltrar] = useState('todos');

    // Obtenemos todos los cupones
    const {
        data: datos,
        error,
        loading: cargando
    } = useFirestoreLive(COLECCION.cupones, { order: ['title', 'asc'] });

    const datosOrdenados = useMemo(() => {
        if (!datos) return [];

        const ahora = new Date().getTime();
        const unaSemanaEnMs = 7 * 24 * 60 * 60 * 1000;

        const filtrados = datos.filter((cupon) => {
            const inicio = cupon.startDate?.toDate ? cupon.startDate.toDate().getTime() : new Date(cupon.startDate).getTime();
            const fin = cupon.expirationDate?.toDate ? cupon.expirationDate.toDate().getTime() : new Date(cupon.expirationDate).getTime();

            switch (filtrar) {
                case 'expirados': return ahora > fin;
                case 'por-expirar': return ahora <= fin && (fin - ahora) <= unaSemanaEnMs && ahora >= inicio;
                case 'vigentes': return ahora >= inicio && ahora <= fin;
                case 'proximos': return ahora < inicio;
                case 'todos':
                default: return true;
            }
        });
        // Clonamos el array original para evitar mutar el estado directamente
        return filtrados.sort((a, b) => {
            switch (ordenar) {
                case 'nombre-az':     return (a.title || '').localeCompare(b.title || '');
                case 'nombre-za':     return (b.title || '').localeCompare(a.title || '');
                case 'descuento-asc':  return Number(a.discountValue || 0) - Number(b.discountValue || 0);
                case 'descuento-desc': return Number(b.discountValue || 0) - Number(a.discountValue || 0);
                default: return 0;
            }
        });
    }, [datos, filtrar, ordenar]);

    const { data, current, next, prev, total } = Paginator({
        data: datosOrdenados,
        limit: 12
    });

    const { abrir, modalEliminar } = useEliminar({
        coleccion: COLECCION.cupones,
        singular:  SINGULAR.cupon
    });

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando...">
            <SubSection
                label="Seccion para administrar todos los cupones"
                linkTo="/admin/cupones/agregar"
                linkLabel="Añadir cupon">
                Gestionar cupones
            </SubSection>

            <div className="flex justify-end items-center gap-2 mb-4 bg-surface p-3">
                <div className="flex justify-end items-center gap-2 bg-surface">
                    <label
                        htmlFor="ordenar-cupones"
                        className="text-sm font-medium text-muted">Ordenar por:</label>
                    <select
                        id="ordenar-cupones"
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
                <div className="flex justify-end items-center gap-2 bg-surface">
                    <label
                        htmlFor="filtrar-cupones"
                        className="text-sm font-medium text-muted">Filtrar por:</label>
                    <select
                        id="filtrar-cupones"
                        value={filtrar}
                        onChange={(e) => setFiltrar(e.target.value)}
                        className="p-1 text-sm bg-background border rounded cursor-pointer"
                    >
                        <option value="todos">Todos los cupones</option>
                        <option value="vigentes">Vigentes</option>
                        <option value="por-expirar">Por expirar (1 semana o menos)</option>
                        <option value="expirados">Expirados</option>
                        <option value="proximos">Próximamente activos</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                {data?.map(({ id, code, title, description, startDate, expirationDate, isActive }) => {
                    return (
                        <div className="border p-1 rounded" key={id}>
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg">{title} <span className="text-sm text-brand font-semibold">#{code}</span></h3>
                                    <span className="block my-1">{description}</span>
                                    <div className="flex justify-start items-start gap-2">
                                        <span className={`text-sm badge badge-${isActive ? 'success' : 'error'}`}>{isActive ? 'Activo' : 'Inactivo'}</span>
                                        <span className="text-sm font-semibold">{getCouponStatus(startDate, expirationDate)}</span>
                                    </div>
                                </div>
                                <div style={{ width: '160px' }}>
                                    <div className="flex justify-center items-center gap-2">
                                        <Button variant="ghost" onClick={() => abrir(id)}>Eliminar</Button>
                                        <Link to={`/admin/cupones/editar/${id}`}>
                                            <Button variant="success">Editar</Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
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