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
	const favorites = useAppSelector(state => state.favorites);
	const isFavorite = favorites.includes(productId);

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
