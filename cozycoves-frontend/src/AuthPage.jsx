import React, { useEffect } from 'react';
import { useAuthContext } from '@asgardeo/auth-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const { state, isAuthenticated, getBasicUserInfo, getDecodedIDPIDToken } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
    isAuthenticated().then((response) => {
      if (response) {
        console.log("User is authenticated", response);
        getBasicUserInfo().then((userInfo) => {
          console.log("User information", userInfo);
          getDecodedIDPIDToken().then((token) => {
            console.log("Decoded token", token);
          });
          const role = userInfo.roles;
          const username = userInfo.username; 
          
          switch (role) {
            case 'Admin':
              navigate('/Admin');
              break;
            case 'HouseOwner':
              navigate(`/HouseOwner/${username}`); 
              break;
            case 'Renter':
              navigate('/Renter');
              break;
            default:
              navigate('/HomePage');
          }
        }).catch((error) => {
          console.error("Error fetching user info", error);
        });
      } else {
        console.log("User is not authenticated");
      }
    }).catch((error) => {
      console.error("Error checking authentication:", error);
    });
  }, [state, isAuthenticated, getBasicUserInfo, getDecodedIDPIDToken, navigate]);

  return <div>Loading...</div>;
};

export default AuthPage;
