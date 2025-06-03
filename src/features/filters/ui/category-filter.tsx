import styles from './filters.module.scss';
import { Checkbox } from '../../../shared/ui';

interface CategoryFilterProps {
	categories: string[];
	value: string[];
	onChange: (value: string[]) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
	categories,
	value,
	onChange,
}) => {
	const toggleCategory = (category: string) => {
		const newCategories = value.includes(category)
			? value.filter(c => c !== category)
			: [...value, category];
		onChange(newCategories);
	};

	return (
		<div className={styles.filter}>
			<span className={styles.filter__label}>Категория</span>
			<div className={styles.checkbox}>
				{categories.length > 0 ? (
					categories.map(category => (
						<label
							key={category}
							className={styles.checkbox__label}
							onClick={() => toggleCategory(category)}
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
		</div>
	);
};
