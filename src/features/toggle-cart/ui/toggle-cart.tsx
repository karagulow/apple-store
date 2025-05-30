import styles from './toggle-cart.module.scss';

import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/lib/hooks/redux';
import {
	addToCart,
	removeFromCart,
} from '../../../entities/cart/model/cartSlice';
import classNames from 'classnames';

interface Props {
	productId: string;
	className?: string;
}

export const ToggleCart: React.FC<Props> = ({ productId, className }) => {
	const dispatch = useAppDispatch();
	const cart = useAppSelector(state => state.cart);
	const isInCart = cart.some(item => item.id === productId);

	const handleAddToCart = () => {
		if (isInCart) {
			dispatch(removeFromCart(productId));
		} else {
			dispatch(addToCart(productId));
		}
	};

	return (
		<button
			className={classNames(className, isInCart && styles.active)}
			onClick={handleAddToCart}
		>
			{isInCart ? (
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
	);
};
