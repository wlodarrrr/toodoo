import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.body.setAttribute('data-bs-theme', 'dark');
root.render(
  <div className="top-container">
    <App />
  </div>
);
