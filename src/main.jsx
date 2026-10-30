import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const root = document.getElementById('root');
const isAdmin = window.location.pathname === '/admin';
const application = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (isAdmin) {
  document.querySelector('meta[name="robots"]')?.setAttribute('content', 'noindex, nofollow');
}

if (root.childElementCount > 0 && !isAdmin) {
  ReactDOM.hydrateRoot(root, application);
} else {
  ReactDOM.createRoot(root).render(application);
}
