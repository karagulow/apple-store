import React from 'react';

import styles from './filters.module.scss';

import type { FiltersValue } from '../model/types';
import { getFilterComponents } from '../model/filter-components';

interface FiltersDesktopProps {
	categories: string[];
	priceRange: { min: number; max: number };
	filters: FiltersValue;
	onChange: (newFilters: FiltersValue) => void;
}

export const FiltersDesktop: React.FC<FiltersDesktopProps> = ({
	categories,
	priceRange,
	filters,
	onChange,
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
					{index < filterBlocks.length - 1 && <hr className='divider' />}
				</React.Fragment>
			))}
		</div>
	);
};
