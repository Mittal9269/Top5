import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./store/index";
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import { Provider } from "react-redux";


ReactDOM.render(
  <Provider store = {store}>
        <App />
  </Provider>,
  document.getElementById('root')
);
