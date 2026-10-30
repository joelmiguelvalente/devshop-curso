// src/pages/public/Buscar.jsx
import { useState, useMemo } from 'react';
// Libreria
import { useSearchParams } from 'react-router';
// Constante
import { COLECCION } from '@constants/collections';
// Componentes
import { Empty } from '@blocks/Empty';
import { EstadoCarga } from '@blocks/EstadoCarga';
// Hooks
import { useFirestoreQuery } from '@hooks/useFirestore';
import { useProductos } from '@hooks/useProductos';
// Seccion
import { ProductoItem } from '@public/Producto/ProductoItem';

export const Buscar = () => {

	const [searchParams, ] = useSearchParams();
	const query = searchParams.get('q') || '';

	const { data: productos, loading, error } = useProductos();
	const {
        data: categorias
    } = useFirestoreQuery(COLECCION.categorias, { order: ['name', 'asc'] });

	// Estados locales para los filtros activos
	const [selectedCategory, setSelectedCategory] = useState('todas');
	const [maxPrice, setMaxPrice] = useState('');
	const [onlyInStock, setOnlyInStock] = useState(false);
	const [sortBy, setSortBy] = useState('relevancia');

	// Procesamiento y filtrado de datos mediante useMemo para rendimiento óptimo
	const { resultadosFiltrados, categoriasDisponibles, maxPrecioCatalogo } = useMemo(() => {
        if (!productos) return { resultadosFiltrados: [], categoriasDisponibles: [], maxPrecioCatalogo: 0 };

        // 1. FILTRADO BASE: Por término de búsqueda de la URL
        const deBusqueda = productos.filter((prod) =>
            prod.title.toLowerCase().includes(query.toLowerCase()) ||
            (prod.description && prod.description.toLowerCase().includes(query.toLowerCase()))
        );

        // FUNCIÓN AUXILIAR: Calcula el precio real final aplicando el descuento (si existe)
        const getPrecioFinal = (prod) => {
            const precioBase = Number(prod.price) || 0;
            // Si tu campo de descuento se llama 'descuento', 'discount' u 'off', adáptalo aquí:
            if (prod.discount && prod.discount > 0) {
                return precioBase - (precioBase * (prod.discount / 100));
            }
            return precioBase;
        };

        // 2. MAPEO INICIAL: Añadimos temporalmente el precio final calculado a cada producto
        let productosConPrecioReal = deBusqueda.map(prod => ({
            ...prod,
            precioFinalCalculado: getPrecioFinal(prod)
        }));

        // EXTRA: Extraemos las categorías presentes en la búsqueda inicial
        const cats = [...new Set(productosConPrecioReal.map((p) => p.category).filter(Boolean))];
        const catsNames = [
            { name: 'Todas las categorías', slug: 'todas' },
            ...cats.map((slug) => {
                const catEncontrada = categorias?.find((c) => c.slug === slug);
                return {
                    slug: slug,
                    name: catEncontrada ? catEncontrada.name : slug
                };
            })
        ];

        // El precio máximo del catálogo se calcula en base al mayor PRECIO FINAL CON DESCUENTO
        const altoPrecio = productosConPrecioReal.length
            ? Math.ceil(Math.max(...productosConPrecioReal.map((p) => p.precioFinalCalculado)))
            : 0;

        // 3. APLICAR FILTROS LATERALES (Usando ahora 'precioFinalCalculado')
        if (selectedCategory !== 'todas') {
            productosConPrecioReal = productosConPrecioReal.filter((p) => p.category === selectedCategory);
        }
        if (maxPrice) {
            productosConPrecioReal = productosConPrecioReal.filter((p) => p.precioFinalCalculado <= Number(maxPrice));
        }
        if (onlyInStock) {
            productosConPrecioReal = productosConPrecioReal.filter((p) => (p.stock || 0) > 0);
        }

        // 4. APLICAR ORDENAMIENTO (También usando el precio final real)
        if (sortBy === 'precio-asc') {
            productosConPrecioReal.sort((a, b) => a.precioFinalCalculado - b.precioFinalCalculado);
        } else if (sortBy === 'precio-desc') {
            productosConPrecioReal.sort((a, b) => b.precioFinalCalculado - a.precioFinalCalculado);
        }

        return {
            resultadosFiltrados: productosConPrecioReal,
            categoriasDisponibles: catsNames,
            maxPrecioCatalogo: altoPrecio
        };
    }, [productos, selectedCategory, maxPrice, onlyInStock, sortBy, query, categorias]);

	if (loading) return <EstadoCarga />;
	if (error) return <Empty tipo="error" />;

	return (
		<div className="container search-page-layout flex gap-2 py-2">

			{/* BARRA LATERAL DE FILTROS */}
			<aside className="filters-sidebar" style={{ width: '260px', flexShrink: 0 }}>
				<h3 className="text-xl">Resultados para "{query}"</h3>
				<p>{resultadosFiltrados.length} productos encontrados</p>

				<hr />

				{/* Filtro de Categorías */}
				<div className="filter-group">
					<h4>Categorías</h4>
					<ul>
						{categoriasDisponibles.map(({ slug, name }, i) => (
							<li key={i} style={{ margin: '0.5rem 0' }}>
								<button
									onClick={() => setSelectedCategory(slug)}
									style={{
										background: 'none',
										border: 'none',
										fontWeight: selectedCategory === slug ? 'bold' : 'normal',
										color: selectedCategory === slug ? 'var(--text-primary)' : 'var(--text-secondary)',
										cursor: 'pointer'
									}}
								>
									{name === 'todas' ? 'Todas las categorías' : name}
								</button>
							</li>
						))}
					</ul>
				</div>

				{/* Filtro de Precio Máximo */}
				<div className="filter-group mt-4">
					<h4>Precio Máximo</h4>
					<input
						type="range"
						min="0"
						max={maxPrecioCatalogo}
						value={maxPrice === '' ? maxPrecioCatalogo : maxPrice}
						onChange={(e) => setMaxPrice(e.target.value)}
					/>
					<div>Hasta: ${maxPrice === '' ? maxPrecioCatalogo : maxPrice}</div>
				</div>

				{/* Filtro de Stock */}
				<div className="filter-group mt-4">
					<label className="flex items-center gap-1" style={{ cursor: 'pointer' }}>
						<input
							type="checkbox"
							checked={onlyInStock}
							onChange={(e) => setOnlyInStock(e.target.checked)}
						/>
						Solo disponibles en stock
					</label>
				</div>
			</aside>

			{/* CONTENIDO PRINCIPAL DE RESULTADOS */}
			<main className="search-results-main grow-1">
				<div className="results-header flex justify-between mb-4">
					<div></div>
					{/* Selector de ordenamiento */}
					<div className="sort-container">
						<label htmlFor="sort">Ordenar por: </label>
						<select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
							<option value="relevancia">Relevancia</option>
							<option value="precio-asc">Menor precio</option>
							<option value="precio-desc">Mayor precio</option>
						</select>
					</div>
				</div>

				{resultadosFiltrados.length === 0 ? (
					<Empty tipo="busqueda" content="No encontramos productos que coincidan con tus filtros." />
				) : (
					<div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
						{resultadosFiltrados.map((producto) => (
							<ProductoItem key={producto.id} {...producto} />
						))}
					</div>
				)}
			</main>
		</div>
	);
};
