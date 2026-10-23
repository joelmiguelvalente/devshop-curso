// /src/layout/Layout.jsx
import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import { Sun, Moon } from 'lucide-react';
import { Title, Configuracion } from '@constants/configuration';
import { Button } from '@ui/Button';
// Secciones
import Header from '@layout/global/Header';
import { Footer } from '@layout/global/Footer';

const modeLight = 'light';
const modeDark = 'dark';

const ToggleMode = () => {

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || modeLight);
    const toggleTheme = () => setTheme(prevTheme => (prevTheme === modeLight ? modeDark : modeLight));

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', (theme === modeDark ? modeDark : modeLight));
        localStorage.setItem('theme', theme);
    }, [theme]);

    return (
        <div className="fixed bottom-1 right-1 z-99">
            <Button aria-label="Cambiar modo de Dark/Light" onClick={toggleTheme}>
                {theme === 'light' ? <Moon aria-hidden="true" /> : <Sun aria-hidden="true" />}
            </Button>
        </div>
    )
}

const createLayout = ({
    hero = false,
    footerLarge = false
}) => {
    const { brandShort, heading, subheading } = Configuracion;
    return (
        <>
            <Header hero={hero} brand={Title} short={brandShort} heading={heading} subheading={subheading} />
            <main className={`container ${hero ? 'mb-3 pt-4' : 'mb-3 mt-3 pt-3'}`}>
                <Outlet />
            </main>
            <Footer brand={Title} isFull={footerLarge} />
            <ToggleMode />
        </>
    )
}

export const Layout = () => createLayout({
    footerLarge: true
});

export const LayoutWithHero = () => createLayout({
    hero: true,
    footerLarge: true
});

export const LayoutSimple = () => createLayout({
    hero: false,
    footerLarge: false
});