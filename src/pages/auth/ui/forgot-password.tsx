import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import styles from './auth.module.scss';
import { Button, Input } from '../../../shared/ui';

import type { ForgotPasswordFormData } from '../model/types';
import { useForgotPassword } from '../model/use-forgot-password';

export const ForgotPassword = () => {
	const { register, handleSubmit } = useForm<ForgotPasswordFormData>();
	const { sendResetEmail, loading, error } = useForgotPassword();

	const onSubmit = async (data: ForgotPasswordFormData) => {
		const success = await sendResetEmail(data.email);
		if (success) {
			alert('Письмо отправлено!');
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h1 className={styles.title}>Забыли пароль?</h1>
			<div className={styles.form__wrapper}>
				<Input
					label='Email'
					{...register('email')}
					placeholder='Введите почту'
					type='email'
				/>
			</div>
			{error && <p className={styles.error}>{error}</p>}{' '}
			<Button disabled={loading} type='submit'>
				Отправить
			</Button>
			<div className={styles.links}>
				<Link className={styles.links__item} to='/login'>
					Авторизация
				</Link>
			</div>
		</form>
	);
};
