import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import UserDataContext from './components/UserDataContext.js';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserDataContext>
     <React.StrictMode>
    <App />
  </React.StrictMode>
  </UserDataContext>
 
);

