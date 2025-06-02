import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { Cart, Favorites, Home, NotFound, Product } from '../../pages';
import { ScrollToTop } from '../../shared/ui';

export const AppRouter: React.FC = () => {
	return (
		<>
			<ScrollToTop />
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route index element={<Home />} />
					<Route path='/products/:id' element={<Product />} />
					<Route path='/favorites' element={<Favorites />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
};
