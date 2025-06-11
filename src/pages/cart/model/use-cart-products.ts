import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../shared/lib/hooks/redux';
import type { Product } from './types';
import { getProductsByIds } from '../model/api';

export const useCartProducts = () => {
	const cart = useAppSelector(state => state.cart);
	const [isLoading, setIsLoading] = useState(true);
	const [products, setProducts] = useState<Product[]>([]);

	// Загрузка товаров при монтировании
	useEffect(() => {
		const fetchCartProducts = async () => {
			if (cart.length === 0) {
				setProducts([]);
				setIsLoading(false);
				return;
			}

			setIsLoading(true);

			try {
				const result = await getProductsByIds(cart.map(c => c.id));
				setProducts(result);
			} catch (error) {
				console.error('Ошибка загрузки корзины:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCartProducts();
	}, []); // Пустой массив зависимостей - только при монтировании

	// Синхронизация продуктов при изменении корзины
	useEffect(() => {
		if (cart.length === 0) {
			setProducts([]);
			return;
		}

		setProducts(prev => {
			const newProducts = prev.filter(p =>
				cart.some(item => item.id === p.id.toString())
			);

			if (newProducts.length === cart.length) return prev;

			return newProducts;
		});
	}, [cart]);

	return { isLoading, products, cart };
};
