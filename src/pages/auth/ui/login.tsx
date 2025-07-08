import { Link } from 'react-router-dom';

import styles from './auth.module.scss';
import { Button, Input } from '../../../shared/ui';

export const Login = () => {
	return (
		<form className={styles.form}>
			<h1 className={styles.title}>Авторизация</h1>
			<div className={styles.form__wrapper}>
				<Input label='Email' placeholder='Введите почту' type='email' />
				<Input label='Пароль' placeholder='Введите пароль' type='password' />
			</div>
			<Button>Войти</Button>
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
