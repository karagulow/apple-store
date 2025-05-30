import React, { useState, useEffect, useMemo } from 'react';

import styles from './home.module.scss';

import { Button, Sort } from '../../../shared/ui';
import { ProductCard, ProductCardSkeleton } from '../../../entities/product';
import { FiltersDesktop } from '../../../features/filters';
import { FiltersMobile } from '../../../features/filters/ui/filters-mobile';
import { getProducts } from '../model/api';

interface Product {
	id: string;
	name: string;
	price: number;
	preview: string;
	category: string;
}

interface FiltersState {
	categories: string[];
	priceRange: {
		min: number;
		max: number;
	};
}

export const Home: React.FC = () => {
	const [visibleCount, setVisibleCount] = useState(6);

	const handleShowMore = () => {
		setVisibleCount(prev => prev + 6);
	};

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

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const data = await getProducts({
					sortBy,
					_select: ['id', 'name', 'category', 'preview', 'price'].join(','),
				});
				setProducts(data);
			} catch (error) {
				console.error('Ошибка при загрузке товаров:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, [sortBy]);

	const handleApplyFilters = async () => {
		setIsLoading(true);
		try {
			const selectedFields = [
				'id',
				'name',
				'category',
				'preview',
				'price',
			].join(',');

			const params: Record<string, any> = {
				sortBy,
				_select: selectedFields,
			};

			if (filters.priceRange.min > 0) {
				params['price[from]'] = filters.priceRange.min.toString();
			}
			if (filters.priceRange.max > 0) {
				params['price[to]'] = filters.priceRange.max.toString();
			}
			if (filters.categories.length > 0) {
				params['category[]'] = filters.categories;
			}

			const data = await getProducts(params);
			setProducts(data);
		} catch (error) {
			console.error('Ошибка при загрузке товаров:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleFilterChange = (newFilters: Partial<typeof filters>) => {
		setFilters(prev => ({ ...prev, ...newFilters }));
	};

	const visibleProducts = useMemo(() => {
		return products.slice(0, visibleCount);
	}, [products, visibleCount]);

	return (
		<div className={styles.page}>
			<div className={styles.page__top}>
				<h1 className={styles.page__title}>Все товары</h1>
				<div className={styles.page__controls}>
					<Sort
						options={[
							{ value: '-price', label: 'Сначала дорогие' },
							{ value: 'price', label: 'Сначала недорогие' },
						]}
						selectedValue={sortBy}
						onChange={setSortBy}
					/>
					<FiltersMobile
						categories={availableCategories}
						priceRange={priceRange}
						filters={filters}
						onChange={handleFilterChange}
						onApply={handleApplyFilters}
					/>
				</div>
			</div>

			<div className={styles.page__wrapper}>
				<aside className={styles.page__filters}>
					<FiltersDesktop
						categories={availableCategories}
						priceRange={priceRange}
						filters={filters}
						onChange={handleFilterChange}
						onApply={handleApplyFilters}
					/>
				</aside>
				<div className={styles.page__content}>
					<div className={styles.page__products}>
						{isLoading
							? [...Array(6)].map((_, index) => (
									<ProductCardSkeleton key={index} />
							  ))
							: visibleProducts.map(product => (
									<ProductCard
										key={product.id}
										id={product.id}
										name={product.name}
										price={product.price}
										preview={product.preview}
									/>
							  ))}
					</div>
					{visibleCount < products.length && (
						<Button onClick={handleShowMore}>Показать ещё</Button>
					)}
				</div>
			</div>
		</div>
	);
};
