import { FormProvider, useForm } from 'react-hook-form';

import styles from './cart.module.scss';

import { CartProducts } from './cart-products';
import { CartUserInfo } from './cart-user-info';
import { CartDelivery } from './cart-delivery';
import { CartSummary } from './cart-summary';

import type { FormData, Product } from '../model/types';
import { useCallback } from 'react';

interface CartFormProps {
	products: Product[];
	quantityMap: Map<string, number>;
}

export const CartForm: React.FC<CartFormProps> = ({
	products,
	quantityMap,
}) => {
	const methods = useForm<FormData>({ mode: 'onBlur' });

	const onSubmit = useCallback(
		(data: FormData) => {
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
		},
		[products, quantityMap]
	);

	return (
		<FormProvider {...methods}>
			<form
				onSubmit={methods.handleSubmit(onSubmit)}
				className={styles.page__wrapper}
			>
				<div className={styles.page__col}>
					<CartProducts products={products} quantityMap={quantityMap} />
					<CartUserInfo />
					<CartDelivery />
				</div>
				<div className={styles.page__col}>
					<CartSummary products={products} quantityMap={quantityMap} />
				</div>
			</form>
		</FormProvider>
	);
};
