import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

export const AuthLayout: React.FC = () => {
	return (
		<div className={styles.auth}>
			<Outlet />
		</div>
	);
};
