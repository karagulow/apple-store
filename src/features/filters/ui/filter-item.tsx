import type { ChangeEvent } from 'react';

import styles from './filters.module.scss';

import { Checkbox } from '../../../shared/ui';

interface FilterItemProps {
	type: 'category' | 'price';
	categories?: string[];
	minPrice?: number;
	maxPrice?: number;
	value: any;
	onChange: (value: any) => void;
}

export const FilterItem: React.FC<FilterItemProps> = ({
	type,
	categories = [],
	minPrice = 0,
	maxPrice = 0,
	value,
	onChange,
}) => {
	const handleCategoryChange = (category: string) => {
		const newCategories = value.includes(category)
			? value.filter((c: string) => c !== category)
			: [...value, category];
		onChange(newCategories);
	};

	const handlePriceChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: 'min' | 'max'
	) => {
		const numValue = Math.max(0, parseInt(e.target.value)) || 0;
		onChange({
			...value,
			[field]: numValue,
		});
	};

	return (
		<div className={styles.filter}>
			<span className={styles.filter__label}>
				{type === 'category' ? 'Категория' : 'Цена'}
			</span>

			{type === 'category' ? (
				<div className={styles.checkbox}>
					{categories.length > 0 ? (
						categories.map(category => (
							<label
								key={category}
								className={styles.checkbox__label}
								onClick={() => handleCategoryChange(category)}
							>
								<Checkbox checked={value.includes(category)} />
								<span>{category}</span>
							</label>
						))
					) : (
						<div className={styles.skeleton}>
							<div className={styles.skeleton__shimmer}></div>
							{[...Array(5)].map((_, i) => (
								<div className={styles.skeleton__line} key={i}></div>
							))}
						</div>
					)}
				</div>
			) : type === 'price' ? (
				<div className={styles.range}>
					<div className={styles.range__item}>
						<input
							type='number'
							min={minPrice}
							max={maxPrice}
							value={value.min}
							onChange={e => handlePriceChange(e, 'min')}
							placeholder={`${minPrice} ₽`}
						/>
						<span>₽</span>
					</div>
					<div className={styles.range__item}>
						<input
							type='number'
							min={minPrice}
							max={maxPrice}
							value={value.max}
							onChange={e => handlePriceChange(e, 'max')}
							placeholder={`${maxPrice} ₽`}
						/>
						<span>₽</span>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};
