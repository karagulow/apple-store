import { useMemo } from 'react';

import styles from './cart.module.scss';

import { useCartProducts } from '../model/use-cart-products';
import { CartForm } from './cart-form';

export const Cart: React.FC = () => {
	const { isLoading, products, cart } = useCartProducts();

	const quantityMap = useMemo(() => {
		return new Map(cart.map(item => [item.id, item.quantity]));
	}, [cart]);

	return (
		<div className={styles.page}>
			<h1 className={styles.page__title}>Оформление заказа</h1>
			{isLoading ? (
				<p>Загрузка...</p>
			) : products.length > 0 ? (
				<CartForm products={products} quantityMap={quantityMap} />
			) : (
				<p>Корзина пуста</p>
			)}
		</div>
	);
};
