import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import AddHouseForm from './AddHouseForm';
import NavBar from './NavBar'; // Import the NavBar component
import './HouseOwnerHouseList.css';
import { useAuthContext } from '@asgardeo/auth-react';

const HouseOwnerHouseList = () => {
  const { username } = useParams(); // Get the username from the route parameters
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {getAccessToken} = useAuthContext();

  const axiosInterceptorSet = useRef(false);

    const token = useRef("");


    // Get access token from asgardeo SDK and add it to the request headers
    const setupAxiosInterceptor = async () => {
        const _token = await getAccessToken();
        token.current = _token;
        console.log("Access token", token.current);
        // axios.defaults.headers['Authorization'] = `Bearer ${token}`;
    };


    useEffect(() => {
        // if(!axiosInterceptorSet.current){
        //     setupAxiosInterceptor();
        //     axiosInterceptorSet.current = true;
        // }
        // getAllPCBs();

        if (!axiosInterceptorSet.current) {
            setupAxiosInterceptor().then(() => {
                axiosInterceptorSet.current = true;
                // fetchHouses();
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }, []);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        axios.defaults.baseURL = 'http://localhost:8080';
        const response = await axios.get(`/houseowner-view-houses/${username}`,
          {headers : {
            'Authorization' : `Bearer ${token.current}`,
            'Content-Type' : 'application/json'
          }}
        ); // Use the username as owner ID
        setHouses(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching houses:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchHouses();
  }, [username]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Refetch houses after adding a new one
    axios.get(`/houseowner-view-houses/${username}`,
      {headers : {
        'Authorization' : `Bearer ${token.current}`,
        'Content-Type' : 'application/json'
      }}
    )
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
      <NavBar /> {/* Add the NavBar component here */}
      <h2>Your Houses</h2>
      <div className="house-list">
        {houses.map((house) => (
          <Link key={house.houseId} to={`/house-owner/${house.houseId}`} className="house-box">
            <h3>{house.description}</h3>
            <p><strong>Owner:</strong> {house.owner}</p>
            <p><strong>Address:</strong> {house.addressLine1}, {house.addressLine2}, {house.addressLine3}</p>
            {/* Add more details as needed */}
          </Link>
        ))}
      </div>
      <button className="fab" onClick={openModal}>+</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <AddHouseForm closeModal={closeModal} username={username} />
        </div>
      )}
    </div>
  );
};

export default HouseOwnerHouseList;
