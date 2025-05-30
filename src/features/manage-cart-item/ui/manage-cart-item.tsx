import classNames from 'classnames';
import styles from './manage-cart-item.module.scss';

import { Button } from '../../../shared/ui';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/lib/hooks/redux';
import {
	addToCart,
	removeFromCart,
	changeQuantity,
} from '../../../entities/cart/model/cartSlice';

interface Props {
	productId: string;
	className?: string;
}

export const ManageCartItem: React.FC<Props> = ({ productId, className }) => {
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

			<div className={styles.value}>
				<span>{cartItem.quantity}</span> В корзине
			</div>

			<button
				className={styles.operator}
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
	);
};
