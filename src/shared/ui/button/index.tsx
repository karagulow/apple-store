import { memo } from 'react';
import classNames from 'classnames';

import styles from './button.module.scss';

interface Props {
	children: React.ReactNode;
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

export const Button: React.FC<Props> = memo(
	({ children, type = 'button', disabled, onClick, className }) => {
		return (
			<button
				className={classNames(className, styles.button)}
				type={type}
				disabled={disabled}
				onClick={onClick}
			>
				{children}
			</button>
		);
	}
);
