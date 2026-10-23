# Curso React - DevShop

Para el curso de ReactJS y este es el proyecto donde practico. Es una tienda ficticia en mi caso llamada DevShop, hecha con Vite.

La idea es ir aplicando lo que veo en clase: componentes, props, estado, efectos, formularios, Context, etc.

## Sobre el proyecto

Es un e-commerce bien simple. Tiene rutas con React Router:

| Ruta | Qué muestra |
|------|-------------|
| `/` | Inicio con hero, destacados y catálogo |
| `/productos` | Catálogo completo |
| `/destacados` | Solo productos destacados |
| `/c/:categoria` | Catálogo filtrado por categoría (por slug) |
| `/productos/:slug` | Detalle de producto (busca por slug y, si no aparece, por id) |
| `/carrito` | Carrito de compras |
| `/favoritos` | Productos marcados como favoritos |
| `/perfil` | Perfil del usuario logueado |
| `/politicas` | Política de privacidad (con índice y tabla de datos) |
| `/auth/login` y `/auth/register` | Ingreso y registro con Firebase Auth |
| `/admin/*` | Panel de gestión: productos, usuarios, cupones y categorías (CRUD) |
| `*` | Página 404 (`Error404`) |

Hay tres layouts públicos con `Outlet` (`Layout`, `LayoutWithHero` con hero solo en el inicio, y `LayoutSimple` para páginas como políticas), más el `Dashboard` con lateral para el panel `/admin` y `AuthLayout` para las pantallas de ingreso.

