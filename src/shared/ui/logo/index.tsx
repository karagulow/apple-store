import styles from './logo.module.scss';
import logo from '../../assets/images/logo.svg';

export const Logo: React.FC = () => {
	return (
		<div className={styles.logo}>
			<img className={styles.logo__icon} src={logo} alt='logo' />
			<p className={styles.logo__text}>
				Apple<span>Store</span>
			</p>
		</div>
	);
};
