import React, { useState } from 'react';

import styles from './home.module.scss';

import { FiltersDesktop } from '../../../features/filters';
import { HomeHeader } from './home-header';

import { ProductsList } from './products-list';
import { useProducts } from '../model/use-products';

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

	const handleShowMore = () => {
		setVisibleCount(prev => prev + INCREMENT_COUNT);
	};

	return (
		<div className={styles.page}>
			<HomeHeader
				sortBy={sortBy}
				setSortBy={setSortBy}
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
						onShowMore={handleShowMore}
					/>
				</div>
			</div>
		</div>
	);
};
