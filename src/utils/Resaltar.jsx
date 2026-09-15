export function Resaltar({ text, highlight }) {
    const partes = text.split('%s');
    if (!highlight || partes.length === 1) {
        return <>
            {text}
        </>;
    }
    let newHightlight = <>
        <span className="font-black text-brand">{highlight}</span>
    </>
    return (
        <>
            {partes[0]}{newHightlight}{partes[1]}
        </>
    );
}