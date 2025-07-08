import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import styles from './auth.module.scss';
import { Button, Input } from '../../../shared/ui';

import { useAppDispatch } from '../../../shared/lib/hooks/redux';
import { registerThunk } from '../../../entities/session/model/sessionSlice';
import type { RegistrationFormData } from '../model/types';

export const Registration = () => {
	const { register, handleSubmit } = useForm<RegistrationFormData>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const onSubmit = async (data: RegistrationFormData) => {
		if (data.password !== data.confirmPassword) return;
		const result = await dispatch(
			registerThunk({ email: data.email, password: data.password })
		);
		if (registerThunk.fulfilled.match(result)) {
			navigate('/');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<h1 className={styles.title}>Регистрация</h1>
			<div className={styles.form__wrapper}>
				<Input
					{...register('email')}
					label='Email'
					placeholder='Введите почту'
					type='email'
				/>
				<Input
					{...register('password')}
					label='Пароль'
					placeholder='Введите пароль'
					type='password'
				/>
				<Input
					{...register('confirmPassword')}
					label='Подтверждение пароля'
					placeholder='Подтвердите пароль'
					type='password'
				/>
			</div>
			<Button type='submit'>Зарегистрироваться</Button>
			<div className={styles.links}>
				<Link className={styles.links__item} to='/login'>
					Авторизация
				</Link>
			</div>
		</form>
	);
};
