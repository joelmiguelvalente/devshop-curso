// src/pages/admin/usuarios/Usuarios.jsx
import { useState } from 'react';
import { Link } from 'react-router';
import { Button } from '@ui/Button';
import { EstadoCarga } from '@ui/EstadoCarga';
import { Modal, ModalButtons, ModalCancel, ModalConfirm } from '@ui/Modal';
import { Paginator, PageWrap, PagePrev, PageNext, PageCount } from '@ui/Paginator';
import { SubSection } from '@ui/Section';
import { Table, THead, THeadItem, TBody, TRow, TData } from '@ui/Table';
import { useAllLive, deleteDocument } from '@hooks/useQuery';

export function Usuarios() {

	const [modalAbierto, setModalAbierto] = useState(false);
	const [uidEliminar, setUIDEliminar] = useState(null);

	// Obtenemos todos los usuarios
	const { datos, error, cargando } = useAllLive('team', {
		order: ['name', 'asc']
	});

	// Paginamos si son más 12
	const { data, current, next, prev, total } = Paginator({
		data: datos,
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
			await deleteDocument('team', uidEliminar);
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

			<Table>
				<THead>
					<TRow>
						<THeadItem>Nombre</THeadItem>
						<THeadItem>Email</THeadItem>
						<THeadItem>Acción</THeadItem>
					</TRow>
				</THead>
				<TBody>
					{data?.map(({ id, name, email, role }) => {
						return (
							<TRow key={id} id={`user-${id}`}>
								<TData>
									{name}
									<small className="block font-bold">{role}</small>
								</TData>
								<TData cx="text-center" value={email} />
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