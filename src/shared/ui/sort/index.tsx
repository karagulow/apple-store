import React, { memo, useState } from 'react';
import classNames from 'classnames';
import styles from './sort.module.scss';
import { ArrowsUpDownIcon } from '../icons';

export type SortOption = {
	value: string;
	label: string;
};

interface SortProps {
	options: SortOption[];
	selectedValue: string;
	onChange: (value: string) => void;
}

export const Sort: React.FC<SortProps> = memo(
	({ options, selectedValue, onChange }) => {
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
				<div
					className={styles.sort__wrapper}
					onClick={() => setIsOpen(!isOpen)}
					role='button'
					tabIndex={0}
					aria-haspopup='listbox'
					aria-expanded={isOpen}
					onKeyDown={e => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							setIsOpen(prev => !prev);
						}
						if (e.key === 'Escape') {
							setIsOpen(false);
						}
					}}
				>
					<ArrowsUpDownIcon />
					<p className={styles.sort__text}>Сортировка:</p>
					<span className={styles.sort__value}>{selectedLabel}</span>
				</div>

				<ul
					className={classNames(
						styles.sort__dropdown,
						isOpen && styles.sort__dropdown_open
					)}
					role='listbox'
				>
					{options.map(option => (
						<li
							key={option.value}
							role='option'
							aria-selected={selectedValue === option.value}
							tabIndex={-1}
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
	}
);
