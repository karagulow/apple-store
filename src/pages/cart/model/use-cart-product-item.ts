import { useAppDispatch } from '../../../shared/lib/hooks/redux';
import {
	changeQuantity,
	removeFromCart,
} from '../../../entities/cart/model/cartSlice';

export const useCartProductItem = (productId: string, quantity: number) => {
	const dispatch = useAppDispatch();

	const increment = () => {
		dispatch(changeQuantity({ id: productId, quantity: quantity + 1 }));
	};

	const decrement = () => {
		if (quantity > 1) {
			dispatch(changeQuantity({ id: productId, quantity: quantity - 1 }));
		}
	};

	const remove = () => {
		dispatch(removeFromCart(productId));
	};

	const isMinQuantity = quantity <= 1;

	return {
		increment,
		decrement,
		remove,
		isMinQuantity,
	};
};
