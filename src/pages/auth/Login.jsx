// src/pages/auth/Login.jsx
import { useState } from 'react';
// Librerias
import { useNavigate, Link } from 'react-router';
import { useForm } from 'react-hook-form';
// Componentes
import { Alerta } from '@ui/Alerta';
import { Button } from '@ui/Button';
import { Form } from '@ui/Form';
import { Input } from '@ui/Inputs';
// Utilidades
import { createSchemaResolver } from '@utils/rhfResolver';
import { mensajeAmigable } from '@utils/AuthError';
// Servicio
import { loginUser } from '@services/auth.service';
// Esquema
import { loginFieldDefault, loginSchema } from '@schemas/loginSchema';

export function Login() {

	const navigate = useNavigate();
	const [alert, setAlert] = useState({ tipo: '', mensaje: '' });

	const {
		register,
		handleSubmit,
		formState: {
			errors,
			isSubmitting
		}
	} = useForm({
		defaultValues:	loginFieldDefault,
		resolver:		createSchemaResolver(loginSchema),
		mode:			'onTouched'
	});

	// handlerLogin(onSubmit)
	const onSubmit = async ({ email, password }) => {
		setAlert({ tipo: '', mensaje: '' });
		try {
			await loginUser(email, password);
			navigate('/');
		} catch ({ code, message }) {
			console.error('Error en el login:', code, message);
			setAlert({
				tipo: 'error',
				mensaje: mensajeAmigable(code)
			});
		}
	};

	return (
		<div>
			<h2 className="py-3 text-center">Iniciar Sesión</h2>
			{alert.mensaje && (
				<div className="mb-3">
					<Alerta
						type={alert.tipo}
						message={alert.mensaje}
						onClose={() => setAlert({ tipo: '', mensaje: '' })}
					/>
				</div>
			)}
			<Form onSubmit={handleSubmit(onSubmit, () =>
				setAlert({ tipo: 'error', mensaje: 'Revisá los campos marcados.' })
			)}>
				<Input
					label="Correo electrónico:"
					type="email"
					placeholder="Ej: jhondoe@example.com"
					error={errors.email?.message}
					required
					className="mb-4"
					{...register('email')}
				/>
				<Input
					label="Contraseña:"
					type="password"
					placeholder="••••••••"
					autoComplete="current-password"
					error={errors.password?.message}
					required
					className="mb-4"
					{...register('password')}
				/>
				<Button type="submit" variant="brand" disabled={isSubmitting} fullWidth size="md">
					{isSubmitting ? 'Ingresando...' : 'Ingresar'}
				</Button>
				<div className="pt-4 mt-4 text-center">
					<p>No tengo una cuenta! <Link to="/auth/register" className="text-brand font-bold">Crear una cuenta</Link></p>
				</div>
			</Form>
		</div>
	);
};
