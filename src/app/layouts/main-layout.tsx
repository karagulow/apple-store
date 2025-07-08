import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

import { Header } from '../../widgets/header';
import { Container } from '../../shared/ui';

export const MainLayout: React.FC = () => {
	return (
		<div className={styles.main}>
			<Header />
			<main>
				<Container>
					<Outlet />
				</Container>
			</main>
		</div>
	);
};
