import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../shared/lib/hooks/redux';

export const PrivateRoute = () => {
	const user = useAppSelector(state => state.session.user);

	if (!user) {
		return <Navigate to='/login' replace />;
	}

	return <Outlet />;
};
