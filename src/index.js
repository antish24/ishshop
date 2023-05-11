import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import {store} from './store/store'
import Context from './store/Context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <BrowserRouter>
  <React.StrictMode>
  <Provider store={store}>
  <App />
</Provider>
  </React.StrictMode>
  </BrowserRouter>
  </Context>
);

