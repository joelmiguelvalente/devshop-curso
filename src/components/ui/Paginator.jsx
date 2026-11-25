// src/components/ui/Paginator.jsx
// Componente
import { Button } from '@ui/Button';
import { usePaginatorAdvance } from '@hooks/usePaginator';

export function Paginator({ data, limit = 12, ventana = 5 }) {
    const {
        productosVisibles,
        paginaActual,
        totalPaginas,
        paginas,
        irAPagina,
        anterior,
        siguiente,
    } = usePaginatorAdvance(data, limit, ventana);

    return {
        // API vieja: no la rompas, la usan las 5 páginas
        data: productosVisibles,
        current: paginaActual,
        next: siguiente,
        prev: anterior,
        total: totalPaginas,

        // API nueva para los números
        paginas,
        irAPagina,
    };
}

function PageButton({ fn, disabled, children, ...props }) {
    return (
        <Button onClick={fn} disabled={disabled} {...props}>
            {children}
        </Button>
    )
}

export function PageNumbers({ paginas, actual, irAPagina }) {
    return (
        <>
            {paginas.map((item, i) =>
                item.tipo === 'dots' ? (
                    <PageButton key={`dots-${i}`} variant="ghost" fn={() => irAPagina(item.destino)} aria-label={item.dir < 0 ? 'Saltar páginas atrás' : 'Saltar páginas adelante'}>…</PageButton>
                ) : (
                    <PageButton key={item.valor} fn={() => irAPagina(item.valor)} variant={item.valor === actual ? 'brand' : 'ghost'} aria-current={item.valor === actual ? 'page' : undefined}>{item.valor}</PageButton>
                )
            )}
        </>
    );
}

export function PageWrap({ children }) {
    return <div className="mt-3 flex justify-center items-center gap-3">{children}</div>
}

export function PagePrev({ prev, actual }) {
    return <PageButton fn={prev} disabled={actual === 1}>Anterior</PageButton>
}

export function PageNext({ next, actual, total }) {
    return <PageButton fn={next} disabled={actual === total}>Siguiente</PageButton>
}

export function PageCount({ actual, total }) {
    return <span>Página {actual} de {total}</span>
}

