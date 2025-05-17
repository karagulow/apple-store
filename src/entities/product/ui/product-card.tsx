import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from './product-card.module.scss';
import classNames from 'classnames';

interface ProductCardProps {
	id: string;
	name: string;
	price: number;
	image: string;
	isFavorite?: boolean;
	isInCart?: boolean;
	onAddToCart?: (id: string) => void;
	onToggleFavorite?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
	id,
	name,
	price,
	image,
	isFavorite = false,
	isInCart = false,
	onAddToCart,
	onToggleFavorite,
}) => {
	const [localIsFavorite, setLocalIsFavorite] = useState(isFavorite);
	const [localIsInCart, setLocalIsInCart] = useState(isInCart);

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault();
		setLocalIsInCart(true);
		onAddToCart?.(id);
	};

	const handleToggleFavorite = (e: React.MouseEvent) => {
		e.preventDefault();
		setLocalIsFavorite(!localIsFavorite);
		onToggleFavorite?.(id);
	};

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat('ru-RU').format(price) + ' ₽';
	};

	return (
		<Link to={`/products/${id}`} className={styles.product}>
			<div className={styles.product__preview}>
				<img src={image} alt={name} />
			</div>

			<h3 className={styles.product__name}>{name}</h3>

			<div className={styles.product__bottom}>
				<div className={styles.product__price}>{formatPrice(price)}</div>
				<button
					className={classNames(
						styles.product__btn,
						localIsInCart && styles.product__btn_cart
					)}
					onClick={handleAddToCart}
				>
					{localIsInCart ? (
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

			<button
				className={classNames(
					styles.product__favorite,
					localIsFavorite && styles.product__favorite_active
				)}
				onClick={handleToggleFavorite}
			>
				<svg
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g clipPath='url(#clip0_100632_329)'>
						<path
							d='M21 8.25C21 5.765 18.901 3.75 16.312 3.75C14.377 3.75 12.715 4.876 12 6.483C11.285 4.876 9.623 3.75 7.687 3.75C5.1 3.75 3 5.765 3 8.25C3 15.47 12 20.25 12 20.25C12 20.25 21 15.47 21 8.25Z'
							stroke='#212121'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</g>
					<defs>
						<clipPath id='clip0_100632_329'>
							<rect width='24' height='24' fill='white' />
						</clipPath>
					</defs>
				</svg>
			</button>
		</Link>
	);
};
