import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import {firebase} from "./utils/firebase";

console.log(firebase);

window.firebase = firebase;

ReactDOM.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
  document.getElementById('root')
);

