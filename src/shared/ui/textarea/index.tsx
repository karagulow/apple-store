import classNames from 'classnames';
import styles from './textarea.module.scss';
import { forwardRef } from 'react';

interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ label, error, ...rest }, ref) => {
		return (
			<label className={styles.textarea}>
				<span className={styles.textarea__label}>{label}</span>
				<textarea
					className={classNames(styles.textarea__field, {
						[styles.textarea__field_error]: !!error,
					})}
					ref={ref}
					{...rest}
				/>
				{error && <span className={styles.textarea__error}>{error}</span>}
			</label>
		);
	}
);

Textarea.displayName = 'Textarea';
