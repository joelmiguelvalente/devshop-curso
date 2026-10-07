import { Link } from 'react-router';
import { Title, brandShort } from '@components/Configuracion';

function IconoLogo() {
    return <span className="logo-short bg-brand text-brand-foreground rounded-2 flex justify-center items-center text-md font-black">{brandShort}</span>
}

export function Logo() {
    return (
        <Link to="/" className="brand-text text flex justify-start items-center gap-2 font-bold text-lg">
            <IconoLogo />
            {Title}
        </Link>
    )
}