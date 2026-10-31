// src/components/ui/InstantSearch.jsx
import { useState, useEffect, useRef } from 'react';
// Librerias
import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
// Componente
import { Form } from '@ui/Form';
// Hook
import { useProductos } from '@hooks/useProductos';

export const InstantSearch = ({ open = false, onClose }) => {

	const [query, setQuery] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	const { data: productos } = useProductos();
	const navigate = useNavigate();
	const searchRef = useRef(null);
	const inputRef = useRef(null);

	// En pantallas chicas el input esta oculto hasta que se abre desde el navbar:
	// al abrirlo se focusea para que aparezca el teclado.
	useEffect(() => {
		if (open) {
			inputRef.current?.focus();
		}
	}, [open]);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (searchRef.current && !searchRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);


	useEffect(() => {
		if (query.trim().length < 2) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setSuggestions([]);
			return;
		}

		const filtered = productos.filter((prod) =>
			prod.title.toLowerCase().includes(query.toLowerCase()) ||
			(prod.excerpt && prod.excerpt.toLowerCase().includes(query.toLowerCase()))
		);

		setSuggestions(filtered.slice(0, 5));
		setIsOpen(true);
	}, [query, productos]);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		if (!query.trim()) return;
		setIsOpen(false);
		onClose?.();
		navigate(`/buscar?q=${encodeURIComponent(query.trim())}`);
	};

	const handleSelectSuggestion = (slug) => {
		setIsOpen(false);
		setQuery('');
		onClose?.();
		navigate(`/productos/${slug}`);
	};

	return (
		<div className="search-instant bg-surface rounded-2 border border-brand relative w-full" ref={searchRef}>
			<Form onSubmit={handleSearchSubmit} className="search-form flex justify-end">
				<input
					ref={inputRef}
					className="grow-1 px-1 bg-transparent"
					type="text"
					placeholder="Buscar productos..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onFocus={() => query.trim().length >= 2 && setIsOpen(true)}
				/>
				<button type="submit" aria-label="Buscar producto en página" className="w-32 h-32 bg-transparent">
					<Search className="fill-brand" size={18} />
				</button>
			</Form>

			{isOpen && suggestions.length > 0 && (
				<ul className="search-suggestions absolute z-2 top-8 right-0 border rounded overflow-hidden w-280 bg-surface">
					{suggestions.map((prod) => (
						<li key={prod.id} className="p-1 text-sm bg-brand-hover hover:text-brand-foreground" onClick={() => handleSelectSuggestion(prod.slug)}>
							<span className="suggestion-name font-bold">{prod.title}</span>
							{prod.category && <span className="suggestion-cat"> en {prod.category}</span>}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};
