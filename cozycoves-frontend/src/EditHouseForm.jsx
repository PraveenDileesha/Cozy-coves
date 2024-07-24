import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AddHouseForm.css';
import { useAuthContext } from '@asgardeo/auth-react';

// // Simulating getAccessToken function, replace with actual implementation
// const getAccessToken = async () => {
//   return "your_access_token"; // Replace with the actual token fetching logic
// };

const EditHouseForm = ({ closeModal, house }) => {
  const [formData, setFormData] = useState({
    houseId: house.houseId,
    description: house.description,
    owner: house.owner,
    addressLine1: house.addressLine1,
    addressLine2: house.addressLine2,
    addressLine3: house.addressLine3,
    numberOfRooms: house.numberOfRooms,
    numberOfBathrooms: house.numberOfBathrooms,
    currentRenter: house.currentRenter,
    status: house.status,
    price: house.price,
  });

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
      console.log('Submitting form with data:', formData); // Debug log
      const response = await axios.put('http://localhost:8080/admin-update-house', formData, {
        headers: {
          'Authorization': `Bearer ${token.current}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('Response from server:', response); // Debug log
      closeModal();
    } catch (error) {
      console.error('Error updating house:', error);
    }
  };

  return (
    <div className="add-house-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Update House</h2>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Owner:
          <input type="text" name="owner" value={formData.owner} onChange={handleChange} readOnly />
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
        <button type="submit">Update House</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default EditHouseForm;
