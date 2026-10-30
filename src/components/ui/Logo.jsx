// src/components/ui/Logo.jsx
import { Link } from 'react-router';
// Constantes
import { Title, brandShort } from '@constants/configuration';

function IconoLogo() {
    return <span className="logo-short bg-brand text-brand-foreground rounded-2 flex justify-center items-center text-md font-black">{brandShort}</span>
}

export function Logo() {
    return (
        <Link to="/" className="brand-text text flex justify-start items-center gap-2">
            <IconoLogo />
            <span className="none md:inline-block font-bold text-lg">{Title}</span>
        </Link>
    )
}