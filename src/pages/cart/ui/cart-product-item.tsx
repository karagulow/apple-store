import classNames from 'classnames';

import styles from './cart.module.scss';

import type { Product } from '../model/types';
import { useAppDispatch } from '../../../shared/lib/hooks/redux';
import {
	changeQuantity,
	removeFromCart,
} from '../../../entities/cart/model/cartSlice';
import { Link } from 'react-router-dom';

interface Props {
	product: Product;
	quantity: number;
}

export const CartProductItem: React.FC<Props> = ({ product, quantity }) => {
	const dispatch = useAppDispatch();

	const handleDecrement = () => {
		if (quantity > 1) {
			dispatch(
				changeQuantity({ id: product.id.toString(), quantity: quantity - 1 })
			);
		}
	};

	const handleIncrement = () => {
		dispatch(
			changeQuantity({ id: product.id.toString(), quantity: quantity + 1 })
		);
	};

	const handleRemove = () => {
		dispatch(removeFromCart(product.id.toString()));
	};

	return (
		<div className={styles.product}>
			<Link to={`/products/${product.id}`}>
				<img
					className={styles.product__preview}
					src={product.preview}
					alt={product.name}
				/>
			</Link>
			<Link to={`/products/${product.id}`} className={styles.product__name}>
				{product.name}
			</Link>
			<p className={styles.product__price}>
				{product.price.toLocaleString('ru-RU')} ₽ <span>x {quantity}</span>
			</p>
			<div className={styles.product__actions}>
				<div className={styles.product__counter}>
					<button
						className={classNames(styles.product__counter__btn, {
							[styles.product__counter__btn_disabled]: quantity <= 1,
						})}
						disabled={quantity <= 1}
						type='button'
						onClick={handleDecrement}
					>
						<svg
							width='18'
							height='18'
							viewBox='0 0 18 18'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M3.75 9H14.25'
								stroke='#6B6B6B'
								strokeWidth='1.5'
								strokeLinecap='round'
								strokeLinejoin='round'
							/>
						</svg>
					</button>
					<span className={styles.product__counter__value}>{quantity}</span>
					<button
						className={styles.product__counter__btn}
						type='button'
						onClick={handleIncrement}
					>
						<svg
							width='18'
							height='19'
							viewBox='0 0 18 19'
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
					</button>
				</div>
				<button
					className={styles.product__delete}
					type='button'
					onClick={handleRemove}
				>
					<svg
						width='30'
						height='30'
						viewBox='0 0 30 30'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M17.74 12L17.394 21M12.606 21L12.26 12M22.228 8.79C22.57 8.842 22.91 8.897 23.25 8.956M22.228 8.79L21.16 22.673C21.1164 23.2382 20.8611 23.7662 20.445 24.1512C20.029 24.5363 19.4829 24.7502 18.916 24.75H11.084C10.5171 24.7502 9.97102 24.5363 9.55498 24.1512C9.13894 23.7662 8.88359 23.2382 8.84 22.673L7.772 8.79M22.228 8.79C21.0739 8.61552 19.9138 8.4831 18.75 8.393M7.772 8.79C7.43 8.841 7.09 8.896 6.75 8.955M7.772 8.79C8.92613 8.61552 10.0862 8.4831 11.25 8.393M18.75 8.393V7.477C18.75 6.297 17.84 5.313 16.66 5.276C15.5536 5.24064 14.4464 5.24064 13.34 5.276C12.16 5.313 11.25 6.298 11.25 7.477V8.393M18.75 8.393C16.2537 8.20008 13.7463 8.20008 11.25 8.393'
							stroke='#CBCBCB'
							strokeWidth='1.5'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};
