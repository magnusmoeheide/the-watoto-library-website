import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './articles.css'
import App from './App';
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter basename="/the-watoto-library-website">
          <App />
      </BrowserRouter>
  </React.StrictMode>
);

