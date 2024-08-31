import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/main.css';
import 'antd/dist/antd.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass the
// URL prefix to the reportWebVitals(constWebVitals(
//   (WebVitals(
//     typeof worker.serviceWorker !== 'undefined' ? worker.serviceWorker.register() : () => {}
//   )
// );