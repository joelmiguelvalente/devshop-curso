export const THead = ({ items }) => {
    return (
        <thead>
            <tr>
                {items.map((item, index) => (
                    <th key={index}>{item}</th>
                ))}
            </tr>
        </thead>
    )
}