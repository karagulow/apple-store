import { useFormContext } from 'react-hook-form';

import styles from './cart.module.scss';
import { Input } from '../../../shared/ui';
import type { FormData } from '../model/types';
import { memo } from 'react';

export const CartUserInfo: React.FC = memo(() => {
	const {
		register,
		formState: { errors },
	} = useFormContext<FormData>();

	return (
		<div className={styles.block}>
			<h2 className={styles.block__title}>Персональная информация</h2>
			<hr className='divider' />
			<div className={styles.block__info}>
				<Input
					label='Имя'
					type='text'
					{...register('firstName', { required: 'Введите имя' })}
					error={errors?.firstName?.message}
				/>
				<Input
					label='Фамилия'
					type='text'
					{...register('lastName', { required: 'Введите фамилию' })}
					error={errors?.lastName?.message}
				/>
				<Input
					label='Email'
					type='email'
					{...register('email', {
						required: 'Введите email',
						pattern: {
							value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							message: 'Некорректный email',
						},
					})}
					error={errors?.email?.message}
				/>
				<Input
					label='Телефон'
					type='tel'
					{...register('phone', {
						required: 'Введите номер телефона',
						pattern: {
							value: /^\+7\d{10}$/,
							message: 'Некорректный номер телефона',
						},
					})}
					error={errors?.phone?.message}
				/>
			</div>
		</div>
	);
});
