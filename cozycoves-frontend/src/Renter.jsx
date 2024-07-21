import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Renter.css'; // Create and import a CSS file for styling
import NavBar from './NavBar';

const Renter = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        axios.defaults.baseURL = 'http://localhost:8080';
        const response = await axios.get(`/renter-view-houses`);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.defaults.baseURL = 'http://localhost:8080';
      const response = await axios.get(`/renter-view-houses/${searchQuery}`);
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
      <NavBar/>
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
