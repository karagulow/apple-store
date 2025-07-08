import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import styles from './auth.module.scss';
import { Button, Input } from '../../../shared/ui';

import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/lib/hooks/redux';
import { loginThunk } from '../../../entities/session/model/sessionSlice';
import type { LoginFormData } from '../model/types';

export const Login = () => {
	const { register, handleSubmit } = useForm<LoginFormData>();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(state => state.session.error);

	const onSubmit = async (data: LoginFormData) => {
		const result = await dispatch(loginThunk(data));
		if (loginThunk.fulfilled.match(result)) {
			navigate('/');
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<h1 className={styles.title}>Авторизация</h1>
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
			</div>
			{error && <p className={styles.error}>{error}</p>}
			<Button type='submit'>Войти</Button>
			<div className={styles.links}>
				<Link className={styles.links__item} to='/registration'>
					Регистрация
				</Link>
				<Link className={styles.links__item} to='/forgot_password'>
					Забыли пароль?
				</Link>
			</div>
		</form>
	);
};
