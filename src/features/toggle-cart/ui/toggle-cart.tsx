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
import { CheckIcon, PlusIcon } from '../../../shared/ui';

interface Props {
	productId: string;
	className?: string;
}

export const ToggleCart: React.FC<Props> = ({ productId, className }) => {
	const dispatch = useAppDispatch();
	const isInCart = useAppSelector(
		state => state.cart.some(item => item.id === productId),
		(prev, next) => prev === next
	);

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
			{isInCart ? <CheckIcon /> : <PlusIcon />}
		</button>
	);
};
