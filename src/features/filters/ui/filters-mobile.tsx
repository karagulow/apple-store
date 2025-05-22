import { useState } from 'react';
import classNames from 'classnames';

import styles from './filters.module.scss';

import { FilterItem } from './filter-item';
import { Button } from '../../../shared/ui';

interface FiltersMobileProps {
	categories: string[];
	priceRange: { min: number; max: number };
	filters: {
		categories: string[];
		priceRange: { min: number; max: number };
	};
	onChange: (newFilters: any) => void;
	onApply: () => void;
}

export const FiltersMobile: React.FC<FiltersMobileProps> = ({
	filters,
	onChange,
	categories,
	priceRange,
	onApply,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleApply = () => {
		setIsOpen(false);
		onApply();
	};

	return (
		<>
			<button
				className={styles.filters__btn}
				type='button'
				onClick={() => setIsOpen(true)}
			>
				<svg
					width='20'
					height='20'
					viewBox='0 0 20 20'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M8.75 5H16.875M8.75 5C8.75 5.33152 8.6183 5.64946 8.38388 5.88388C8.14946 6.1183 7.83152 6.25 7.5 6.25C7.16848 6.25 6.85054 6.1183 6.61612 5.88388C6.3817 5.64946 6.25 5.33152 6.25 5M8.75 5C8.75 4.66848 8.6183 4.35054 8.38388 4.11612C8.14946 3.8817 7.83152 3.75 7.5 3.75C7.16848 3.75 6.85054 3.8817 6.61612 4.11612C6.3817 4.35054 6.25 4.66848 6.25 5M6.25 5H3.125M8.75 15H16.875M8.75 15C8.75 15.3315 8.6183 15.6495 8.38388 15.8839C8.14946 16.1183 7.83152 16.25 7.5 16.25C7.16848 16.25 6.85054 16.1183 6.61612 15.8839C6.3817 15.6495 6.25 15.3315 6.25 15M8.75 15C8.75 14.6685 8.6183 14.3505 8.38388 14.1161C8.14946 13.8817 7.83152 13.75 7.5 13.75C7.16848 13.75 6.85054 13.8817 6.61612 14.1161C6.3817 14.3505 6.25 14.6685 6.25 15M6.25 15H3.125M13.75 10H16.875M13.75 10C13.75 10.3315 13.6183 10.6495 13.3839 10.8839C13.1495 11.1183 12.8315 11.25 12.5 11.25C12.1685 11.25 11.8505 11.1183 11.6161 10.8839C11.3817 10.6495 11.25 10.3315 11.25 10M13.75 10C13.75 9.66848 13.6183 9.35054 13.3839 9.11612C13.1495 8.8817 12.8315 8.75 12.5 8.75C12.1685 8.75 11.8505 8.8817 11.6161 9.11612C11.3817 9.35054 11.25 9.66848 11.25 10M11.25 10H3.125'
						stroke='#212121'
						strokeWidth='1.5'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>

			<div className={classNames(styles.modal, isOpen && styles.modal__open)}>
				<div className={styles.modal__top}>
					<div></div>
					<h1 className={styles.modal__title}>Фильтры</h1>
					<button
						className={styles.modal__close}
						type='button'
						onClick={() => setIsOpen(false)}
					>
						<svg
							width='18'
							height='18'
							viewBox='0 0 18 18'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M4.5 13.5L13.5 4.5M4.5 4.5L13.5 13.5'
								stroke='#212121'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
				</div>

				<div className={styles.modal__filters}>
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
					<div className={styles.modal__btn}>
						<Button onClick={handleApply}>Применить</Button>
					</div>
				</div>
			</div>
		</>
	);
};
