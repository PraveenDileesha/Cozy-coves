import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import AddHouseForm from './AddHouseForm';
import EditHouseForm from './EditHouseForm.jsx';
import axios from 'axios';
import './AdminPanel.css';

const Admin = () => {
  const [showAddHouseForm, setShowAddHouseForm] = useState(false);
  const [showEditHouseForm, setShowEditHouseForm] = useState(false);
  const [houses, setHouses] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const username = "admin"; // Replace with the actual username logic if needed

  const fetchHouses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/admin-view-all-houses');
      setHouses(response.data);
    } catch (error) {
      console.error('Error fetching houses:', error);
    }
  };

  const handleAddHouse = () => {
    setShowAddHouseForm(true);
  };

  const handleCloseModal = () => {
    setShowAddHouseForm(false);
    setShowEditHouseForm(false);
    fetchHouses(); // Refresh house list after adding or updating a house
  };

  const handleEditHouse = (house) => {
    console.log('Editing house:', house); // Debug log
    setSelectedHouse(house);
    setShowEditHouseForm(true);
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  return (
    <div>
      <NavBar />
      <div className="admin-panel-container">
        <h1>Admin Panel</h1>
        <h3>welcome to admin panel of cozy coves</h3>
        <div className="admin-buttons">
          <button onClick={handleAddHouse}>Add House</button>
          {/* <button onClick={fetchHouses}>View Houses</button> */}
        </div>

        {showAddHouseForm && <AddHouseForm closeModal={handleCloseModal} username={username} />}
        {showEditHouseForm && <EditHouseForm closeModal={handleCloseModal} house={selectedHouse} />}

        <div className="house-list">
          {houses.map((house) => (
            <div key={house.houseId} className="house-container">
              <p><strong>Description:</strong> {house.description}</p>
              <p><strong>Owner:</strong> {house.owner}</p>
              <p><strong>Address:</strong> {house.addressLine1}, {house.addressLine2}, {house.addressLine3}</p>
              <p><strong>Rooms:</strong> {house.numberOfRooms} rooms, <strong>Bathrooms:</strong> {house.numberOfBathrooms} bathrooms</p>
              <p><strong>Price in LKR:</strong> {house.price}</p>
              <p><strong>Status:</strong> {house.status}</p>
              <p><strong>Current Renter:</strong> {house.currentRenter}</p>
              <button onClick={() => handleEditHouse(house)}>Update</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
