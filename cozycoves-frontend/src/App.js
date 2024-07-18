import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import HouseOwnerHouseList from './HouseOwnerHouseList';
import HouseOwnerHouseRequest from './HouseOwnerHouseRequest';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element={<HouseOwnerHouseList />} />
            <Route path="/houses" element={<HouseOwnerHouseList />} />
            <Route path="/house/:houseId" element={<HouseOwnerHouseRequest />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
