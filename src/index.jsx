import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <>
      <ToastContainer position="bottom-left" />
      <App />
    </>
  </React.StrictMode>,
  document.getElementById('root'),
);
