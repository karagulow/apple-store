import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import styles from './cart.module.scss';

import { CartProducts } from './cart-products';
import { CartUserInfo } from './cart-user-info';
import { CartDelivery } from './cart-delivery';
import { CartSummary } from './cart-summary';

import type { FormData, Product } from '../model/types';
import { getProductsByIds } from '../model/api';
import { useAppSelector } from '../../../shared/lib/hooks/redux';

export const Cart: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ mode: 'onBlur' });

	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<Product[]>([]);
	const cart = useAppSelector(state => state.cart);

	useEffect(() => {
		const fetchCartProducts = async () => {
			if (cart.length === 0) {
				setProducts([]);
				setIsLoading(false);
				return;
			}

			setIsLoading(true);

			try {
				const result = await getProductsByIds(cart.map(c => c.id));
				setProducts(result);
			} catch (error) {
				console.error('Ошибка загрузки корзины:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCartProducts();
	}, []);

	const quantityMap = useMemo(() => {
		return new Map(cart.map(item => [item.id, item.quantity]));
	}, [cart]);

	const onSubmit = (data: FormData) => {
		const order = {
			user: data,
			products: products.map(p => ({
				id: p.id,
				name: p.name,
				price: p.price,
				quantity: quantityMap.get(p.id.toString()),
			})),
		};

		console.log('Order to submit:', order);
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.page__title}>Оформление заказа</h1>
			{isLoading ? (
				<p>Загрузка...</p>
			) : products.length > 0 ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.page__wrapper}
				>
					<div className={styles.page__col}>
						<CartProducts products={products} quantityMap={quantityMap} />
						<CartUserInfo register={register} errors={errors} />
						<CartDelivery register={register} errors={errors} />
					</div>
					<div className={styles.page__col}>
						<CartSummary products={products} quantityMap={quantityMap} />
					</div>
				</form>
			) : (
				<p>Корзина пуста</p>
			)}
		</div>
	);
};
