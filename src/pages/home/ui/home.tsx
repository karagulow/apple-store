import React, { useState } from 'react';
import styles from './home.module.scss';
import { Sort } from '../../../shared/ui';

export const Home: React.FC = () => {
	const [sortOption, setSortOption] = useState('expensive');

	const sortOptions = [
		{ value: 'expensive', label: 'Сначала дорогие' },
		{ value: 'cheap', label: 'Сначала недорогие' },
		{ value: 'popular', label: 'Сначала популярные' },
	];

	return (
		<div className={styles.page}>
			<div className={styles.page__top}>
				<h1 className={styles.page__title}>Все товары</h1>
				<Sort
					options={sortOptions}
					selectedValue={sortOption}
					onChange={setSortOption}
				/>
			</div>
		</div>
	);
};
