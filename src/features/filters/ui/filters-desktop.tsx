import React from 'react';

import styles from './filters.module.scss';

import type { FiltersValue } from '../model/types';
import { getFilterComponents } from '../model/filter-components';
import { Button } from '../../../shared/ui';

interface FiltersDesktopProps {
	categories: string[];
	priceRange: { min: number; max: number };
	filters: FiltersValue;
	onChange: (newFilters: FiltersValue) => void;
	onApplyFilters: () => void;
}

export const FiltersDesktop: React.FC<FiltersDesktopProps> = ({
	categories,
	priceRange,
	filters,
	onChange,
	onApplyFilters,
}) => {
	const filterBlocks = getFilterComponents({
		categories,
		priceRange,
		filters,
		onChange,
	});

	return (
		<div className={styles.filters}>
			{filterBlocks.map(({ component: Component, props }, index) => (
				<React.Fragment key={index}>
					<Component {...(props as any)} />
					<hr className='divider' />
				</React.Fragment>
			))}
			<Button onClick={onApplyFilters}>Применить</Button>
		</div>
	);
};
