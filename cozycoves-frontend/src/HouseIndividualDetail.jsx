import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HouseIndividualDetail.css'; // Create and import a CSS file for styling
import { useParams } from 'react-router-dom';
import { useAuthContext } from '@asgardeo/auth-react';

const HouseIndividualDetail = () => {
  const { houseId } = useParams();
  const [house, setHouse] = useState(null);
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRented, setIsRented] = useState(false);

  const { getBasicUserInfo } = useAuthContext();

  useEffect(() => {
    const fetchHouse = async () => {
      try {
        axios.defaults.baseURL = 'http://localhost:8080';
        const houseResponse = await axios.get(`/individual-house-info/${houseId}`);
        setHouse(houseResponse.data);
        setIsRented(houseResponse.data.status === 'Rented');
      } catch (error) {
        console.error('Error fetching house details:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const userInfo = await getBasicUserInfo();
        setUserName(userInfo.username);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setError(error);
      }
    };

    fetchHouse();
    fetchUserInfo();
  }, [houseId, getBasicUserInfo]);

  const handleRentRequest = async () => {
    try {
      await axios.post(`/request-house`, {
        houseId: houseId,
        renter: userName, // Replace with actual logged-in user identifier
        approvedStatus: 'Pending'
      });
      setIsRented(true);
    } catch (error) {
      console.error('Error requesting to rent:', error);
    }
  };

  const handleCancelRequest = async () => {
    try {
      // Implement cancel request logic
      // await axios.post(`/cancel-rent-request`, { houseId, renter: userName });
      setIsRented(false);
    } catch (error) {
      console.error('Error canceling rent request:', error);
    }
  };

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
      
      {isRented ? (
        <button onClick={handleCancelRequest}>Cancel Request</button>
      ) : (
        <button onClick={handleRentRequest}>Request to Rent</button>
      )}
    </div>
  );
};

export default HouseIndividualDetail;
