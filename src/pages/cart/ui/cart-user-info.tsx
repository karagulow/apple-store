import styles from './cart.module.scss';
import { Input } from '../../../shared/ui';
import type { CartFormProps } from '../model/types';

export const CartUserInfo: React.FC<CartFormProps> = ({ register, errors }) => (
	<div className={styles.block}>
		<h2 className={styles.block__title}>Персональная информация</h2>
		<hr className='divider' />
		<div className={styles.block__info}>
			<Input
				label='Имя'
				type='text'
				{...register('firstName', { required: 'Введите имя' })}
				error={errors.firstName?.message}
			/>
			<Input
				label='Фамилия'
				type='text'
				{...register('lastName', { required: 'Введите фамилию' })}
				error={errors.lastName?.message}
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
				error={errors.email?.message}
			/>
			<Input
				label='Телефон'
				type='tel'
				{...register('phone', {
					required: 'Введите номер телефона',
					pattern: {
						value: /^((\+7|7|8)[\s-]?)?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}$/,
						message: 'Некорректный номер телефона',
					},
				})}
				error={errors.phone?.message}
			/>
		</div>
	</div>
);
