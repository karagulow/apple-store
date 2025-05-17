import React, { useState } from 'react';
import styles from './home.module.scss';
import { Sort } from '../../../shared/ui';
import { ProductCard, ProductCardSkeleton } from '../../../entities/product';

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

			<div className={styles.page__wrapper}>
				<div className={styles.page__filters}>Фильтры</div>
				<div className={styles.page__products}>
					<ProductCard
						id={'1'}
						name={
							'Смартфон Apple iPhone 16 Pro Max 256 ГБ («Пустынный титан» | Desert Titanium)'
						}
						price={102990}
						image={''}
					/>
					<ProductCard
						id={'2'}
						name={
							'Смартфон Apple iPhone 15 Pro Max 256 ГБ («Натуральный титан» | Natural Titanium)'
						}
						price={104990}
						image={''}
					/>
					<ProductCard
						id={'3'}
						name={'Смартфон Apple iPhone 16 Plus 128 ГБ (Чёрный | Black)'}
						price={76990}
						image={''}
					/>
					<ProductCard
						id={'4'}
						name={'Смартфон Apple iPhone 13 128 ГБ («Тёмная ночь» | Midnight)'}
						price={41990}
						image={''}
					/>
					<ProductCardSkeleton />
				</div>
			</div>

			<div className={styles.page__wrapper}>
				<div></div>
				<div>Пагинация</div>
			</div>
		</div>
	);
};
