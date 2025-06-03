import { AppRouter } from './routers/app-router';

import './styles/main.scss';

export const App = () => {
	return (
		<div className='app'>
			<AppRouter />
		</div>
	);
};
