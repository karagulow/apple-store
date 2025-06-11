import React from 'react';
import { useState } from 'react';
import classNames from 'classnames';

import styles from './filters.module.scss';

import { Button, CloseIcon, FilterIcon } from '../../../shared/ui';
import type { FiltersValue } from '../model/types';
import { getFilterComponents } from '../model/filter-components';

interface FiltersMobileProps {
	categories: string[];
	priceRange: { min: number; max: number };
	filters: FiltersValue;
	onChange: (newFilters: FiltersValue) => void;
	onApplyFilters: () => void;
}

export const FiltersMobile: React.FC<FiltersMobileProps> = ({
	filters,
	onChange,
	categories,
	priceRange,
	onApplyFilters,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const filterBlocks = getFilterComponents({
		categories,
		priceRange,
		filters,
		onChange,
	});

	const handleApply = () => {
		setIsOpen(false);
		onApplyFilters();
	};

	return (
		<>
			<button
				className={styles.filters__btn}
				type='button'
				onClick={() => setIsOpen(true)}
			>
				<FilterIcon />
			</button>

			<dialog
				className={classNames(styles.modal, { [styles.modal__open]: isOpen })}
			>
				<div className={styles.modal__top}>
					<div></div>
					<h1 className={styles.modal__title}>Фильтры</h1>
					<button
						className={styles.modal__close}
						type='button'
						onClick={() => setIsOpen(false)}
					>
						<CloseIcon />
					</button>
				</div>

				<div className={styles.modal__filters}>
					{filterBlocks.map(({ component: Component, props }, index) => (
						<React.Fragment key={index}>
							<Component {...(props as any)} />
							{index < filterBlocks.length - 1 && <hr className='divider' />}
						</React.Fragment>
					))}
				</div>

				<div className={styles.modal__btn}>
					<Button onClick={handleApply}>Применить</Button>
				</div>
			</dialog>
		</>
	);
};
