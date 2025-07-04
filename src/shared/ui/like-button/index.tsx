import classNames from 'classnames';

import styles from './like-button.module.scss';
import { HeartIcon } from '../icons';

interface Props {
	isFavorite: boolean;
	onToggle: () => void;
	className?: string;
}

export const LikeButton: React.FC<Props> = ({
	isFavorite,
	onToggle,
	className,
}) => {
	return (
		<button
			className={classNames(
				styles.btn,
				isFavorite && styles.btn_active,
				className
			)}
			onClick={onToggle}
		>
			<HeartIcon />
		</button>
	);
};
