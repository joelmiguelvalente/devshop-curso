# Changelog

Todos los cambios importantes del proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y el proyecto utiliza [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/).
Los números de versión son hitos de desarrollo, ya que el repositorio no tiene tags.

## [1.0.0] — 2026-11-10

### Added
- `Select` para el rol en `UsuariosForm` con opciones `admin` y `user`.
- Headers de seguridad en Vercel: CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy y Permissions-Policy.

### Changed
- `lucide-react` a `1.70.0` y `sass` a `1.108.1`.
- Sourcemaps desactivados en compilación de producción para no exponer el código fuente.

### Fixed
- `AuthContext` ahora captura errores al cargar el perfil y siempre finaliza el estado de carga, evitando el bloqueo de la app.
- CSP actualizada para permitir los scripts de Google Analytics (`googletagmanager.com` y `google-analytics.com`).

### Chore
- Overrides de `minimatch` y `uuid` en `pnpm-workspace.yaml` por seguridad.

## [0.9.0] — 2026-11-04 / 2026-11-07

### Added
- Componente `SEO` reutilizable con metadata nativa de React 19.
- Metadata SEO aplicada a las páginas públicas con fallback en `index.html`.
- Imágenes de producto responsive con `<picture>` por breakpoints.
- Configuración de `purgecss` y actualización de dependencias.

### Changed
- Estados de carga y error manejados con early returns en páginas públicas, admin y Nosotros.
- `className` dinámico reemplazado por objetos de mapeo.
- Debounce de 300 ms en el buscador del navbar.
- Subconjunto de PlusJakartaSans con preload desde `public`.

### Fixed
- Preload de imagen corregido cuando se recibe una URL directa.
- Canonicals conflictivos al embeber `Productos` en `Inicio`.

### Chore
- Dependencias pesadas divididas en chunks separados: `firebase`, `react-vendor` e `icons`.

## [0.8.0] — 2026-10-31

### Added
- Navbar responsivo con buscador integrado a lo ancho y área de toque optimizada.
- Carpeta `.well-known` para verificaciones del servidor.
- Nueva imagen hero en formato `webp`.

### Changed
- Imágenes locales eliminadas; hero migrado a `webp` con precarga y `preconnect`.
- Lazy loading aplicado en el `Aside` del dashboard.
- Diseño del perfil adaptado a rejilla responsive.

### Fixed
- Inicialización de Firestore corregida (error de configuración de caché).

### Chore
- Sourcemaps activados temporalmente en producción para depuración.
- Estrategia de conexión de Firestore optimizada para auditorías móviles.
- Actualización de `lucide-react` y optimización de `srcSet`/`sizes` en el componente `Image`.

## [0.7.0] — 2026-10-29

### Added
- Buscador instantáneo con sugerencias y página de resultados.
- Página de perfil con pestañas de datos, favoritos, cupones y compras con sincronización por hash.
- Edición de nombre y avatar desde el perfil, y cambio de contraseña.
- Paginación en la grilla de productos.

### Changed
- Subida de avatar extraída a `useAvatarUpload` y reutilizada en `UsuariosForm`.
- `updatePassword` centralizado en `auth.service` como `updateUserPassword`.
- `Image`, `Precio`, `Rate` y `Layout` migrados a exportaciones nombradas.
- `STORAGE_KEY` extraído a `src/constants/storage.js`.
- Imports ordenados por tipo con comentarios de sección.

### Fixed
- Se conserva la instancia real de `Firebase User` y se expone el rol aparte en el contexto.
- `Form` conserva clases y medidas por defecto cuando no recibe `className`.
- `Input` tolera la ausencia de `name`; se asigna `name` al campo de email del perfil.
- `Empty` recibe las props reales (`tipo`, `heading`, `content`) en `Buscar`.
- Alt/title del avatar, target del enlace, estados de carga, error y badge de rol en el perfil.
- Clases de variante aplicadas a los links de login y registro en `Usuario`.

### Docs
- README actualizado: buscador, paginación, `STORAGE_KEY`, perfil con pestañas y `useAvatarUpload`.
- Políticas actualizadas: clave de voto en `localStorage` y uso de Firebase Analytics.

## [0.6.0] — 2026-10-23

