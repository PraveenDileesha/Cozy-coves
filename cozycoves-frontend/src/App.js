import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import HouseOwnerHouseList from './HouseOwnerHouseList';
import HouseOwnerHouseRequest from './HouseOwnerHouseRequest';
import AuthPage from './AuthPage';
import Renter from './Renter';
import HouseIndividualDetail from './HouseIndividualDetail';

function App() {
  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/AuthPage" element={<AuthPage />} />
          <Route path="/HouseOwner/:username" element={<HouseOwnerHouseList />} />
          <Route path="/house-owner/:houseId" element={<HouseOwnerHouseRequest />} />
          <Route path="/Renter" element={<Renter />} />
          <Route path="/renter-house/:houseId" element={<HouseIndividualDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
