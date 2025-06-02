import React from 'react';
import { ProductCard, ProductCardSkeleton } from '../../../entities/product';
import { Button } from '../../../shared/ui';
import styles from './home.module.scss';
import type { Product } from '../model/types';

interface ProductsListProps {
	products: Product[];
	isLoading: boolean;
	visibleCount: number;
	onShowMore: () => void;
}

export const ProductsList: React.FC<ProductsListProps> = ({
	products,
	isLoading,
	visibleCount,
	onShowMore,
}) => {
	const visibleProducts = products.slice(0, visibleCount);

	return (
		<>
			<div className={styles.page__products}>
				{isLoading
					? [...Array(6)].map((_, index) => <ProductCardSkeleton key={index} />)
					: visibleProducts.map(product => (
							<ProductCard
								key={product.id}
								id={product.id}
								name={product.name}
								price={product.price}
								preview={product.preview}
							/>
					  ))}
			</div>
			{visibleCount < products.length && (
				<Button onClick={onShowMore}>Показать ещё</Button>
			)}
		</>
	);
};
