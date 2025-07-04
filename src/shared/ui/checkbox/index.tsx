import classNames from 'classnames';

import styles from './checkbox.module.scss';
import { memo } from 'react';
import { CheckIcon } from '../icons';

interface Props {
	checked: boolean;
	onChange?: () => void;
}

export const Checkbox: React.FC<Props> = memo(({ checked, onChange }) => {
	return (
		<div
			className={classNames(
				styles.checkbox,
				checked && styles.checkbox__checked
			)}
			onClick={onChange}
		>
			{checked && <CheckIcon />}
		</div>
	);
});
