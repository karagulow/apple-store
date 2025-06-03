import type { ChangeEvent } from 'react';
import styles from './filters.module.scss';

interface PriceFilterProps {
	value: { min: number; max: number };
	minPrice: number;
	maxPrice: number;
	onChange: (value: { min: number; max: number }) => void;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
	value,
	minPrice,
	maxPrice,
	onChange,
}) => {
	const handleChange = (
		e: ChangeEvent<HTMLInputElement>,
		field: 'min' | 'max'
	) => {
		const num = Number(e.target.value);
		onChange({
			...value,
			[field]: Number.isFinite(num) ? Math.max(0, num) : 0,
		});
	};

	return (
		<div className={styles.filter}>
			<span className={styles.filter__label}>Цена</span>
			<div className={styles.range}>
				<div className={styles.range__item}>
					<input
						type='number'
						min={minPrice}
						max={maxPrice}
						value={value.min}
						onChange={e => handleChange(e, 'min')}
					/>
					<span>₽</span>
				</div>
				<div className={styles.range__item}>
					<input
						type='number'
						min={minPrice}
						max={maxPrice}
						value={value.max}
						onChange={e => handleChange(e, 'max')}
					/>
					<span>₽</span>
				</div>
			</div>
		</div>
	);
};
