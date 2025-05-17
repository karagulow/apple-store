import styles from './product-card.module.scss';

export const ProductCardSkeleton: React.FC = () => (
	<div className={styles.skeleton}>
		<div className={styles.skeleton__shimmer}></div>

		<div className={styles.skeleton__preview}></div>

		<div className={styles.skeleton__name}>
			<div></div>
			<div></div>
		</div>

		<div className={styles.skeleton__bottom}>
			<div className={styles.skeleton__price}></div>
			<div className={styles.skeleton__btn}></div>
		</div>
	</div>
);
