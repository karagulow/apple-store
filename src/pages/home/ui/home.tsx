import React, { useCallback, useMemo, useState } from 'react';

import styles from './home.module.scss';

import { FiltersDesktop } from '../../../features/filters';
import { HomeHeader } from './home-header';
import { ProductsList } from './products-list';

import { useProducts } from '../model/use-products';
import type { SortOption } from '../../../shared/ui/sort';

export const Home: React.FC = () => {
	const INITIAL_VISIBLE_COUNT = 6;
	const INCREMENT_COUNT = 6;
	const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

	const {
		sortBy,
		setSortBy,
		filters,
		products,
		isLoading,
		availableCategories,
		priceRange,
		handleFilterChange,
		handleApplyFilters,
	} = useProducts();

	const onShowMore = useCallback(() => {
		setVisibleCount(c => c + INCREMENT_COUNT);
	}, []);

	const sortOptions = useMemo<SortOption[]>(
		() => [
			{ value: '-price', label: 'Сначала дорогие' },
			{ value: 'price', label: 'Сначала недорогие' },
		],
		[]
	);

	return (
		<div className={styles.page}>
			<HomeHeader
				sortBy={sortBy}
				setSortBy={setSortBy}
				options={sortOptions}
				availableCategories={availableCategories}
				priceRange={priceRange}
				filters={filters}
				handleFilterChange={handleFilterChange}
				onApplyFilters={handleApplyFilters}
			/>

			<div className={styles.page__wrapper}>
				<aside className={styles.page__filters}>
					<FiltersDesktop
						categories={availableCategories}
						priceRange={priceRange}
						filters={filters}
						onChange={handleFilterChange}
						onApplyFilters={handleApplyFilters}
					/>
				</aside>
				<div className={styles.page__content}>
					<ProductsList
						products={products}
						isLoading={isLoading}
						visibleCount={visibleCount}
						onShowMore={onShowMore}
					/>
				</div>
			</div>
		</div>
	);
};
