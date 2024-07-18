import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './HouseOwnerHouseRequest.css'; // Import your CSS file for styling

const HouseOwnerHouseRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { houseId } = useParams(); // Get houseId from URL parameters

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        axios.defaults.baseURL = 'http://localhost:8080';
        const response = await axios.get(`/get-requests/${houseId}`);
        setRequests(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [houseId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching requests: {error.message}</p>;
  }

  return (
    <div className="house-requests-container">
      <h2>Requests for House {houseId}</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <ul className="requests-list">
          {requests.map((request) => (
            <li key={request.requestId} className="request-item">
              <p><strong>Requester:</strong> {request.renter}</p>
              <p><strong>Status:</strong> {request.approvedStatus}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HouseOwnerHouseRequest;
