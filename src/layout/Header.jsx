// /src/components/Layout/Header.jsx
import { Title } from "@components/Configuracion";
import Navbar from '@layout/Navbar';
import { Resaltar } from '@utils/Resaltar';

const Header = ({ short, heading, subheading }) => {
    return (
        <header className="relative z-1 aspect-video w-full object-cover">
            <Navbar brand={Title} brandShort={short} />
            <div className="hero backdrop-filter relative h-full flex justify-center items-center">
                <div className="mask" />
                <div className="flex justify-center items-center flex-col z-1">
                    <h1 className="heading-title mb-3">{Resaltar(heading)}</h1>
                    <h2 className="heading-subtitle text-2xl">{Resaltar(subheading)}</h2>
                </div>
            </div>
        </header>
    )
};

export default Header;