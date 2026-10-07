import { cn } from "@utils/Utils";
const act = (main, cx) => cn(main, (cx !== '') && cx);

export const Table = ({ children }) => <table className="table">{children}</table>;
export const TCaption = ({ children }) => <caption className="table-caption">{children}</caption>;
export const TBody = ({ children }) => <tbody className="table-body">{children}</tbody>;
export const THead = ({ children }) => <thead className="table-heading">{children}</thead>;
export const TFoot = ({ children }) => <tfoot className="table-footer">{children}</tfoot>;
export const TRow = ({ children, cx = '' }) => <tr className={act('table-strip', cx)}>{children}</tr>;

export const THeadItem = ({ cx = '', value, children, colSpan = 1, scope = 'col' }) => {
    return <th className={act('table-th', cx)} colSpan={colSpan} scope={scope}>{value ?? children}</th>;
};

export const TData = ({ cx = '', value, children, colSpan = 1 }) => {
    return <td className={act('table-item', cx)} colSpan={colSpan}>{value ?? children}</td>;
};
