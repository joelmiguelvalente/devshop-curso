// /src/layout/global/Header.jsx
import Navbar from '@layout/global/Navbar';
// Utilidad
import { Resaltar } from '@utils/Resaltar';

const Hero = ({ heading, subheading }) => {
    return <div className="hero backdrop-filter relative h-full flex justify-center items-center">
        <div className="flex justify-center items-center flex-col z-1">
            <h1 className="heading-title mb-3">{Resaltar(heading)}</h1>
            <h2 className="heading-subtitle text-2xl">{Resaltar(subheading)}</h2>
        </div>
    </div>
}

const Header = ({ hero, heading, subheading, from = 'global' }) => {

    let classHeader = '';

    if(from === 'auth' || from === 'admin' || !hero) {
        classHeader += 'py-7 sticky top-0 z-2 flex justify-between items-center';
    }
    if(from === 'global' && hero) {
        classHeader += 'header relative z-1 aspect-video w-full object-cover';
    }

    return (
        <header className={classHeader}>
            {(from === 'global' && hero) && (
                <img
                    src="/images/hero.webp"
                    alt="Header principal del sitio"
                    width="1440"
                    height="960"
                    className="top-0 absolute h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                />
            )}
            <Navbar />
            {hero && <Hero heading={heading} subheading={subheading} />}
        </header>
    )
}

export default Header;