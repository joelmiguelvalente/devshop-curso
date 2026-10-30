// src/pages/admin/categorias/CategoriasPage.jsx
// Libreria
import { Link } from 'react-router';
// Constante
import { COLECCION, SINGULAR } from '@constants/collections';
// Componentes
import { EstadoCarga } from '@blocks/EstadoCarga';
import { Button } from '@ui/Button';
import { Paginator, PageWrap, PagePrev, PageNext, PageCount } from '@ui/Paginator';
import { SubSection } from '@ui/Section';
import { Table, THead, THeadItem, TBody, TRow, TData } from '@ui/Table';
import { ModalEliminar } from '@ui/ModalEliminar';
// Hooks
import { useEliminar } from '@hooks/useEliminar';
import { useFirestoreLive } from '@hooks/useFirestore';

export function CategoriasPage() {

    // Obtenemos todas las categorias
    const {
        data: datos,
        error,
        loading: cargando
    } = useFirestoreLive(COLECCION.categorias, { order: ['name', 'asc'] });

    const { data, current, next, prev, total } = Paginator({
        data: datos,
        limit: 6
    });

    const { abrir, modalEliminar } = useEliminar({
        coleccion: COLECCION.categorias,
        singular:  SINGULAR.categoria
    });

    return (
        <EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando...">
            <SubSection
                label="Seccion para administrar todas las categorias"
                linkTo="/admin/categorias/agregar"
                linkLabel="Añadir categoria">
                Gestionar categorias
            </SubSection>

            <Table cx="mt-4">
                <THead>
                    <TRow>
                        <THeadItem>Nombre</THeadItem>
                        <THeadItem>Slug</THeadItem>
                        <THeadItem>Acción</THeadItem>
                    </TRow>
                </THead>
                <TBody>
                {data?.map(({ id, name, slug }) => {
                    return (
                        <TRow key={id}>
                            <TData value={name} label="Nombre" />
                            <TData value={slug} label="Slug/SEO" />
                            <TData cx="accion" label="Acción">
                                <div className="flex justify-center items-center gap-2">
                                    <Button variant="ghost" onClick={() => abrir(id)}>Eliminar</Button>
                                    <Link to={`/admin/categorias/editar/${id}`}>
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