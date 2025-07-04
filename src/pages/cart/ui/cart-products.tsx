import type { Product } from '../model/types';

import styles from './cart.module.scss';
import { CartProductItem } from './cart-product-item';
import { memo } from 'react';

interface CartProductsProps {
	products: Product[];
	quantityMap: Map<string, number>;
}

export const CartProducts: React.FC<CartProductsProps> = memo(
	({ products, quantityMap }) => {
		return (
			<div className={styles.block}>
				<h2 className={styles.block__title}>Корзина</h2>
				<hr className='divider' />
				<div className={styles.block__products}>
					{products.map(product => {
						const quantity = quantityMap.get(product.id.toString());
						if (quantity === undefined) return null;
						return (
							<CartProductItem
								key={product.id}
								product={product}
								quantity={quantity}
							/>
						);
					})}
				</div>
			</div>
		);
	}
);
