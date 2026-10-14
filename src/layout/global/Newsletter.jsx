export function Newsletter() {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-bold text-md">Newsletter</p>
            <p className="text-muted">Suscribite para recibir las últimas novedades y ofertas.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 mt-1">
                <input
                    type="email"
                    placeholder="Tu email"
                    className="w-full p-2 border border-color rounded-2"
                    required
                />
                <button
                    type="submit"
                    className="px-3 py-1.5 bg-brand text-inverse font-medium rounded hover:opacity-90 transition-opacity"
                >
                    Unirse
                </button>
            </form>
        </div>
    )
}