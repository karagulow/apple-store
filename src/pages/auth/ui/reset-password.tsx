import { useForm } from 'react-hook-form';
import { useResetPassword } from '../model/use-reset-password';

import styles from './auth.module.scss';
import { Button, Input } from '../../../shared/ui';
import type { ResetPasswordFormData } from '../model/types';

export const ResetPassword = () => {
	const { register, handleSubmit } = useForm<ResetPasswordFormData>();
	const { resetPassword, loading, error } = useResetPassword();

	const onSubmit = async (data: ResetPasswordFormData) => {
		if (data.password !== data.confirmPassword)
			return alert('Пароли не совпадают');
		const success = await resetPassword(data.password);
		if (success) {
			alert('Пароль обновлён');
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
			<h1 className={styles.title}>Сброс пароля</h1>
			<div className={styles.form__wrapper}>
				<Input
					label='Новый пароль'
					type='password'
					placeholder='Придумайте пароль'
					{...register('password')}
				/>
				<Input
					label='Подтверждение пароля'
					type='password'
					placeholder='Подтвердите пароль'
					{...register('confirmPassword')}
				/>
			</div>
			{error && <p className={styles.error}>{error}</p>}
			<Button disabled={loading} type='submit'>
				Сбросить
			</Button>
		</form>
	);
};
