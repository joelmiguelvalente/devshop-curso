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
| `/producto/:id` | Detalle de producto |
| `/carrito` | Carrito de compras |
| `/alta` | Formulario para agregar productos nuevos |
| `/politicas` | Política de privacidad |
| `*` | Página 404 (`Error404`) |

Hay dos layouts con `Outlet`: uno con `hero` (solo el inicio) y otro sin hero para el resto de las rutas.

Los productos y el equipo salen de **Firebase Firestore** (colecciones `products` y `team`). Cada producto tiene `excerpt` (texto corto para la card) y `description` (texto largo para el detalle). Las imágenes de los productos se suben a [ImgBB](https://imgbb.com/) desde el formulario de alta.

Además tiene:

- **Favoritos** guardados en localStorage, sincronizados entre componentes con el evento custom `local-storage-update`.
- **Contador de stock** en cada producto (`useCounter` respeta el stock máximo).
- **Carrito de compras** con Context (`CartContext` + `useCart`): agregar, quitar, sumar/restar cantidad, total y vaciar.
- **Catálogo centralizado** con `ProductsContext` + `useProductos`, así el fetch de productos se hace una sola vez en el provider y no en cada componente.
- **Textos de la UI centralizados** en `src/components/Configuracion.jsx` (títulos, secciones, links).
- **Precios formateados** con `Intl.NumberFormat` en `es-AR` / ARS (`src/utils/CompactNumber.jsx`).

## Tecnologías

- React 19
- React Router 8 (paquete `react-router`)
- Vite 8
- Firebase 12 (Firestore)
- ESLint 10
- CSS con tokens/variables y utilidades propias (`tokens.css`, `extends.css`, `index.css`)
- Lucide Icons
- ImgBB para subir las imágenes del formulario

## Lo que estoy practicando

- Componentes funcionales y pasar props
- useState y useEffect
- Hooks propios como useFetch, useFirebaseDB, useUpload, useCounter, useFavorito, useCart y useProductos
- Formularios controlados
- React Router: rutas, layouts con Outlet, rutas dinámicas con useParams y 404 con `path="*"`
- Context para el carrito y para el catálogo (provider + hook propio, con validación si se usa fuera del provider)
- Fetch con estados de carga y error, y protección contra updates desactualizados
- Render condicional y listas con map
- Guardar favoritos en localStorage y sincronizarlos entre componentes con eventos
- Reutilizar componentes chiquitos de UI (botones, alertas, precios, badges, etc)
- Design tokens en CSS y sistema propio de utilidades

## Datos con Firebase Firestore

Los productos y el equipo viven en Firestore. El acceso está centralizado en `src/hooks/useFirebaseDB.jsx`:

```js
// Lecturas (hooks con estado: datos, error, cargando, recargar)
useGetAll('products')                                        // todos
useGetAll('products', { orden: ['rating.rate', 'desc'] })    // ordenados
useGetAll('products', { filters: [['outstanding', '==', true]] }) // por campo
useGetAll('products', { filters: [...], limite: 4 })          // con límite
useGetSingle('products', id)                                 // por id

// Escrituras (funciones async)
await addDocument('products', data)        // crea y devuelve el id
await setDocument('products', id, data)    // crea/reemplaza con id fijo
await updateDocument('products', id, data)  // actualiza
await deleteDocument('products', id)       // elimina
```

La subida de imágenes del formulario está en `src/hooks/useUpload.jsx` (ImgBB, con loading/error propios).

## Estructura del proyecto

```
src/
  assets/        fuentes e imágenes propias (hero, Plus Jakarta Sans)
  components/    Cart, Configuracion, Formulario, Nosotros, Productos y ui
  context/       CartContext (carrito), ProductsContext (catálogo)
  firebase/      config (initializeApp + Firestore)
  hooks/         useFetch, useFirebaseDB, useUpload, useCounter, useFavorito, useCart, useProductos
  layout/        Layout, parts (Header, Navbar, Footer)
  pages/         Home, ProductoDetalle, Politicas, Error404
  styles/        tokens.css, extends.css, index.css
  utils/         CompactNumber (precios), Favoritos (localStorage), Resaltar
  App.jsx        rutas con Routes y Route
  main.jsx       BrowserRouter + CartProvider + ProductsProvider
public/
  images/        avatares
```

Uso alias con `@` para importar más cómodo: `@`, `@assets`, `@components`, `@context`, `@hooks`, `@layout`, `@pages`, `@styles`, `@ui`, `@utils`. Están configurados en el `vite.config.js`.

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
pnpm lint
pnpm build
pnpm preview
```

## Deploy (no olvidar el fallback SPA)

Como se usa `BrowserRouter`, el servidor debe devolver `index.html` en cualquier ruta. Sin esto, recargar o entrar directo a `/producto/1234` da **Page Not Found**:

- **Vercel:** `vercel.json` con `rewrites` de `/(.*)` a `/index.html` (más una excepción para `robots.txt`, `sitemap.xml` y `favicon.ico`).
- **Netlify:** `public/_redirects` con `/* /index.html 200` (Vite lo copia a `dist` en el build).

Cada plataforma lee solo su archivo, pueden convivir.

## Variables de entorno

El formulario sube la imagen a [ImgBB](https://imgbb.com/), así que hace falta una API key. Y como los datos ahora viven en **Firebase Firestore**, también hacen falta las credenciales del proyecto.

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
```

La API key de ImgBB la conseguís gratis en [api.imgbb.com](https://api.imgbb.com/). Las de Firebase están en la consola de tu proyecto (Project settings → General → Your apps). Después de crear el `.env` hay que reiniciar el dev server.

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
