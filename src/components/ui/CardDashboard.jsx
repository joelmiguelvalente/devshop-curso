export function CardDashboard({ children, cx }) {
    let addClass = cx === '' ? '' : cx;
    return (
        <div className={`border rounded-3 py-5 px-4 relative shadow-md overflow-hidden ${addClass}`}>
            {children}
        </div>
    )
}