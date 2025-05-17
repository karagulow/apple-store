import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './sort.module.scss';
import arrowsIcon from '../../../shared/assets/images/arrows-up-down.svg';

export type SortOption = {
	value: string;
	label: string;
};

interface SortProps {
	options: SortOption[];
	selectedValue: string;
	onChange: (value: string) => void;
}

export const Sort: React.FC<SortProps> = ({
	options,
	selectedValue,
	onChange,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const selectedLabel =
		options.find(opt => opt.value === selectedValue)?.label || '';

	const handleSelect = (value: string) => {
		onChange(value);
		setIsOpen(false);
	};

	return (
		<div
			className={styles.sort}
			onMouseEnter={() => setIsOpen(true)}
			onMouseLeave={() => setIsOpen(false)}
		>
			<div className={styles.sort__wrapper} onClick={() => setIsOpen(!isOpen)}>
				<img
					className={styles.sort__icon}
					src={arrowsIcon}
					alt='arrows-up-down'
				/>
				<p className={styles.sort__text}>Сортировка:</p>
				<span className={styles.sort__value}>{selectedLabel}</span>
			</div>

			<ul
				className={classNames(
					styles.sort__dropdown,
					isOpen && styles.sort__dropdown_open
				)}
			>
				{options.map(option => (
					<li
						key={option.value}
						className={classNames(
							styles.sort__dropdown__item,
							selectedValue === option.value &&
								styles.sort__dropdown__item_active
						)}
						onClick={() => handleSelect(option.value)}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
};
