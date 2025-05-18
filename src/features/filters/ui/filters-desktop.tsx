import styles from './filters.module.scss';

import { FilterItem } from './filter-item';
import { Button } from '../../../shared/ui';

interface FiltersDesktopProps {
	categories: string[];
	priceRange: { min: number; max: number };
	filters: {
		categories: string[];
		priceRange: { min: number; max: number };
	};
	onChange: (newFilters: any) => void;
}

export const FiltersDesktop: React.FC<FiltersDesktopProps> = ({
	categories,
	priceRange,
	filters,
	onChange,
}) => {
	return (
		<div className={styles.filters}>
			<FilterItem
				type='category'
				categories={categories}
				value={filters.categories}
				onChange={selectedCategories =>
					onChange({
						...filters,
						categories: selectedCategories,
					})
				}
			/>
			<hr className='divider' />
			<FilterItem
				type='price'
				minPrice={priceRange.min}
				maxPrice={priceRange.max}
				value={filters.priceRange}
				onChange={selectedPriceRange =>
					onChange({
						...filters,
						priceRange: selectedPriceRange,
					})
				}
			/>
			<hr className='divider' />
			<Button onClick={() => onChange(filters)}>Применить</Button>
		</div>
	);
};
