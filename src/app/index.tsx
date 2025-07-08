import { AppRouter } from './routers/app-router';

import { useAppDispatch } from '../shared/lib/hooks/redux';
import { fetchSession } from '../entities/session/model/sessionSlice';

import './styles/main.scss';

export const App = () => {
	const dispatch = useAppDispatch();
	dispatch(fetchSession());

	return (
		<div className='app'>
			<AppRouter />
		</div>
	);
};
