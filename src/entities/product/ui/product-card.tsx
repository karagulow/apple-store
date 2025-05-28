import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './product-card.module.scss';
import { ToggleFavorite } from '../../../features/toggle-favorite';

interface ProductCardProps {
	id: string;
	name: string;
	price: number;
	image: string;
	isFavorite?: boolean;
	isInCart?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
	id,
	name,
	price,
	image,
	isInCart = false,
}) => {
	const handleAddToCart = () => {
		// Логика добавления в корзину
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
	};

	return (
		<div className={styles.product}>
			<Link className={styles.product__link} to={`/products/${id}`}>
				<div className={styles.product__preview}>
					<img src={image} alt={name} />
				</div>

				<h3 className={styles.product__name}>{name}</h3>
			</Link>

			<div className={styles.product__bottom}>
				<div className={styles.product__price}>{formatPrice(price)}</div>
				<button
					className={classNames(
						styles.product__btn,
						isInCart && styles.product__btn_cart
					)}
					onClick={handleAddToCart}
				>
					{isInCart ? (
						<svg
							width='18'
							height='18'
							viewBox='0 0 18 18'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M3.375 9.5625L7.875 14.0625L14.625 3.9375'
								stroke='white'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					) : (
						<svg
							width='18'
							height='18'
							viewBox='0 0 18 18'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M9 4.04163V15.2916M14.625 9.66663H3.375'
								stroke='#6B6B6B'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					)}
				</button>
			</div>

			<ToggleFavorite
				className={styles.product__favorite}
				productId={id.toString()}
			/>
		</div>
	);
};
