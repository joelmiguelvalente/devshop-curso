# Curso React - DevShop

Para el curso de ReactJS y este es el proyecto donde practico. Es una tienda ficticia en mi caso llamada DevShop, hecha con Vite.

La idea es ir aplicando lo que veo en clase: componentes, props, estado, efectos, formularios, etc.

## Sobre el proyecto

Es un e-commerce bien simple. Tiene un header con navbar, una parte de productos destacados, el catálogo completo, una sección de nosotros con el equipo y un formulario para agregar productos nuevos.

Los productos y el equipo por ahora salen de unos JSON locales que están en `public/data`. Las imágenes también están en `public`.

Además tiene favoritos guardados en localStorage y un contador de stock en cada producto.

## Tecnologías

- React 19
- Vite
- ESLint
- CSS con variables y estilo propios
- ImgBB para subir las imágenes del formulario

## Lo que estoy practicando

- Componentes funcionales y pasar props
- useState y useEffect
- Hooks propios como useFetch, useCounter y useFavorito
- Formularios controlados
- Fetch con estados de carga y error
- Render condicional y listas con map
- Guardar favoritos en localStorage
- Reutilizar componentes chiquitos de UI (botones, alertas, precios, etc)

## Estructura del proyecto

```
src/
  layout/        Header, Navbar, Footer, Layout
  components/    Productos, Formulario, Nosotros y ui
  hooks/         useFetch, useCounter, useFavorito...
  utils/         helpers para precios, favoritos...
  App.jsx
  main.jsx
public/
  data/          productos.json, nosotros.json
  images/        fotos de productos y avatares
```

Uso alias con `@` para importar más cómodo, por ejemplo `@components`, `@hooks`, `@layout`. Están configurados en el `vite.config.js`.

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

## Variables de entorno

El formulario sube la imagen a [ImgBB](https://imgbb.com/), así que hace falta una API key.

Crear un `.env` en la raíz con:

```
VITE_API_KEY=tu_clave
```

La conseguís gratis en [api.imgbb.com](https://api.imgbb.com/). Después de crear el `.env` hay que reiniciar el dev server.

## Notas

Es un proyecto de aprendizaje, así que el código va cambiando a medida que avanzo con el curso. Todavía no tiene router ni backend, todo es local.

Vista previa:
![Vista principal de DevShop](screenshot.png)