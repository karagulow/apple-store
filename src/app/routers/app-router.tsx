import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { Home } from '../../pages';

export const AppRouter: React.FC = () => {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
};
