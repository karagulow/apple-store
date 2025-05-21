import React, { useState, useEffect, useMemo } from 'react';

import styles from './home.module.scss';

import { Button, Sort } from '../../../shared/ui';
import { ProductCard, ProductCardSkeleton } from '../../../entities/product';
import { FiltersDesktop } from '../../../features/filters';
import { FiltersMobile } from '../../../features/filters/ui/filters-mobile';

interface Product {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
}

export const Home: React.FC = () => {
	const [visibleCount, setVisibleCount] = useState(6);

	const handleShowMore = () => {
		setVisibleCount(prev => prev + 6);
	};

	const [sortOption, setSortOption] = useState('expensive');
	const [filters, setFilters] = useState({
		categories: [] as string[],
		priceRange: { min: 0, max: 0 },
	});
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	const availableCategories = useMemo(() => {
		const categories = new Set<string>();
		products.forEach(product => categories.add(product.category));
		return Array.from(categories);
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
		const mockProducts: Product[] = [
			{
				id: '1',
				name: 'Смартфон Apple iPhone 16 Pro Max 256 ГБ («Пустынный титан» | Desert Titanium)',
				price: 102990,
				image: '',
				category: 'Смартфоны',
			},
			{
				id: '2',
				name: 'Смартфон Apple iPhone 15 Pro Max 256 ГБ («Натуральный титан» | Natural Titanium)',
				price: 104990,
				image: '',
				category: 'Смартфоны',
			},
			{
				id: '3',
				name: 'Ноутбук MacBook Pro 16" M3 Pro 512GB (Space Gray)',
				price: 224990,
				image: '',
				category: 'Ноутбуки',
			},
			{
				id: '4',
				name: 'Планшет iPad Pro 12.9" M2 256GB (Silver)',
				price: 124990,
				image: '',
				category: 'Планшеты',
			},
			{
				id: '5',
				name: 'Смартфон Apple iPhone 16 Pro Max 256 ГБ («Пустынный титан» | Desert Titanium)',
				price: 102990,
				image: '',
				category: 'Смартфоны',
			},
			{
				id: '6',
				name: 'Смартфон Apple iPhone 15 Pro Max 256 ГБ («Натуральный титан» | Natural Titanium)',
				price: 104990,
				image: '',
				category: 'Смартфоны',
			},
			{
				id: '7',
				name: 'Ноутбук MacBook Pro 16" M3 Pro 512GB (Space Gray)',
				price: 224990,
				image: '',
				category: 'Ноутбуки',
			},
			{
				id: '8',
				name: 'Планшет iPad Pro 12.9" M2 256GB (Silver)',
				price: 124990,
				image: '',
				category: 'Планшеты',
			},
			{
				id: '9',
				name: 'Смартфон Apple iPhone 16 Pro Max 256 ГБ («Пустынный титан» | Desert Titanium)',
				price: 102990,
				image: '',
				category: 'Смартфоны',
			},
			{
				id: '10',
				name: 'Смартфон Apple iPhone 15 Pro Max 256 ГБ («Натуральный титан» | Natural Titanium)',
				price: 104990,
				image: '',
				category: 'Смартфоны',
			},
			{
				id: '11',
				name: 'Ноутбук MacBook Pro 16" M3 Pro 512GB (Space Gray)',
				price: 224990,
				image: '',
				category: 'Ноутбуки',
			},
			{
				id: '12',
				name: 'Планшет iPad Pro 12.9" M2 256GB (Silver)',
				price: 124990,
				image: '',
				category: 'Планшеты',
			},
		];

		setTimeout(() => {
			setProducts(mockProducts);
			setIsLoading(false);
		}, 1000);
	}, []);

	const filteredProducts = useMemo(() => {
		let result = [...products];

		if (filters.categories.length > 0) {
			result = result.filter(p => filters.categories.includes(p.category));
		}

		result = result.filter(
			p =>
				p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
		);

		switch (sortOption) {
			case 'expensive':
				return result.sort((a, b) => b.price - a.price);
			case 'cheap':
				return result.sort((a, b) => a.price - b.price);
			case 'popular':
			default:
				return result;
		}
	}, [products, filters, sortOption]);

	const handleFilterChange = (newFilters: Partial<typeof filters>) => {
		setFilters(prev => ({ ...prev, ...newFilters }));
	};

	const visibleProducts = useMemo(() => {
		return filteredProducts.slice(0, visibleCount);
	}, [filteredProducts, visibleCount]);

	useEffect(() => {
		setVisibleCount(6);
	}, [filters, sortOption]);

	return (
		<div className={styles.page}>
			<div className={styles.page__top}>
				<h1 className={styles.page__title}>Все товары</h1>
				<div className={styles.page__controls}>
					<Sort
						options={[
							{ value: 'expensive', label: 'Сначала дорогие' },
							{ value: 'cheap', label: 'Сначала недорогие' },
							{ value: 'popular', label: 'Сначала популярные' },
						]}
						selectedValue={sortOption}
						onChange={setSortOption}
					/>
					<FiltersMobile
						categories={availableCategories}
						priceRange={priceRange}
						filters={filters}
						onChange={handleFilterChange}
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
										image={product.image}
									/>
							  ))}
					</div>
					{visibleCount < filteredProducts.length && (
						<Button onClick={handleShowMore}>Показать ещё</Button>
					)}
				</div>
			</div>
		</div>
	);
};
