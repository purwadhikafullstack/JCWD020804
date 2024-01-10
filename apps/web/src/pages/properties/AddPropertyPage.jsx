// HotelPage.js
import React, { useState, useEffect } from 'react';
import AddHotelForm from '../../components/propertyManagement/addPropertyForm';


const AddHotelPage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    // Fetch data or set initial hotels state
    // E.g., fetch('http://localhost:3001/api/hotels').then(response => response.json()).then(data => setHotels(data));
  }, []);

  const addHotel = (newHotel) => {
    setHotels([...hotels, newHotel]);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Web Booking Hotel</h1>
      <AddHotelForm addHotel={addHotel} />
      {/* Display list of hotels or other components as needed */}
    </div>
  );
};

export default AddHotelPage;
