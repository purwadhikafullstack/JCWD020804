// HotelPage.js
import React, { useState, useEffect } from 'react';
import AddHotelForm from '../../components/propertyManagement/addPropertyForm';

const AddHotelPage = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    
    
  }, []);

  const addHotel = (newHotel) => {
    setHotels([...hotels, newHotel]);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4 relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border mx-auto">
      Property Details 
      </h1>

      <AddHotelForm addHotel={addHotel} />
      {/* Display list of hotels or other components as needed */}
    </div>
    
  );
};

export default AddHotelPage;
