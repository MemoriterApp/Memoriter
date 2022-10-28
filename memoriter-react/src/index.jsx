import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import './index.css';
import App from './App';

//this renders the react app
ReactDOM.render(
  <BrowserRouter> {/*routing component*/}
    <Provider store={store}> {/*global state provider*/}
      <App/> {/*the react app*/}
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);