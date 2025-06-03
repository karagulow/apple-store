import { CategoryFilter } from '../ui/category-filter';
import { PriceFilter } from '../ui/price-filter';
import type { FiltersValue } from '../model/types';

interface GetFilterComponentsParams {
	categories: string[];
	priceRange: { min: number; max: number };
	filters: FiltersValue;
	onChange: (val: FiltersValue) => void;
}

export const getFilterComponents = ({
	categories,
	priceRange,
	filters,
	onChange,
}: GetFilterComponentsParams) =>
	[
		{
			component: CategoryFilter,
			props: {
				categories,
				value: filters.categories,
				onChange: (val: string[]) => onChange({ ...filters, categories: val }),
			} satisfies React.ComponentProps<typeof CategoryFilter>,
		},
		{
			component: PriceFilter,
			props: {
				minPrice: priceRange.min,
				maxPrice: priceRange.max,
				value: filters.priceRange,
				onChange: (val: { min: number; max: number }) =>
					onChange({ ...filters, priceRange: val }),
			} satisfies React.ComponentProps<typeof PriceFilter>,
		},
	] as const;
