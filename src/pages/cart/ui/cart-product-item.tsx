import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import styles from './cart.module.scss';
import { DeleteIcon, MinusIcon, PlusIcon } from '../../../shared/ui';
import previewPlaceholder from '../../../shared/assets/images/not-found-image.jpg';

import type { Product } from '../model/types';
import { useCartProductItem } from '../model/use-cart-product-item';

interface Props {
	product: Product;
	quantity: number;
}

export const CartProductItem: React.FC<Props> = memo(
	({ product, quantity }) => {
		const { decrement, increment, remove, isMinQuantity } = useCartProductItem(
			product.id.toString(),
			quantity
		);

		return (
			<div className={styles.product}>
				<Link to={`/products/${product.id}`}>
					<img
						className={styles.product__preview}
						src={product.preview || previewPlaceholder}
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
								[styles.product__counter__btn_disabled]: isMinQuantity,
							})}
							disabled={isMinQuantity}
							type='button'
							onClick={decrement}
						>
							<MinusIcon />
						</button>
						<span className={styles.product__counter__value}>{quantity}</span>
						<button
							className={styles.product__counter__btn}
							type='button'
							onClick={increment}
						>
							<PlusIcon />
						</button>
					</div>
					<button
						className={styles.product__delete}
						type='button'
						onClick={remove}
					>
						<DeleteIcon />
					</button>
				</div>
			</div>
		);
	}
);
