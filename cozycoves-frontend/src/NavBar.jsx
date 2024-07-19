import React from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './NavBar.css';

const NavBar = () => {
  const { signOut, isAuthenticated } = useAuthContext();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const authStatus = await isAuthenticated();
        console.log("Authentication status:", authStatus);
      } catch (error) {
        console.error("Error checking authentication status:", error);
      }
    };

    checkAuthentication();
  }, [isAuthenticated]);

  const handleSignOut = async () => {
    try {
      await signOut().then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <nav className="navbar">
      <h1>Cozy Coves</h1>
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <button onClick={handleSignOut}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
