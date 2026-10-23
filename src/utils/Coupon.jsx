// src/utils/Coupon.jsx
import { COLECCION } from '@constants/collections';
import { findMany } from '@services/firestore.service';

// Normaliza lo que escribe el usuario al formato del schema (mayúsculas, sin espacios)
export const normalizeCode = (code = '') => code.trim().toUpperCase();

export function checkCoupon(coupon, subtotal = 0) {
    if (!coupon) return { ok: false, message: '' };
    if (!coupon.isActive) return { ok: false, message: 'El cupón está inactivo.' };
    const now = Date.now();
    if (coupon.startDate && new Date(coupon.startDate).getTime() > now) {
        return { ok: false, message: 'El cupón aún no es válido.' };
    }
    if (coupon.expirationDate && new Date(coupon.expirationDate).getTime() < now) {
        return { ok: false, message: 'El cupón venció.' };
    }
    if (coupon.usageLimit > 0 && coupon.usageCount >= coupon.usageLimit) {
        return { ok: false, message: 'El cupón agotó sus usos.' };
    }
    if (subtotal < (coupon.minOrderAmount || 0)) {
        return { ok: false, message: `Necesitás al menos ${coupon.minOrderAmount} para usar este cupón.` };
    }
    return { ok: true, message: '' };
}

export async function validateCoupon(code, subtotal = 0) {
    const clean = normalizeCode(code);
    if (!clean) return { ok: false, message: 'Ingresá un código.' };
    // eslint-disable-next-line no-useless-assignment
    let found = null;
    try {
        const docs = await findMany(COLECCION.cupones, { filters: [['code', '==', clean]] });
        found = docs[0] ?? null;
    } catch {
        return { ok: false, message: 'No se pudo validar el cupón, probá de nuevo.' };
    }
    if (!found) return { ok: false, message: 'El cupón no existe, revisá el código.' };
    const check = checkCoupon(found, subtotal);
    if (!check.ok) return { ok: false, message: check.message };
    return { ok: true, coupon: found, message: '' };
}

export function calcDiscount(coupon, subtotal = 0) {
    if (!coupon || subtotal <= 0) return 0;
    // eslint-disable-next-line no-useless-assignment
    let amount = 0;
    if (coupon.discountType === 'percentage') {
        amount = subtotal * (Number(coupon.discountValue) / 100);
        const cap = Number(coupon.maxDiscountAmount) || 0;
        if (cap > 0) amount = Math.min(amount, cap);
    } else {
        amount = Math.min(Number(coupon.discountValue) || 0, subtotal);
    }
    return Math.max(0, Math.round(amount));
}
