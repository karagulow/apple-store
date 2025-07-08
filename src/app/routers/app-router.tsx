import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AuthLayout, MainLayout } from '../layouts';
import { ScrollToTop } from '../../shared/ui';
import { routeConfig } from './route-config';
import { lazyImport } from '../../shared/lib/lazy-component';
import { PublicOnlyRoute } from './public-only-route';

const Login = lazyImport(() => import('../../pages/auth'), 'Login');
const Registration = lazyImport(
	() => import('../../pages/auth'),
	'Registration'
);
const ForgotPassword = lazyImport(
	() => import('../../pages/auth'),
	'ForgotPassword'
);
const ResetPassword = lazyImport(
	() => import('../../pages/auth'),
	'ResetPassword'
);
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
					<Route path='/' element={<AuthLayout />}>
						<Route element={<PublicOnlyRoute />}>
							<Route path={routeConfig.login} element={<Login />} />
							<Route
								path={routeConfig.registration}
								element={<Registration />}
							/>
							<Route
								path={routeConfig.forgot_password}
								element={<ForgotPassword />}
							/>
							<Route
								path={routeConfig.reset_password}
								element={<ResetPassword />}
							/>
						</Route>
					</Route>
				</Routes>
			</Suspense>
		</>
	);
};
