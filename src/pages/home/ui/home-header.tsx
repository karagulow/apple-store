import { FiltersMobile } from '../../../features/filters/ui/filters-mobile';
import { Sort } from '../../../shared/ui';

import styles from './home.module.scss';

interface Props {
	sortBy: string;
	setSortBy: (value: string) => void;
	availableCategories: string[];
	priceRange: { min: number; max: number };
	filters: { categories: string[]; priceRange: { min: number; max: number } };
	handleFilterChange: (newFilters: any) => void;
	handleApplyFilters: () => void;
}

export const HomeHeader: React.FC<Props> = ({
	sortBy,
	setSortBy,
	availableCategories,
	priceRange,
	filters,
	handleFilterChange,
	handleApplyFilters,
}) => {
	return (
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
	);
};
