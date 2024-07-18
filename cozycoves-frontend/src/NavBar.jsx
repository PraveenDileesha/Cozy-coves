import React, { useState } from 'react';
import './NavBar.css';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Logic for login (to be implemented with Asgardeo)
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Logic for logout (to be implemented with Asgardeo)
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <h1>Cozy Coves</h1>
      <ul>
        {isLoggedIn ? (
          <>
            <li><a href="/houses">My Houses</a></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><button onClick={handleLogin}>Login</button></li>
            <li><button>Sign Up</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
