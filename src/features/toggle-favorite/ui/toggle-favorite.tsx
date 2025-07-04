import { toggleFavorite } from '../../../entities/favorite/model/favoritesSlice';
import {
	useAppDispatch,
	useAppSelector,
} from '../../../shared/lib/hooks/redux';
import { LikeButton } from '../../../shared/ui';

interface Props {
	productId: string;
	className?: string;
}

export const ToggleFavorite: React.FC<Props> = ({ productId, className }) => {
	const dispatch = useAppDispatch();
	const isFavorite = useAppSelector(
		state => state.favorites.includes(productId),
		(prev, next) => prev === next
	);

	const handleClick = () => {
		dispatch(toggleFavorite(productId));
	};

	return (
		<LikeButton
			className={className}
			isFavorite={isFavorite}
			onToggle={handleClick}
		/>
	);
};
