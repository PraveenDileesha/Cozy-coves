import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { AuthProvider } from '@asgardeo/auth-react';
import { BrowserRouter } from 'react-router-dom';

// Example Asgardeo configuration
const authConfig = {
  clientID: 'Y_mxbniY_mHZvE4MuPsolSq24Rka', // Replace with your actual client ID
  baseUrl: 'https://api.asgardeo.io/t/pinksalt', // Replace with your actual Asgardeo base URL
  signInRedirectURL: 'http://localhost:3000/AuthPage', // Replace with your actual sign-in redirect URL
  signOutRedirectURL: 'http://localhost:3000/HomePage', // Replace with your actual sign-out redirect URL
  scope:["openid","profile","roles"],
  storage:"sessionStorage"
};

// Log the authConfig to verify the values
console.log('authConfig:', authConfig);

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider config={authConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
