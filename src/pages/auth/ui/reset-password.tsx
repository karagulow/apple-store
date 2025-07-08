import styles from './auth.module.scss';
import { Button, Input } from '../../../shared/ui';

export const ResetPassword = () => {
	return (
		<form className={styles.form}>
			<h1 className={styles.title}>Сброс пароля</h1>
			<div className={styles.form__wrapper}>
				<Input
					label='Новый пароль'
					placeholder='Придумайте пароль'
					type='password'
				/>
				<Input
					label='Подтверждение пароля'
					placeholder='Подтвердите пароль'
					type='password'
				/>
			</div>
			<Button>Сбросить</Button>
		</form>
	);
};
