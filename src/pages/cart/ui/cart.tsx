import { useForm } from 'react-hook-form';

import styles from './cart.module.scss';

import { CartProducts } from './cart-products';
import { CartUserInfo } from './cart-user-info';
import { CartDelivery } from './cart-delivery';
import { CartSummary } from './cart-summary';

import type { FormData } from '../model/types';

export const Cart: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({ mode: 'onBlur' });

	const onSubmit = (data: FormData) => {
		console.log('Form data:', data);
	};

	return (
		<div className={styles.page}>
			<h1 className={styles.page__title}>Оформление заказа</h1>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.page__wrapper}>
				<div className={styles.page__col}>
					<CartProducts />
					<CartUserInfo register={register} errors={errors} />
					<CartDelivery register={register} errors={errors} />
				</div>
				<div className={styles.page__col}>
					<CartSummary />
				</div>
			</form>
		</div>
	);
};
