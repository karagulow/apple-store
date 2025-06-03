import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { ScrollToTop } from '../../shared/ui';
import { routeConfig } from './route-config';
import { lazyImport } from '../../shared/lib/lazy-component';

const Home = lazyImport(() => import('../../pages/home'), 'Home');
const Product = lazyImport(() => import('../../pages/product'), 'Product');
const Favorites = lazyImport(
	() => import('../../pages/favorites'),
	'Favorites'
);
const Cart = lazyImport(() => import('../../pages/cart'), 'Cart');
const NotFound = lazyImport(() => import('../../pages/not-found'), 'NotFound');

export const AppRouter: React.FC = () => {
	return (
		<>
			<ScrollToTop />
			<Suspense fallback={<div>Загрузка...</div>}>
				<Routes>
					<Route path='/' element={<MainLayout />}>
						<Route path={routeConfig.home} element={<Home />} />
						<Route path={routeConfig.product} element={<Product />} />
						<Route path={routeConfig.favorites} element={<Favorites />} />
						<Route path={routeConfig.cart} element={<Cart />} />
						<Route path={routeConfig.notFound} element={<NotFound />} />
					</Route>
				</Routes>
			</Suspense>
		</>
	);
};
