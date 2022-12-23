//css file imports go all here
import './index.css';

import './pages/login-stuff/login/sign-in-main.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './technical/utils/store';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
	<BrowserRouter> {/*routing component*/}
		<Provider store={store}> {/*global state provider*/}
			<App/> {/*the react app*/}
		</Provider>
	</BrowserRouter>
);