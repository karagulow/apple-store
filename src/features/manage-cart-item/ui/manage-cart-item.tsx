import classNames from 'classnames';
import styles from './manage-cart-item.module.scss';

import { Button, MinusIcon, PlusIcon } from '../../../shared/ui';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/lib/hooks/redux';
import {
	addToCart,
	removeFromCart,
	changeQuantity,
} from '../../../entities/cart/model/cartSlice';
import { memo } from 'react';

interface Props {
	productId: string;
	className?: string;
}

export const ManageCartItem: React.FC<Props> = memo(
	({ productId, className }) => {
		const dispatch = useAppDispatch();
		const cartItem = useAppSelector(state =>
			state.cart.find(item => item.id === productId)
		);

		const handleIncrement = () => {
			if (cartItem) {
				dispatch(
					changeQuantity({ id: productId, quantity: cartItem.quantity + 1 })
				);
			}
		};

		const handleDecrement = () => {
			if (cartItem) {
				if (cartItem.quantity <= 1) {
					dispatch(removeFromCart(productId));
				} else {
					dispatch(
						changeQuantity({ id: productId, quantity: cartItem.quantity - 1 })
					);
				}
			}
		};

		const handleAdd = () => {
			dispatch(addToCart(productId));
		};

		if (!cartItem) {
			return (
				<Button
					className={classNames(className, styles.button)}
					onClick={handleAdd}
				>
					Добавить в корзину
				</Button>
			);
		}

		return (
			<div
				className={classNames(className, styles.button, styles.button__counter)}
			>
				<button
					className={styles.operator}
					type='button'
					onClick={handleDecrement}
				>
					<MinusIcon />
				</button>

				<div className={styles.value}>
					<span>{cartItem.quantity}</span> В корзине
				</div>

				<button
					className={styles.operator}
					type='button'
					onClick={handleIncrement}
				>
					<PlusIcon />
				</button>
			</div>
		);
	}
);
