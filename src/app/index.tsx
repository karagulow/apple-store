import React from 'react';

import { AppRouter } from './routers/app-router';

import './styles/main.scss';

const App: React.FC = () => {
	return (
		<div className='app'>
			<AppRouter />
		</div>
	);
};

export default App;
