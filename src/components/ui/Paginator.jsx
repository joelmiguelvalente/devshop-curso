// src/components/ui/Paginator.jsx
import { useState } from 'react';
import { Button } from '@ui/Button';

export function Paginator({ data, limit = 12}) {

    const [pageCurrent, setPageCurrent] = useState(1);
    const itemPerPage = limit;

    const totalPage = Math.ceil(data.length / itemPerPage);

    const lastItem = pageCurrent * itemPerPage;
    const firstItem = lastItem - itemPerPage;
    const showItems = data.slice(firstItem, lastItem);

    const pageNext = () => {
        if (pageCurrent < totalPage) setPageCurrent(pageCurrent + 1);
    };

    const pagePrev = () => {
        if (pageCurrent > 1) setPageCurrent(pageCurrent - 1);
    };

    return {
        data: showItems,
        current: pageCurrent,
        next: pageNext,
        prev: pagePrev,
        total: totalPage
    }
}

function PageButton({ fn, disabled, children }) {
    return (
        <Button onClick={fn} disabled={disabled}>
            {children}
        </Button>
    )
}

export function PageWrap({ children }) {
    return <div className="mt-3 flex justify-center items-center gap-3">{children}</div>
}

export function PagePrev({ prev, current }) {
    return <PageButton fn={prev} disabled={current === 1}>Anterior</PageButton>
}
export function PageNext({ next, current, total }) {
    return <PageButton fn={next} disabled={current === total}>Siguiente</PageButton>
}

export function PageCount({ current, total }) {
    return <span>Página {current} de {total}</span>
}