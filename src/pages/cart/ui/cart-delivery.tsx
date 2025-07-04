import { memo } from 'react';
import { useFormContext } from 'react-hook-form';

import styles from './cart.module.scss';
import { Input, Textarea } from '../../../shared/ui';
import type { FormData } from '../model/types';

export const CartDelivery: React.FC = memo(() => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormData>();

	return (
		<div className={styles.block}>
			<h2 className={styles.block__title}>Адрес доставки</h2>
			<hr className='divider' />
			<Input
				label='Введите адрес'
				type='text'
				{...register('address', { required: 'Введите адрес' })}
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