Los datos viven en **Firebase Firestore**, en las colecciones `products`, `team`, `coupons` y `categories`. Los nombres de las colecciones y los singulares están en `src/constants/collections.js` (`COLECCION` y `SINGULAR`) para no repetir strings por todo el código. Cada producto tiene `excerpt` (texto corto para la card) y `description` (texto largo para el detalle). Las imágenes de los productos se suben a [ImgBB](https://imgbb.com/) desde el formulario de alta.

Además tiene:

- **Favoritos** guardados en localStorage, sincronizados entre componentes con el evento custom `local-storage-update`.
- **Contador de stock** en cada producto (`useCounter` respeta el stock máximo).
- **Carrito de compras** con Context (`CartContext` + `useCart`): agregar, quitar, sumar/restar cantidad, total y vaciar.
- **Catálogo centralizado** con `ProductsContext` + `useProductos`, así el fetch de productos se hace una sola vez en el provider y no en cada componente.
- **Textos de la UI centralizados** en `src/constants/configuration.js` (títulos, secciones, links).
- **Precios formateados** con `Intl.NumberFormat` en `es-AR` / ARS (`src/utils/CompactNumber.jsx`).
- **Imágenes con placeholder y fallback** (`src/components/ui/Image.jsx`): mientras carga la foto real se muestra el logo precargado (sin caja gris ni saltos de layout); si falla, el logo queda como imagen final. El hook interno `useReadySrc` precarga en segundo plano respetando `srcSet`/`sizes`.
- **Panel admin** en `/admin` con CRUD de productos, usuarios, cupones y categorías. Los formularios usan react-hook-form y las reglas siguen viviendo en `src/schemas/`.
- **Login y registro** con Firebase Auth (`AuthContext` + `useAuth`, `AuthLayout` en `/auth/*`), con Cloudflare Turnstile frenando bots en el registro. El usuario se guarda en `team` con un campo `rol` (`admin` o `user`) y `/admin` está protegido con `ProtectedRoute`. Al registrarse se le genera un avatar aleatorio con [DiceBear](https://www.dicebear.com/), usando el uid como semilla.
- **Categorías con slug**: el slug se genera desde el nombre y, si cambia, los productos de esa categoría se reasignan en un mismo batch (más abajo cuento por qué).
- **Eliminar con confirmación** resuelto una sola vez en `useEliminar` + `ModalEliminar`, y estados de listado reutilizables en `src/components/blocks/` (`EstadoCarga`, `Empty` con variantes para lista vacía, sin resultados o error).

## Tecnologías

- React 19
- React Router 8 (paquete `react-router`)
- Vite 8
- Firebase 12 (Firestore + Auth)
- React Hook Form 7 + un resolver propio (sin zod ni yup)
- ESLint 10
- SCSS con sistema propio de utilidades (`index.scss` + `components.scss`) y design tokens en `tokens.css`
- Lucide Icons
- ImgBB para subir las imágenes del formulario
- Cloudflare Turnstile contra bots en el registro

## Lo que estoy practicando + Más información obtenida por busqueda

- Componentes funcionales y pasar props
- useState y useEffect
- Hooks propios como useFetch, useFirestoreQuery, useFirestoreDoc, useFirestoreLive, useUpload, useCounter, useFavorito, useCart, useProductos, useEliminar y useAuth
- Formularios con react-hook-form y esquemas de validación propios
- React Router: rutas, layouts con Outlet, rutas dinámicas con useParams, rutas protegidas por rol y 404 con `path="*"`
- Context para la sesión, el carrito y el catálogo (provider + hook propio, con validación si se usa fuera del provider)
- Autenticación con Firebase (login, registro y sesión persistente)
- Fetch con estados de carga y error, y protección contra updates desactualizados
- Escrituras en lote con `writeBatch` para operaciones que tienen que ser atómicas
- Render condicional y listas con map
- Guardar favoritos en localStorage y sincronizarlos entre componentes con eventos
- Reutilizar componentes chiquitos de UI (botones, alertas, precios, badges, etc)
- Sacar lógica repetida a hooks chicos (`useEliminar`) y a bloques con más contenido (`blocks/EstadoCarga`, `blocks/Empty`)
- Design tokens en CSS y sistema propio de utilidades generado con SCSS (bucles `@each` sobre mapas: espaciados, gaps, redondeados, breakpoints)

## Datos con Firebase Firestore

Todo lo que no es estático vive en Firestore. El acceso está centralizado en `src/services/firestore.service.js`:

- Lectura: `findMany`, `findOne`, `findManyByIds`, `countDocs`, `buildQuery` y `mapSnapshot`
- Escritura: `createDoc`, `saveDoc` (setDoc con merge), `patchDoc`, `destroyDoc` y `wBatch` (devuelve un `writeBatch` para operaciones atómicas)

Los nombres de las colecciones están en `src/constants/collections.js`, así que si algún día renombro una colección lo cambio en un solo lugar.

Los hooks de `src/hooks/useFirestore.jsx` devuelven siempre `{ data, loading, error }`:

```js
useFirestoreQuery('products', options)   // consulta puntual (filtros, orden, límite)
useFirestoreDoc('products', id)          // un documento por id
useFirestoreLive('products', options)    // suscripción en tiempo real con onSnapshot
useFirestoreQueryByIds('products', ids)  // trae varios documentos a partir de un array de ids
```

La subida de imágenes del formulario está en `src/hooks/useUpload.jsx` (ImgBB, con loading/error propios), y el login/registro en `src/services/auth.service.js`.

## Formularios

Los formularios del admin y de auth usan **react-hook-form**, pero las reglas de validación siguen siendo los objetos declarativos de `src/schemas/` (producto, usuario, cupón, categoría, login y registro). El puente entre las dos cosas es `src/utils/rhfResolver.jsx`: agarra el esquema, llama a `validarFormulario` (`src/utils/Validate.jsx`, el validador que armé antes de conocer RHF) y devuelve los errores en el formato que espera la librería.

Con eso cada formulario queda bastante más corto: `register('campo')`, `errors.campo?.message` y `handleSubmit`. Lo que no es validación (convertir precios y stocks a número, fechas a `Date`, mayúsculas en los códigos de cupón) se hace en el `onSubmit`, y los campos que no son inputs comunes (la imagen del producto y el avatar en el formulario de usuarios) se manejan aparte con `setValue`.

Los inputs de `src/components/ui/Inputs.jsx` usan `forwardRef` porque RHF necesita la referencia real del elemento.

## Categorías y `updateCategoryAndProductsBatch`

Los productos guardan el slug de su categoría como texto (`category: 'accesorios'`), no el ID del documento. Es cómodo para el catálogo público, porque `/c/:categoria` filtra directo y los links quedan lindos, pero tiene una consecuencia: si renombro la categoría, el slug cambia y los productos quedan apuntando a un slug que ya no existe.

Para que eso no pase, al editar una categoría con otro slug se llama a `updateCategoryAndProductsBatch`, que actualiza la categoría y todos sus productos en un mismo `writeBatch`: si algo falla, no se guarda nada, ni la categoría ni los productos a medias.

Ya sé que no es la forma ideal de resolverlo. Lo "correcto" sería que el producto guarde el `categoryId` y resolver el nombre al leer, o que cada categoría tenga una subcolección con sus productos. Pero con un catálogo de 20 productos preferí no complicarla: el batch es atómico, no hay que migrar datos y sigue funcionando el filtro por slug que ya tiene la web. El día que haya cientos de productos (o que el batch se acerque al límite de 500 operaciones de Firestore) lo paso a IDs.

En el formulario, el slug se genera desde el nombre con `slugify` (`src/utils/Utils.jsx`). Al crear se puede ajustar a mano (si lo tocás, el nombre deja de pisarlo), y al editar queda de solo lectura porque cambiarlo mueve productos: en ese caso siempre se calcula desde el nombre. Tampoco dejo guardar un slug repetido, para no romper la relación con los productos.

## Estructura del proyecto

```
src/
  assets/        fuentes (Plus Jakarta Sans) e imágenes propias
  components/    ui/ (Badge, Button, Table, Modal, ModalEliminar, Image, Form, Inputs, Paginator, Alerta, Rate, ...)
                 blocks/ (bloques con más contenido: EstadoCarga, Empty)
  constants/     collections.js (nombres de colecciones) y configuration.js (textos de la marca y las secciones)
  context/       AuthContext (sesión), CartContext (carrito), ProductsContext (catálogo)
  firebase/      config (initializeApp + Firestore + Auth)
  hooks/         useAuth, useCart, useCounter, useEliminar, useFavorito, useFirestore, useProductos, useUpload, ...
  layout/        Layout (público: simple / con hero), AuthLayout, Dashboard (admin) + global/ y dashboard/
  pages/         public/ (Home/, Producto/, Cart, Favoritos, Politicas), auth/ (Login, Register),
                 profile/, admin/ (index, productos, usuarios, cupones, categorias), global/Error404
  routes/        WebRoutes (pública), GestionRoutes (/admin), AuthRoutes (/auth), ProtectedRoute
  schemas/       reglas de validación (producto, usuario, cupón, categoría, login, registro)
  services/      firestore.service.js y auth.service.js
  styles/        tokens.css (design tokens), index.scss (utilidades), components.scss (componentes)
  utils/         Validate, rhfResolver, Utils (slugify, formatDate...), CompactNumber, Avatar, AuthError, ...
  App.jsx        importa los tres archivos de estilos y monta las rutas (/admin, /auth, web y 404)
  main.jsx       BrowserRouter + AuthProvider + CartProvider + ProductsProvider
public/
  images/        logos y banners
  llms.txt       resumen del proyecto para IAs
```

Uso alias para importar más cómodo: `@assets`, `@components`, `@constants`, `@context`, `@hooks`, `@layout`, `@pages`, `@routes`, `@services`, `@schemas`, `@styles`, `@utils`, más `@ui`, `@blocks`, `@dashboard`, `@public` y `@fireconfig`. Todos están en el `vite.config.js`; los de las carpetas `src/` se generan solos a partir de un array de nombres.

Un detalle: como el proyecto usa `"type": "module"`, en el `vite.config.js` no existe `__dirname` y hay que armarlo a mano con esto:

```js
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

Esto no es de React, es de Node. Lo saqué de **[Aliasing paths in Vite projects w/ TypeScript](https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo)** (uno de los comentarios)

## Para correrlo

Necesitás tener Node instalado.

```bash
pnpm install
pnpm dev
```

Después abrís http://localhost:5173

Otros comandos:

```bash
pnpm dev:force   # arranca ignorando la caché de Vite
pnpm debug       # arranca con logs de debug de Vite
pnpm lint        # revisa todo el proyecto con ESLint
pnpm lint:fix    # lo mismo pero corrigiendo lo que se pueda solo
pnpm build       # genera la versión de producción en dist/
pnpm preview     # sirve dist/ para probar el build antes de deployar
```

## Deploy (no olvidar el fallback SPA)

Como se usa `BrowserRouter`, el servidor debe devolver `index.html` en cualquier ruta. Sin esto, recargar o entrar directo a `/productos/teclado-mecanico` da **Page Not Found**:

- **Vercel:** `vercel.json` con `rewrites` de `/(.*)` a `/index.html` (más una excepción para `robots.txt`, `sitemap.xml` y `favicon.ico`).
- **Netlify:** `public/_redirects` con `/* /index.html 200` (Vite lo copia a `dist` en el build).

Cada plataforma lee solo su archivo, pueden convivir.

## Variables de entorno

El formulario sube la imagen a [ImgBB](https://imgbb.com/), así que hace falta una API key. Como los datos y la sesión viven en **Firebase**, también hacen falta las credenciales del proyecto. Y el registro se protege con **Cloudflare Turnstile**, que necesita su site key.

Crear un `.env` en la raíz con:

```
VITE_API_KEY=tu_clave
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
VITE_TURNSTILE_SITEKEY=...
```

La API key de ImgBB la conseguís gratis en [api.imgbb.com](https://api.imgbb.com/). Las de Firebase están en la consola de tu proyecto (Project settings → General → Your apps). Después de crear el `.env` hay que reiniciar el dev server.

### Cómo conseguir las claves de Turnstile

1. Crear cuenta gratis en [dash.cloudflare.com](https://dash.cloudflare.com/).
2. En el menú lateral ir a **Turnstile** (bajo Security → Bots, o buscándolo en el buscador).
3. **Add site**: un nombre, los dominios donde va a funcionar (agregar `localhost` para desarrollo y el dominio de producción) y modo **Managed** (el recomendado).
4. Al crearlo te da dos claves:
   - **Site key**: es la pública, la que va en `VITE_TURNSTILE_SITEKEY` y se usa en el frontend (`Register.jsx` la pasa al componente `<Turnstile />`).
   - **Secret key**: es privada, nunca va al navegador (en el `.env` la dejé comentada como `TURNSTILE_SECRET_KEY` sin el prefijo `VITE_`, porque las variables `VITE_` se copian al bundle y cualquiera las vería).

Para desarrollo, Cloudflare tiene claves de prueba que no dependen de tu sitio:

- `1x00000000000000000000AA` → siempre pasa (ideal en localhost).
- `2x00000000000000000000AB` → siempre bloquea (para probar el camino de error).
- `3x0000000000000000000000` → token inválido.

Un detalle de seguridad: hasta ahora solo se valida en el cliente que haya token (suficiente para frenar bots tontos). La validación de verdad es mandar el token a `https://challenges.cloudflare.com/turnstile/v0/siteverify` desde el servidor con la secret key; eso se haría cuando haya backend o Cloud Function.

### Temas y colores

El proyecto utiliza un sistema de **design tokens CSS** basado en variables personalizadas (`tokens.css`) para controlar colores, superficies, texto, bordes, estados y otros valores visuales.

Actualmente soporta:
* **Tema claro (`light`)**
* **Tema oscuro (`dark`)**
* Varias paletas de color:

  * `default`
  * `orange`
  * `material-dark`
  * `midnight`
  * `nordic`

El sistema está preparado para que posteriormente el cambio de color pueda controlarse mediante acciones de usuario, como un selector, botón o menú de configuración.

Vista previa:
![Vista principal de DevShop](screenshot.png)
