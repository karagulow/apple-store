import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../shared/lib/hooks/redux';

export const PublicOnlyRoute = () => {
	const user = useAppSelector(state => state.session.user);

	if (user) {
		return <Navigate to='/' replace />;
	}

	return <Outlet />;
};
