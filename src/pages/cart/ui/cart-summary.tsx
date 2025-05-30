import styles from './cart.module.scss';
import { Button } from '../../../shared/ui';
import type { Product } from '../model/types';

interface Props {
	products: Product[];
	quantityMap: Map<string, number>;
	deliveryPrice?: number;
}

export const CartSummary: React.FC<Props> = ({
	products,
	quantityMap,
	deliveryPrice = 3000,
}) => {
	const productsTotal = products.reduce((sum, product) => {
		const quantity = quantityMap.get(product.id.toString()) ?? 0;
		return sum + product.price * quantity;
	}, 0);

	const total = productsTotal + deliveryPrice;

	return (
		<div className={styles.block} style={{ rowGap: '30px' }}>
			<h2 className={styles.block__title} style={{ fontWeight: '400' }}>
				К оформлению
			</h2>
			<div className={styles.block__total}>
				<div className={styles.block__total__item}>
					<span className={styles.text}>Стоимость товаров</span>
					<span className={styles.text}>
						{productsTotal.toLocaleString('ru-RU')} ₽
					</span>
				</div>
				<div className={styles.block__total__item}>
					<span className={styles.text}>Доставка</span>
					<span className={styles.text}>
						{deliveryPrice.toLocaleString('ru-RU')} ₽
					</span>
				</div>
				<hr className='divider' />
				<div className={styles.block__total__item}>
					<span className={styles.text} style={{ fontWeight: '600' }}>
						Итого
					</span>
					<span className={styles.text} style={{ fontWeight: '600' }}>
						{total.toLocaleString('ru-RU')} ₽
					</span>
				</div>
			</div>
			<Button type='submit'>Перейти к оплате</Button>
		</div>
	);
};
