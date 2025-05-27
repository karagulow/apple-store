import classNames from 'classnames';
import styles from './input.module.scss';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, type, ...rest }, ref) => {
		return (
			<label className={styles.input}>
				<span className={styles.input__label}>{label}</span>
				<input
					className={classNames(styles.input__field, {
						[styles.input__field_error]: !!error,
					})}
					type={type}
					ref={ref}
					{...rest}
				/>
				{error && <span className={styles.input__error}>{error}</span>}
			</label>
		);
	}
);

Input.displayName = 'Input';
