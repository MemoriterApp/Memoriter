//css file imports go all here
import './index.css';

import './pages/loginStuff/login/sign-in-main.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './technical/utils/store';

ReactDOM.render( //this renders the react app
  <BrowserRouter> {/*routing component*/}
    <Provider store={store}> {/*global state provider*/}
      <App/> {/*the react app*/}
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);