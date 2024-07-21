import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import './HomePage.css';

const HomePage = () => {
  const { signIn } = useAuthContext();

  const handleSignIn = async () => {
    try {
      await signIn().then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error("Error signing in", error);
    }
  };

  return (
    <div className="main-container">
      <div className="header-container">
        <div className="left-container"></div>
        <div className="right-container">
          <div className="hero-section">
            <h1>Welcome to Cozy Coves</h1>
            <p>Rent your house or find a place to stay with ease</p>
          </div>
          <div className="login-button-container">
            <button onClick={handleSignIn} className="nav-button">Log In | Register</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
