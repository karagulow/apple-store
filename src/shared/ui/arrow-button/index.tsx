import { memo } from 'react';
import { RightIcon, LeftIcon } from '../icons';
import styles from './arrow-button.module.scss';
import classNames from 'classnames';

interface ArrowButtonProps {
	direction: 'left' | 'right';
	onClick?: () => void;
	className?: string;
}

export const ArrowButton: React.FC<ArrowButtonProps> = memo(
	({ direction, onClick, className }) => {
		return (
			<button
				type='button'
				className={classNames(styles.btn, className)}
				onClick={onClick}
			>
				{direction === 'left' ? (
					<LeftIcon />
				) : (
					direction === 'right' && <RightIcon />
				)}
			</button>
		);
	}
);
