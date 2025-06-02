import React, { useState } from 'react';

import styles from './home.module.scss';

import { FiltersDesktop } from '../../../features/filters';
import { HomeHeader } from './home-header';

import { ProductsList } from './products-list';
import { useProducts } from '../model/use-products';

export const Home: React.FC = () => {
	const [visibleCount, setVisibleCount] = useState(6);
	const {
		sortBy,
		setSortBy,
		filters,
		products,
		isLoading,
		availableCategories,
		priceRange,
		handleApplyFilters,
		handleFilterChange,
	} = useProducts();

	const handleShowMore = () => {
		setVisibleCount(prev => prev + 6);
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
				handleApplyFilters={handleApplyFilters}
			/>

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
