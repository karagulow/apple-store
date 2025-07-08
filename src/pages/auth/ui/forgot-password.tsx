import { Link } from 'react-router-dom';

import styles from './auth.module.scss';
import { Button, Input } from '../../../shared/ui';

export const ForgotPassword = () => {
	return (
		<form className={styles.form}>
			<h1 className={styles.title}>Забыли пароль?</h1>
			<div className={styles.form__wrapper}>
				<Input label='Email' placeholder='Введите почту' type='email' />
			</div>
			<Button>Отправить</Button>
			<div className={styles.links}>
				<Link className={styles.links__item} to='/login'>
					Авторизация
				</Link>
			</div>
		</form>
	);
};
