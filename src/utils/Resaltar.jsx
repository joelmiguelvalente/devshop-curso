export function Resaltar({ text, highlight }) {
    const partes = text.split('%s');
    if (!highlight || partes.length === 1) {
        return <>
            {text}
        </>;
    }
    const [first, last] = partes;
    return (
        <>
            {first}<span className="font-black text-brand">{highlight}</span>{last}
        </>
    );
}