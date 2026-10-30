// src/pages/global/Error404.jsx
// Libreria
import { useParams, Link } from "react-router";
// Componente
import { Button } from "@ui/Button";

export function Error404() {
    const params = useParams();
    const pagina = params["*"];

    return (
        <div className="empty flex flex-col gap-4 items-center justify-center">
            <h1 className="text-3xl">Esta página no existe</h1>
            <p className="text-lg">
                No pudimos encontrar la ruta: <strong>/{pagina}</strong>
            </p>
            <Link to="/" className="no-underline">
                <Button variant="brand" size="md">
                    Volver al inicio
                </Button>
            </Link>
        </div>
    );
}