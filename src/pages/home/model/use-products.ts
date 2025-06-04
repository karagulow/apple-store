import { useState, useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from './api';
import type { FiltersState, Product } from '../model/types';

export const useProducts = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [sortBy, setSortBy] = useState('price');
	const [filters, setFilters] = useState<FiltersState>({
		categories: [],
		priceRange: { min: 0, max: 0 },
	});
	const [draftFilters, setDraftFilters] = useState<FiltersState>(filters);

	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isInitialLoad, setIsInitialLoad] = useState(true);
	const debounceTimeout = useRef<number | null>(null);

	useEffect(() => {
		const sortParam = searchParams.get('sort') || 'price';
		const categoryParams = searchParams.getAll('category[]');
		const minPrice = Number(searchParams.get('price[from]') || 0);
		const maxPrice = Number(searchParams.get('price[to]') || 0);

		const initialFilters: FiltersState = {
			categories: categoryParams,
			priceRange: { min: minPrice, max: maxPrice },
		};

		setSortBy(sortParam);
		setFilters(initialFilters);
		setDraftFilters(initialFilters);
		setIsInitialLoad(false);
	}, []);

	const availableCategories = useMemo(() => {
		const counts: Record<string, number> = {};
		products.forEach(p => (counts[p.category] = (counts[p.category] || 0) + 1));
		return Object.entries(counts)
			.sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
			.map(([c]) => c);
	}, [products]);

	const priceRange = useMemo(() => {
		if (!products.length) return { min: 0, max: 0 };
		const prices = products.map(p => p.price);
		return { min: Math.min(...prices), max: Math.max(...prices) };
	}, [products]);

	useEffect(() => {
		if (
			products.length > 0 &&
			filters.priceRange.min === 0 &&
			filters.priceRange.max === 0
		) {
			const newPriceRange = { min: priceRange.min, max: priceRange.max };
			setFilters(prev => ({ ...prev, priceRange: newPriceRange }));
			setDraftFilters(prev => ({ ...prev, priceRange: newPriceRange }));
		}
	}, [products, priceRange, filters]);

	useEffect(() => {
		if (isInitialLoad && products.length > 0) {
			const newPriceRange = { min: priceRange.min, max: priceRange.max };
			setFilters(prev => ({ ...prev, priceRange: newPriceRange }));
			setDraftFilters(prev => ({ ...prev, priceRange: newPriceRange }));
		}
	}, [products, priceRange, isInitialLoad]);

	const queryParams = useMemo(() => {
		const params: Record<string, any> = {};
		if (filters.priceRange.min > 0)
			params['price[from]'] = filters.priceRange.min.toString();
		if (filters.priceRange.max > 0)
			params['price[to]'] = filters.priceRange.max.toString();
		if (filters.categories.length > 0)
			params['category[]'] = filters.categories;
		return params;
	}, [filters]);

	useEffect(() => {
		const params: Record<string, string | string[]> = {};
		if (sortBy) params.sort = sortBy;
		if (filters.categories.length > 0)
			params['category[]'] = filters.categories;
		if (filters.priceRange.min > 0)
			params['price[from]'] = filters.priceRange.min.toString();
		if (filters.priceRange.max > 0)
			params['price[to]'] = filters.priceRange.max.toString();
		setSearchParams(params);
	}, [sortBy, filters]);

	const fetchProducts = async () => {
		setIsLoading(true);
		try {
			const selectedFields = [
				'id',
				'name',
				'category',
				'preview',
				'price',
			].join(',');
			const data = await getProducts({
				sortBy,
				_select: selectedFields,
				...queryParams,
			});
			setProducts(data);
		} catch (err) {
			console.error('Ошибка при загрузке товаров:', err);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (isInitialLoad) return;

		if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

		debounceTimeout.current = window.setTimeout(() => {
			setFilters(draftFilters);
		}, 500);

		return () => {
			if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
		};
	}, [draftFilters]);

	useEffect(() => {
		if (isInitialLoad) return;
		fetchProducts();
	}, [filters, sortBy]);

	const handleFilterChange = (newDraft: Partial<FiltersState>) => {
		setDraftFilters(prev => ({ ...prev, ...newDraft }));
	};

	return {
		sortBy,
		setSortBy,
		filters: draftFilters,
		products,
		isLoading,
		availableCategories,
		priceRange,
		handleFilterChange,
		fetchProducts,
	};
};
