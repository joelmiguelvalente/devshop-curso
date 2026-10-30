// src/pages/admin/usuarios/UsuariosPages.jsx
import { useState, useMemo } from 'react';
// Libreria
import { Link } from 'react-router';
// Constante
import { COLECCION, SINGULAR } from '@constants/collections';
// Componentes
import { EstadoCarga } from '@blocks/EstadoCarga';
import { Button } from '@ui/Button';
import { ModalEliminar } from '@ui/ModalEliminar';
import { Paginator, PageWrap, PagePrev, PageNext, PageCount } from '@ui/Paginator';
import { SubSection } from '@ui/Section';
import { Table, THead, THeadItem, TBody, TRow, TData } from '@ui/Table';
// Hooks
import { useEliminar } from '@hooks/useEliminar';
import { useFirestoreLive } from '@hooks/useFirestore';

export function UsuariosPage() {
    const [ordenar, setOrdenar] = useState('nombre-az');

	// Obtenemos todos los usuarios
	const { data: datos, error, loading: cargando } = useFirestoreLive(COLECCION.usuarios, {
		order: ['name', 'asc']
	});

	const datosOrdenados = useMemo(() => {
        if (!datos) return [];
        // Clonamos el array original para evitar mutar el estado directamente
        return [...datos].sort((a, b) => {
            switch (ordenar) {
                case 'nombre-az': return (a.name || '').localeCompare(b.name || '');
                case 'nombre-za': return (b.name || '').localeCompare(a.name || '');
                case 'email-az':  return (a.email || '').localeCompare(b.email || '');
                case 'email-za':  return (b.email || '').localeCompare(a.email || '');
                default: return 0;
            }
        });
    }, [datos, ordenar]);

	// Paginamos si son más 12
	const { data, current, next, prev, total } = Paginator({
		data: datosOrdenados,
		limit: 12
	});

    const { abrir, modalEliminar } = useEliminar({
        coleccion: COLECCION.usuarios,
        singular:  SINGULAR.usuario
    });

	return (
		<EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando...">
			<SubSection label="Seccion para adminstrar a todos los usuarios" linkTo="/admin/usuarios/agregar"
				linkLabel="Añadir usuario">
				Gestionar usuarios
			</SubSection>

            <div className="flex justify-end items-center gap-2 mb-4 bg-surface border border-color rounded-lg p-3">
                <label htmlFor="ordenar-usuarios" className="text-sm font-medium text-muted">Ordenar por:</label>
                <select
                    id="ordenar-usuarios"
                    value={ordenar}
                    onChange={(e) => setOrdenar(e.target.value)}
                    className="p-1 text-sm bg-background border rounded cursor-pointer"
                >
                    <option value="nombre-az">Nombre A-Z</option>
                    <option value="nombre-za">Nombre Z-A</option>
                    <option value="email-az">Email A-Z</option>
                    <option value="email-za">Email Z-A</option>
                </select>
            </div>

			<Table>
				<THead>
					<TRow>
						<THeadItem>Nombre</THeadItem>
						<THeadItem>Email</THeadItem>
						<THeadItem>Staff</THeadItem>
						<THeadItem>Acción</THeadItem>
					</TRow>
				</THead>
				<TBody>
					{data?.map(({ id, name, email, rol, label }) => {
						return (
							<TRow key={id} id={`user-${id}`}>
								<TData label="Nombre">
									{name}
									<small className="block font-bold">{label}</small>
								</TData>
								<TData cx="text-center" value={email} label="Email" />
								<TData label="Staff">{rol === 'admin' ? 'Equipo' : 'Usuario'}</TData>
								<TData cx="accion" label="Acción">
									<div className="flex justify-center items-center gap-2">
										<Button variant="ghost" onClick={() => abrir(id)}>Eliminar</Button>
										<Link to={`/admin/usuarios/editar/${id}`}>
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