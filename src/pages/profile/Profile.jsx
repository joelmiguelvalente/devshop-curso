// src/pages/profile/Profile.jsx
// Constante
import { COLECCION } from '@constants/collections';
// Componente
import { Image } from '@ui/Image';
// Hooks
import { useAuth } from '@hooks/useAuth';
import { useFirestoreDoc } from '@hooks/useFirestore';

export function Profile() {

    const { user } = useAuth();
    const { data } = useFirestoreDoc(COLECCION.usuarios, user?.uid)

    const nickname = data?.name;
    const label = data?.label;
    const avatar = data?.avatar;
    const email = data?.email;

    return (
        <div className="flex justify-center items-center flex-col gap-3 py-8 border border-color rounded-4">
            <Image
                image={avatar}
                alt={name}
                type="avatar"
                cx="rounded-full border border-color bg-muted w-160 h-160"
            />
            <small className="badge badge-success">{label}</small>
            <h1 className="text-3xl">Hola <span className="font-black text-brand">{nickname}</span>, bienvenido!</h1>
            <a href={`mailto:${email}`} className="text-brand font-semibold" target="_black" title={`Correo del usuario ${name}`}>{email}</a>
        </div>
    );
}