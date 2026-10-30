// src/pages/profile/Profile.jsx
// Constante
import { COLECCION, ADMINISTRADOR } from '@constants/collections';
// Componentes
import { Empty } from '@blocks/Empty';
import { EstadoCarga } from '@blocks/EstadoCarga';
import { Image } from '@ui/Image';
// Hooks
import { useAuth } from '@hooks/useAuth';
import { useFirestoreDoc } from '@hooks/useFirestore';

export function Profile() {

    const { user } = useAuth();
    const { data, loading, error } = useFirestoreDoc(COLECCION.usuarios, user?.uid)

    if (loading) return <EstadoCarga cargando={loading} mensajeCargando="Cargando tu perfil..." />;
    if (error) return <Empty tipo="error" />;

    const nickname = data?.name;
    const label = data?.label;
    const avatar = data?.avatar;
    const email = data?.email;
    const isAdmin = data?.rol === ADMINISTRADOR;

    return (
        <div className="flex justify-center items-center flex-col gap-3 py-8 border border-color rounded-4">
            <Image
                image={avatar}
                alt={`Avatar de ${nickname}`}
                type="avatar"
                cx="rounded-full border border-color bg-muted w-160 h-160"
            />
            <div className="flex items-center gap-2">
                <small className="badge badge-success">{label}</small>
                <small className="badge badge-info">{isAdmin ? 'Administrador' : 'Miembro'}</small>
            </div>
            <h1 className="text-3xl">Hola <span className="font-black text-brand">{nickname}</span>, bienvenido!</h1>
            <a href={`mailto:${email}`} className="text-brand font-semibold" target="_blank" title={`Correo del usuario ${nickname}`}>{email}</a>
        </div>
    );
}
