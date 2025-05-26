import styles from './arrow-button.module.scss';
import classNames from 'classnames';

interface ArrowButtonProps {
	direction: 'left' | 'right';
	onClick?: () => void;
	className?: string;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
	direction,
	onClick,
	className,
}) => {
	const leftIcon = (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M14.75 19.5L7.25 12L14.75 4.5'
				stroke='#6B6B6B'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);

	const rightIcon = (
		<svg
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M9.25 4.5L16.75 12L9.25 19.5'
				stroke='#6B6B6B'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);

	return (
		<button
			type='button'
			className={classNames(styles.btn, className)}
			onClick={onClick}
		>
			{direction === 'left' ? leftIcon : direction === 'right' && rightIcon}
		</button>
	);
};
