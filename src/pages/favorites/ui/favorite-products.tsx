import { useState, useEffect } from 'react';

import styles from './favorites.module.scss';

import { ProductCard, ProductCardSkeleton } from '../../../entities/product';

import { useAppSelector } from '../../../shared/lib/hooks/redux';
import { getProductsByIds } from '../model/api';

import type { Product } from '../model/types';

export const FavoriteProducts: React.FC = () => {
	const favoritesId = useAppSelector(state => state.favorites);
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchFavorites = async () => {
			if (favoritesId.length === 0) {
				setProducts([]);
				setIsLoading(false);
				return;
			}

			setIsLoading(true);

			try {
				const result = await getProductsByIds(favoritesId);
				setProducts(result);
			} catch (error) {
				console.error('Ошибка загрузки избранного:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchFavorites();
	}, []);

	return (
		<div className={styles.products}>
			{isLoading ? (
				[...Array(6)].map((_, index) => <ProductCardSkeleton key={index} />)
			) : products.length > 0 ? (
				products.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.price}
						preview={product.preview}
					/>
				))
			) : (
				<p>Нет избранных товаров</p>
			)}
		</div>
	);
};
