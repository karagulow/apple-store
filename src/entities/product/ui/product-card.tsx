import { memo } from 'react';
import { Link } from 'react-router-dom';

import styles from './product-card.module.scss';

import { ToggleFavorite } from '../../../features/toggle-favorite';
import { ToggleCart } from '../../../features/toggle-cart';

interface ProductCardProps {
	id: string;
	name: string;
	price: number;
	preview: string;
}

export const ProductCard: React.FC<ProductCardProps> = memo(
	({ id, name, price, preview }) => {
		const formatPrice = (price: number) => {
			return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
		};

		return (
			<div className={styles.product}>
				<Link className={styles.product__link} to={`/products/${id}`}>
					<div className={styles.product__preview}>
						<img src={preview} alt={name} />
					</div>

					<h3 className={styles.product__name}>{name}</h3>
				</Link>

				<div className={styles.product__bottom}>
					<div className={styles.product__price}>{formatPrice(price)}</div>
					<ToggleCart
						productId={id.toString()}
						className={styles.product__btn}
					/>
				</div>

				<ToggleFavorite
					className={styles.product__favorite}
					productId={id.toString()}
				/>
			</div>
		);
	}
);
