import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes';

ReactDOM.render(
  <React.StrictMode>
    <>
      <ToastContainer position="bottom-left" />
      <Routes />
    </>
  </React.StrictMode>,
  document.getElementById('root'),
);
