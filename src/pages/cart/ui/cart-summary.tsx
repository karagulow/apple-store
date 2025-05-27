import styles from './cart.module.scss';
import { Button } from '../../../shared/ui';

export const CartSummary: React.FC = () => (
	<div className={styles.block} style={{ rowGap: '30px' }}>
		<h2 className={styles.block__title} style={{ fontWeight: '400' }}>
			К оформлению
		</h2>
		<div className={styles.block__total}>
			<div className={styles.block__total__item}>
				<span className={styles.text}>Стоимость товаров</span>
				<span className={styles.text}>312 970 ₽</span>
			</div>
			<div className={styles.block__total__item}>
				<span className={styles.text}>Доставка</span>
				<span className={styles.text}>3 000 ₽</span>
			</div>
			<hr className='divider' />
			<div className={styles.block__total__item}>
				<span className={styles.text} style={{ fontWeight: '600' }}>
					Итого
				</span>
				<span className={styles.text} style={{ fontWeight: '600' }}>
					315 970 ₽
				</span>
			</div>
		</div>
		<Button type='submit'>Перейти к оплате</Button>
	</div>
);
