// src/pages/admin/usuarios/Usuarios.jsx
import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { Button } from '@ui/Button';
import { EstadoCarga } from '@ui/EstadoCarga';
import { Modal, ModalButtons, ModalCancel, ModalConfirm } from '@ui/Modal';
import { Paginator, PageWrap, PagePrev, PageNext, PageCount } from '@ui/Paginator';
import { SubSection } from '@ui/Section';
import { Table, THead, THeadItem, TBody, TRow, TData } from '@ui/Table';
import { useFirestoreLive } from '@hooks/useFirestore';
import { destroyDoc } from '@services/firestore.service';

export function UsuariosPage() {

	const [modalAbierto, setModalAbierto] 	= useState(false);
	const [uidEliminar, setUIDEliminar] 	= useState(null);
    const [ordenar, setOrdenar] 			= useState('nombre-az');

	// Obtenemos todos los usuarios
	const {
		data: datos,
		error,
		loading: cargando
	} 										= useFirestoreLive('team', { order: ['name', 'asc'] });

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

	// Mostramos modal
	const uidEliminarFn = id => {
		setUIDEliminar(id);
		setModalAbierto(true);
	};

	// Cerramos modal
	const modalCerrar = () => {
        setModalAbierto(false);
        setUIDEliminar(null);
	}

	const confirmaEliminacion = async () => {
		if (!uidEliminar) return;
		try {
			await destroyDoc('team', uidEliminar);
			console.log(`Usuario ${uidEliminar} eliminado con éxito`);
		} catch (err) {
			console.error("Error al intentar eliminar el usuario:", err);
		} finally {
			setModalAbierto(false);
			setUIDEliminar(null);
		}
	};

	return (
		<EstadoCarga cargando={cargando} error={error} mensajeCargando="Cargando...">
			<SubSection label="Seccion para adminstrar a todos los usuarios" linkTo="/admin/usuarios/agregar"
				linkLabel="Añadir usuario">
				Gestionar usuarios
			</SubSection>

            <div className="flex justify-end items-center gap-2 mb-4 bg-surface py-2">
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
					{data?.map(({ id, name, email, role, staff }) => {
						return (
							<TRow key={id} id={`user-${id}`}>
								<TData>
									{name}
									<small className="block font-bold">{role}</small>
								</TData>
								<TData cx="text-center" value={email} />
								<TData>{staff ? 'Equipo' : 'Usuario'}</TData>
								<TData cx="accion">
									<div className="flex justify-center items-center gap-2">
										<Button variant="ghost" onClick={() => uidEliminarFn(id)}>Eliminar</Button>
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
			<Modal isOpen={modalAbierto} onClose={modalCerrar} title="¿Eliminar usuario definitivamente?">
                <p className="mb-2">
                    ¿Estás seguro de que deseas eliminar a este usuario del sistema?
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
	                	value="Sí, eliminar usuario"
	                />
	            </ModalButtons>
            </Modal>
		</EstadoCarga>
	)
}