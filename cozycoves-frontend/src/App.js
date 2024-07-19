import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage';
import HouseOwnerHouseList from './HouseOwnerHouseList';
import HouseOwnerHouseRequest from './HouseOwnerHouseRequest';
import AuthPage from './AuthPage';

function App() {
  return (
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/HomePage" element={<HomePage />} />
            <Route path="/AuthPage" element={<AuthPage/>}/>
            <Route path="/HouseOwner/:username" element={<HouseOwnerHouseList />} /> 
            <Route path="/house/:houseId" element={<HouseOwnerHouseRequest />} />
            <Route path="/signup" element={<div>Sign Up Page (to be implemented)</div>} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
