import styles from './cart.module.scss';

import { CartProductItem } from './cart-product-item';

export const CartProducts: React.FC = () => (
	<div className={styles.block}>
		<h2 className={styles.block__title}>Корзина</h2>
		<hr className='divider' />
		<div className={styles.block__products}>
			<CartProductItem />
		</div>
	</div>
);
