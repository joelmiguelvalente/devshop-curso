// src/pages/profile/Profile.jsx
import { useLocation, useNavigate } from 'react-router';
// Constante
import { COLECCION, ADMINISTRADOR } from '@constants/collections';
// Componentes
import { Empty } from '@blocks/Empty';
import { EstadoCarga } from '@blocks/EstadoCarga';
import { Button } from '@ui/Button';
import { Image } from '@ui/Image';
// Hooks
import { useAuth } from '@hooks/useAuth';
import { useFirestoreDoc } from '@hooks/useFirestore';
// Secciones
import { PerfilDatos } from '@pages/profile/modulos/PerfilDatos';
import { PerfilFavoritos } from '@pages/profile/modulos/PerfilFavoritos';
import { PerfilCupones } from '@pages/profile/modulos/PerfilCupones';
import { PerfilCompras } from '@pages/profile/modulos/PerfilCompras';

const TABS = [
    { id: 'datos', label: 'Mis datos' },
    { id: 'favoritos', label: 'Favoritos' },
    { id: 'cupones', label: 'Cupones' },
    { id: 'compras', label: 'Mis compras' }
];

const esTabValida = (hash) => TABS.some(({ id }) => id === hash);

export function Profile() {

    const { user } = useAuth();
    const { data, loading, error } = useFirestoreDoc(COLECCION.usuarios, user?.uid);
    const location = useLocation();
    const navigate = useNavigate();

    // La pestaña activa se deriva del hash de la URL (#cupones, #compras, ...),
    // asi el menu del usuario puede linkear directo a una pestaña
    const desdeHash = location.hash.replace('#', '');
    const tab = esTabValida(desdeHash) ? desdeHash : 'datos';

    const irATab = (id) => navigate(`/perfil#${id}`, { replace: true });

    if (loading) return <EstadoCarga cargando={loading} mensajeCargando="Cargando tu perfil..." />;
    if (error) return <Empty tipo="error" />;

    const nickname = data?.name;
    const label = data?.label;
    const avatar = data?.avatar;
    const email = data?.email;
    const isAdmin = data?.rol === ADMINISTRADOR;

    return (
        <div className="container py-4 flex flex-col gap-4">
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

            <nav aria-label="Secciones del perfil">
                <div role="tablist" className="flex gap-2 flex-wrap">
                    {TABS.map(({ id, label: nombre }) => (
                        <Button
                            key={id}
                            id={`tab-${id}`}
                            role="tab"
                            type="button"
                            size="md"
                            variant={tab === id ? 'brand' : 'ghost'}
                            aria-selected={tab === id}
                            aria-controls={`panel-${id}`}
                            onClick={() => irATab(id)}
                        >
                            {nombre}
                        </Button>
                    ))}
                </div>
            </nav>

            <div
                role="tabpanel"
                id={`panel-${tab}`}
                aria-labelledby={`tab-${tab}`}
                tabIndex={0}
            >
                {tab === 'datos' && <PerfilDatos data={data} />}
                {tab === 'favoritos' && <PerfilFavoritos />}
                {tab === 'cupones' && <PerfilCupones />}
                {tab === 'compras' && <PerfilCompras />}
            </div>
        </div>
    );
}
