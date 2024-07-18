import React, { useState } from 'react';
import axios from 'axios';
import './AddHouseForm.css';

const AddHouseForm = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    houseId: '',
    description: '',
    owner: '',
    ownerID: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    numberOfRooms: '',
    numberOfBathrooms: '',
    currentRenter: '',
    status: '',
    price: '',
    photos: []
  });

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
      await axios.post('/houseowner-add-house', formData);
      closeModal();
    } catch (error) {
      console.error('Error adding house:', error);
    }
  };

  return (
    <div className="add-house-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Add New House</h2>
        <label>
          House ID:
          <input type="text" name="houseId" value={formData.houseId} onChange={handleChange} required />
        </label>
        <label>
          Description:
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>
          Owner:
          <input type="text" name="owner" value={formData.owner} onChange={handleChange} required />
        </label>
        <label>
          Owner ID:
          <input type="text" name="ownerID" value={formData.ownerID} onChange={handleChange} required />
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
          <input type="text" name="status" value={formData.status} onChange={handleChange} required />
        </label>
        <label>
          Price:
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </label>
        <label>
          Photos:
          <input type="text" name="photos" value={formData.photos} onChange={handleChange} />
        </label>
        <button type="submit">Add House</button>
        <button type="button" onClick={closeModal}>Cancel</button>
      </form>
    </div>
  );
};

export default AddHouseForm;
