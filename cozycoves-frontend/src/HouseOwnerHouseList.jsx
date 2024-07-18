import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddHouseForm from './AddHouseForm'; // Import the AddHouseForm component
import './HouseOwnerHouseList.css'; // Import the CSS file

const HouseOwnerHouseList = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the modal

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        axios.defaults.baseURL = 'http://localhost:8080';
        const response = await axios.get('/houseowner-view-houses/O001'); // Replace 'O001' with actual owner ID
        setHouses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching houses:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Refetch houses after adding a new one
    axios.get('/houseowner-view-houses/O001')
      .then(response => {
        setHouses(response.data);
      })
      .catch(error => {
        console.error('Error refetching houses:', error);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching houses: {error.message}</p>;
  }

  return (
    <div className="house-list-container">
      <h2>Your Houses</h2>
      <div className="house-list">
        {houses.map((house) => (
          <Link key={house.houseId} to={`/house/${house.houseId}`} className="house-box">
            <h3>{house.description}</h3>
            <p><strong>Owner:</strong> {house.owner}</p>
            <p><strong>Address:</strong> {house.addressLine1}, {house.addressLine2}, {house.addressLine3}</p>
            {/* Add more details as needed */}
          </Link>
        ))}
      </div>
      <button className="fab" onClick={openModal}>+</button>
      {isModalOpen && <div className="modal-overlay">
        <AddHouseForm closeModal={closeModal} />
      </div>}
    </div>
  );
};

export default HouseOwnerHouseList;
