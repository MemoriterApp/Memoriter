//css file imports go all here
import './index.css';

import './pages/login-stuff/login/sign-in-main.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './technical/utils/store';
//import { MongoManager } from './technical/utils/firebase';

/*export const mongo = new MongoManager('mongodb://localhost:27017');
mongo.connect();
*/
const container = document.getElementById('root');

const root = createRoot(container);

root.render(
    <BrowserRouter> {/*routing component*/}
        <Provider store={store}> {/*global state provider*/}
            <App/> {/*the react app*/}
        </Provider>
    </BrowserRouter>
);