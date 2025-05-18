import classNames from 'classnames';

import styles from './button.module.scss';

interface Props {
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	className?: string;
}

export const Button: React.FC<Props> = ({
	children,
	type = 'button',
	onClick,
	className,
}) => {
	return (
		<button
			className={classNames(className, styles.button)}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
