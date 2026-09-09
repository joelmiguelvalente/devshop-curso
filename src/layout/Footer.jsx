// src/layout/Footer.jsx
const Footer = ({ brand }) => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-3 bg-background-glass opacity-4">
            <p className="footer-credits text-center py-1 text-sm text-muted border-1">
                <strong className="font-bold">{brand}</strong> &copy; {currentYear}. Todos los derechos reservados.
            </p>
        </footer>
    );
};

export default Footer;
