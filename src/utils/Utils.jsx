export const cn = (...inputs) => {
    return inputs.flat(Infinity).filter(Boolean).map(item => {
        if (typeof item === 'object') {
            return Object.entries(item).filter(([, value]) => Boolean(value)).map(([key]) => key).join(' ');
        }
        return item;
    }).join(' ').trim().replace(/\s+/g, ' ');
}