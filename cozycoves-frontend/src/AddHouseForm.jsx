import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AddHouseForm.css';
import { useAuthContext } from '@asgardeo/auth-react';


// // Simulating getAccessToken function, replace with actual implementation
// const getAccessToken = async () => {
//   return "your_access_token"; // Replace with the actual token fetching logic
// };

const AddHouseForm = ({ closeModal, username }) => {
  const axiosInterceptorSet = useRef(false);
  const token = useRef("");
  const {getAccessToken} = useAuthContext();


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
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  // Function to generate a random house ID
  const generateUniqueHouseId = async () => {
    const prefix = 'H';
    const length = 5;

    // Helper function to generate a random number
    const generateRandomNumber = (length) => Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');

    // Helper function to generate the ID
    const generateId = () => `${prefix}${generateRandomNumber(length)}`;

    // Check if the ID exists in the database
    const checkIdExists = async (id) => {
      try {
        const response = await axios.get(`/houseowner-check-house-id/${id}`, {
          headers: {
            'Authorization': `Bearer ${token.current}`,
            'Content-Type': 'application/json'
          }
        });
        return response.data.exists; // Expecting a boolean response indicating if the ID exists
      } catch (error) {
        console.error('Error checking house ID existence:', error);
        return false;
      }
    };

    let uniqueIdFound = false;
    let id = '';

    // Keep generating a new ID until a unique one is found
    while (!uniqueIdFound) {
      id = generateId();
      uniqueIdFound = !(await checkIdExists(id));
    }

    return id;
  };

  const [formData, setFormData] = useState({
    houseId: '',
    description: '',
    owner: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    numberOfRooms: '',
    numberOfBathrooms: '',
    currentRenter: '',
    status: 'AVAILABLE',
    price: '',
  });

  useEffect(() => {
    const fetchAndSetHouseId = async () => {
      const newHouseId = await generateUniqueHouseId();
      setFormData(prevData => ({
        ...prevData,
        houseId: newHouseId
      }));
    };

    fetchAndSetHouseId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.baseURL = 'http://localhost:8080';
      await axios.post('/houseowner-add-house', {
        ...formData,
        ownerID: username,
      }, {
        headers: {
          'Authorization': `Bearer ${token.current}`,
          'Content-Type': 'application/json'
        }
      });
      closeModal();
    } catch (error) {
      console.error('Error adding house:', error);
    }
  };

  return (
    <div className="add-house-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add New House</h2>
        {/* Remove the House ID field from the form */}
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Owner:
          <input type="text" name="owner" value={formData.owner} onChange={handleChange} required />
        </label>
        <label>
          Address Line 1:
          <input type="text" name="addressLine1" value={formData.addressLine1} onChange={handleChange} required />
        </label>
        <label>
          Address Line 2:
          <input type="text" name="addressLine2" value={formData.addressLine2} onChange={handleChange} required />
        </label>
        <label>
          Address Line 3:
          <input type="text" name="addressLine3" value={formData.addressLine3} onChange={handleChange} required />
        </label>
        <label>
          Number of Rooms:
          <input type="number" name="numberOfRooms" value={formData.numberOfRooms} onChange={handleChange} required />
        </label>
        <label>
          Number of Bathrooms:
          <input type="number" name="numberOfBathrooms" value={formData.numberOfBathrooms} onChange={handleChange} required />
        </label>
        <label>
          Current Renter:
          <input type="text" name="currentRenter" value={formData.currentRenter} onChange={handleChange} />
        </label>
        <label>
          Status:
          <select name="status" value={formData.status} onChange={handleChange} required>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="RENTED">RENTED</option>
            <option value="RENOVATING">RENOVATING</option>
            <option value="SUSPENDED">SUSPENDED</option>
          </select>
        </label>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <button type="submit">Add House</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default AddHouseForm;