### Added
- Autenticación con Firebase Auth y rutas protegidas.
- Módulo de categorías con reasignación de productos.
- Widgets de estadísticas en el dashboard.
- Protección del registro con Cloudflare Turnstile.

### Changed
- Formularios del admin migrados a `react-hook-form`.
- Flujo de eliminación compartido en el admin.
- Tienda pública con detalle por slug y reseñas.
- Constantes de colecciones y configuración centralizada.
- Componentes UI, SCSS, layouts y bloques de estado refactorizados.

### Fixed
- Atributos ARIA del menú de navegación y del selector de tema corregidos.

### Performance
- Tamaño de bundle optimizado y `manualChunks` configurado para librerías pesadas.
- Reglas CSS no utilizadas eliminadas y espaciado del menú adaptable optimizado.
- `getFirestore` reemplazado por `initializeFirestore` con long polling.

### Docs
- README, `llms.txt` y screenshot actualizados.
- Documentadas las claves de Turnstile.

## [0.5.0] — 2026-10-07 / 2026-10-14

### Added
- Primitivas UI: `Inputs`, `Form`, `Table`, `Modal`, `Paginator`, `Image` y `Section`.
- Capa de datos de Firestore: `useQuery`, storage y seeder.
- CRUD de administración de productos, usuarios y cupones.
- Cupones y contextos de datos.

### Changed
- Layouts global y de dashboard, rutas y reorganización de páginas.
- Componentes de tienda adaptados a los nuevos layouts y contextos.
- Utilidades y componentes CSS portados a SCSS.
- `ToggleMode` extraído y factory `createLayout` con variante de footer.

### Fixed
- `limitTo` aplicado en `Productos` para respetar el límite.

### Removed
- Seeder de un solo uso eliminado.

### Docs
- README y `llms.txt` actualizados: rutas, SCSS, Firestore e imágenes.

## [0.4.0] — 2026-09-23 / 2026-09-28

### Added
- Librería `lucide-react` e iconos.
- Migración de datos a Firebase Firestore.
- Hook `useUpload` para imágenes.
- Seeder y `pnpm-workspace.yaml`.
- Archivo `llms.txt` para navegación agentica.

### Changed
- Mejoras de accesibilidad y estilos.
- Configuración de Vite y estilos base ajustados.

### Fixed
- Nombre de archivo corregido (letra "s" faltante).

### Docs
- README y `llms.txt` actualizados.

## [0.3.0] — 2026-09-14 / 2026-09-21

### Added
- React Router con layouts y páginas.
- Carrito de compras con contexto y estilos.
- Contexto de productos con un solo fetch.
- Página 404 y fallback SPA para el despliegue.
- Auto-cierre de alertas tras 4 segundos.
- Favicon en `webp` y assets.
- Página de políticas de privacidad.
- Componentes para añadir al carrito y a favoritos.
- Puntajes de productos y botones de compra.

### Changed
- Footer mejorado con navegación y bloques.
- Hook de favoritos unificado y carrito simplificado.
- `formatearPrecio` reemplazado por `obtenerPrecios`.
- `excerpt` y `description` separados en productos.
- Utilidades `pt-pb-mt-mb` normalizadas.
- Diseño responsive mejorado y contraste del badge de descuento.
- Configuración de Vercel con `robots.txt`.
- Alias de estilos configurado.

### Fixed
- Item completo pasado al aumentar la cantidad en el carrito.
- Contador conectado con la cantidad agregada al carrito.
- IDs almacenados como números forzados.

### Docs
- README actualizado con routing, carrito y estructura.
- Fallback SPA documentado para Vercel y Netlify.

## [0.2.0] — 2026-09-10 / 2026-09-11

### Added
- Descripción en los productos.

### Changed
- Esquema de productos migrado al inglés.
- Componentes simplificados y props/parámetros no utilizados eliminados.

### Fixed
- Parámetro por defecto `1` en cantidad.
- Parámetro por defecto `0` en descuento.
- Formulario alineado con el esquema en inglés y alerta.

## [0.1.0] — 2026-09-09

### Added
- Commit inicial del proyecto.

### Fixed
- Sintaxis de color relativo reemplazada para corregir el despliegue en Vercel.
- Accesibilidad, jerarquía de etiquetas y SEO del sitio optimizados.
