import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './HouseDetail.css'; // Create and import a CSS file for styling
import { useParams } from 'react-router-dom';

const HouseIndividualDetail = () => {
  const { houseId } = useParams(); // Use useParams to get route parameters
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        axios.defaults.baseURL = 'http://localhost:8080';
        const response = await axios.get(`/individual-house-info/${houseId}`);
        setHouse(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching house details:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchHouse();
  }, [houseId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching house details: {error.message}</p>;
  }

  return (
    <div className="house-detail">
      <h1>House Details</h1>
      <p><strong>Description:</strong> {house.description}</p>
      <p><strong>Owner:</strong> {house.owner}</p>
      <p><strong>Address Line 1:</strong> {house.addressLine1}</p>
      <p><strong>Address Line 2:</strong> {house.addressLine2}</p>
      <p><strong>Address Line 3:</strong> {house.addressLine3}</p>
      <p><strong>Number of Rooms:</strong> {house.numberOfRooms}</p>
      <p><strong>Number of Bathrooms:</strong> {house.numberOfBathrooms}</p>
      <p><strong>Current Renter:</strong> {house.currentRenter || 'None'}</p>
      <p><strong>Status:</strong> {house.status}</p>
      <p><strong>Price:</strong> ${house.price.toFixed(2)}</p>
      
      <button onClick={() => console.log('Request to Rent')}>Request to Rent</button>
      <button onClick={() => console.log('Cancel Request')}>Cancel Request</button>
    </div>
  );
};

export default HouseIndividualDetail;
