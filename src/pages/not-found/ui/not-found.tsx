import { Button } from '../../../shared/ui';
import styles from './not-found.module.scss';

export const NotFound: React.FC = () => {
	return (
		<div className={styles.page}>
			<h1 className={styles.page__title}>404 - Страница не найдена</h1>
			<p className={styles.page__text}>
				Извините, запрашиваемая страница не существует.
			</p>
			<Button className={styles.page__button}>Перейти на главную</Button>
		</div>
	);
};
