// src/constants/collections.js

// En caso de cambiarle el nombre a las colecciones lo hago de una sola vez desde este const
export const COLECCION = Object.freeze({
    usuarios:   'team',
    productos:  'products',
    cupones:    'coupons',
    categorias: 'categories'
});

// Por el momento lo usa "modalEliminar"
export const SINGULAR = Object.freeze({
    usuario:    'usuario',
    producto:   'producto',
    cupon:      'cupón',
    categoria:  'categoría'
});

// Por si decido llamarlo 'administrador'
export const ADMINISTRADOR = 'admin';

// Lo mismo para este, lo podría llamar 'novato'
export const ROL_DEFAULT = 'user';