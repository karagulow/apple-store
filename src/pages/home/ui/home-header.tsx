import { memo } from 'react';
import { FiltersMobile } from '../../../features/filters/ui/filters-mobile';
import { Sort } from '../../../shared/ui';

import styles from './home.module.scss';

interface Props {
	sortBy: string;
	setSortBy: (value: string) => void;
	options: { value: string; label: string }[];
	availableCategories: string[];
	priceRange: { min: number; max: number };
	filters: { categories: string[]; priceRange: { min: number; max: number } };
	handleFilterChange: (newFilters: any) => void;
	onApplyFilters: () => void;
}

export const HomeHeader: React.FC<Props> = memo(
	({
		sortBy,
		setSortBy,
		options,
		availableCategories,
		priceRange,
		filters,
		handleFilterChange,
		onApplyFilters,
	}) => {
		return (
			<div className={styles.page__top}>
				<h1 className={styles.page__title}>Все товары</h1>
				<div className={styles.page__controls}>
					<Sort options={options} selectedValue={sortBy} onChange={setSortBy} />
					<FiltersMobile
						categories={availableCategories}
						priceRange={priceRange}
						filters={filters}
						onChange={handleFilterChange}
						onApplyFilters={onApplyFilters}
					/>
				</div>
			</div>
		);
	}
);
