import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import './HomePage.css';

const HomePage = () => {
  const { signIn } = useAuthContext();

  const handleSignIn = async () => {
    try{
        await signIn()
        .then((res)=>{
           console.log(res);
        })

    }catch (error){
        console.error("Error signing in",error);
   }
  }
  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="logo">Cozy Coves</div>
        <ul className="nav-links">
          <li>
            <button onClick={handleSignIn} className="nav-button">Log In | Register</button>
          </li>
        </ul>
      </nav>
      <div className="hero-section">
        <h1>Welcome to Cozy Coves</h1>
        <p>Rent your house or find a place to stay with ease</p>
      </div>
    </div>
  );
};

export default HomePage;
