import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Renter.css'; // Create and import a CSS file for styling
import NavBar from './NavBar';
import { useAuthContext } from '@asgardeo/auth-react';

// Simulating getAccessToken function, replace with actual implementation
// const getAccessToken = async () => {
//   return "your_access_token"; // Replace with the actual token fetching logic
// };

const Renter = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const {getAccessToken} = useAuthContext();

  const axiosInterceptorSet = useRef(false);
  const token = useRef("");

  const setupAxiosInterceptor = async () => {
    const _token = await getAccessToken();
    token.current = _token;
    console.log("Access token", token.current);
  };

  useEffect(() => {
    if (!axiosInterceptorSet.current) {
      setupAxiosInterceptor()
        .then(() => {
          axiosInterceptorSet.current = true;
          fetchHouses();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const fetchHouses = async () => {
    try {
      axios.defaults.baseURL = 'http://localhost:8080';
      const response = await axios.get(`/renter-view-houses`, {
        headers: {
          'Authorization': `Bearer ${token.current}`,
          'Content-Type': 'application/json'
        }
      });
      setHouses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching houses:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.defaults.baseURL = 'http://localhost:8080';
      const response = await axios.get(`/renter-view-houses/${searchQuery}`, {
        headers: {
          'Authorization': `Bearer ${token.current}`,
          'Content-Type': 'application/json'
        }
      });
      setHouses(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching houses:', error);
      setError(error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching houses: {error.message}</p>;
  }

  return (
    <div className="house-list-container">
      <NavBar />
      <h2>Available Houses</h2>
      <form onSubmit={handleSearch} className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by your city"
        />
        <button type="submit">Search</button>
      </form>
      <div className="house-list">
        {houses.map((house) => (
          <Link key={house.houseId} to={`/renter-house/${house.houseId}`} className="house-box">
            <h3>{house.description}</h3>
            <p><strong>Owner:</strong> {house.owner}</p>
            <p><strong>Address:</strong> {house.addressLine1}, {house.addressLine2}, {house.addressLine3}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Renter;
