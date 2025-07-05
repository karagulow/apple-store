import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './cart.module.scss';
import { Textarea } from '../../../shared/ui';
import type { FormData } from '../model/types';
import { AddressInput } from './address-input';

export const CartDelivery: React.FC = memo(() => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormData>();

	return (
		<div className={styles.block}>
			<h2 className={styles.block__title}>Адрес доставки</h2>
			<hr className='divider' />

			<AddressInput
				label='Введите адрес'
				name='address'
				error={errors.address?.message}
			/>
			<Textarea
				label='Комментарий к заказу'
				placeholder='Укажите тут дополнительную информацию для курьера'
				{...register('comment')}
			/>
		</div>
	);
});
