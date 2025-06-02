import { useState, useEffect, useMemo } from 'react';
import { getProducts } from './api';
import type { FiltersState, Product } from '../model/types';

export const useProducts = () => {
	const [sortBy, setSortBy] = useState('price');
	const [filters, setFilters] = useState<FiltersState>({
		categories: [],
		priceRange: { min: 0, max: 0 },
	});
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const availableCategories = useMemo(() => {
		const categoryCounts: Record<string, number> = {};

		products.forEach(product => {
			categoryCounts[product.category] =
				(categoryCounts[product.category] || 0) + 1;
		});

		return Object.entries(categoryCounts)
			.sort((a, b) => {
				if (b[1] !== a[1]) {
					return b[1] - a[1];
				}
				return a[0].localeCompare(b[0]);
			})
			.map(([category]) => category);
	}, [products]);

	const priceRange = useMemo(() => {
		if (products.length === 0) return { min: 0, max: 0 };

		const prices = products.map(p => p.price);
		return {
			min: Math.min(...prices),
			max: Math.max(...prices),
		};
	}, [products]);

	useEffect(() => {
		if (products.length > 0) {
			setFilters(prev => ({
				...prev,
				priceRange: {
					min: priceRange.min,
					max: priceRange.max,
				},
			}));
		}
	}, [products, priceRange]);

	const fetchProducts = async (params: Record<string, any> = {}) => {
		setIsLoading(true);
		try {
			const selectedFields = [
				'id',
				'name',
				'category',
				'preview',
				'price',
			].join(',');

			const defaultParams: Record<string, any> = {
				sortBy,
				_select: selectedFields,
				...params,
			};

			const data = await getProducts(defaultParams);
			setProducts(data);
		} catch (error) {
			console.error('Ошибка при загрузке товаров:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchProducts();
	}, [sortBy]);

	const handleApplyFilters = async () => {
		const params: Record<string, any> = {};

		if (filters.priceRange.min > 0) {
			params['price[from]'] = filters.priceRange.min.toString();
		}
		if (filters.priceRange.max > 0) {
			params['price[to]'] = filters.priceRange.max.toString();
		}
		if (filters.categories.length > 0) {
			params['category[]'] = filters.categories;
		}

		await fetchProducts(params);
	};

	const handleFilterChange = (newFilters: Partial<FiltersState>) => {
		setFilters(prev => ({ ...prev, ...newFilters }));
	};

	return {
		sortBy,
		setSortBy,
		filters,
		products,
		isLoading,
		availableCategories,
		priceRange,
		handleApplyFilters,
		handleFilterChange,
		fetchProducts,
	};
};
