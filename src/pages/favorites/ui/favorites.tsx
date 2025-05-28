import styles from './favorites.module.scss';

import { FavoriteProducts } from './favorite-products';

export const Favorites: React.FC = () => {
	return (
		<div className={styles.page}>
			<h1 className={styles.page__title}>Избранное</h1>
			<FavoriteProducts />
		</div>
	);
};
