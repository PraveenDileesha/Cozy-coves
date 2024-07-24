import React from 'react';
import { Routes, Route,Navigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import './App.css';
import HomePage from './HomePage';
import HouseOwnerHouseList from './HouseOwnerHouseList';
import HouseOwnerHouseRequest from './HouseOwnerHouseRequest';
import Renter from './Renter';
import HouseIndividualDetail from './HouseIndividualDetail';
import Admin from './Admin';
import { useAuthContext } from '@asgardeo/auth-react';
import AuthPage from './AuthPage';

function App() {

  const {state, getBasicUserInfo } = useAuthContext();
  const [userBasicInfo, setUserBasicInfo] = useState(null);

  useEffect(() => {
    if (state.isAuthenticated) {
      const fetchUserInfo = async () => {
        const info = await getBasicUserInfo();
        setUserBasicInfo(info);
      };
      fetchUserInfo();
    }
  }, [state.isAuthenticated, getBasicUserInfo]);
  
  const roleBasedComponent = (Component, requiredRole) => {
    if (!state.isAuthenticated) {
      return <Navigate to="/HomePage" />;
    }
    if (userBasicInfo && userBasicInfo?.roles.includes(requiredRole)) {
      return <Component />;
    }
    return <Navigate to="/AuthPage" />;
  };
  
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/HouseOwner/:username" element={roleBasedComponent(HouseOwnerHouseList,"HouseOwner")} />
          <Route path="/house-owner/:houseId" element={ roleBasedComponent(HouseOwnerHouseRequest,"HouseOwner")} />
          <Route path="/Renter" element={roleBasedComponent(Renter,"Renter")} />
          <Route path="/renter-house/:houseId" element={roleBasedComponent(HouseIndividualDetail,"Renter")} />
          <Route path="/Admin" element={roleBasedComponent(Admin,"Admin")}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
