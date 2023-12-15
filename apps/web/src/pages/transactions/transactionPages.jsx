// src/components/TransactionForm.js
import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate } from 'react-router-dom';

export const TransactionForm = () => {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(new Date());

  const roomImage =
    'https://all.accor.com/middleware/images/1385747632498/1681988911601/so-text-with-image-600x500-low.jpg'; // Replace with the actual URL
  const pricePerNight = 'Rp 500,000'; // Replace with the actual price
  const description = 'Luxurious hotel room with stunning views'; // Replace with the actual description

  const handleBooking = () => {
    navigate('/payment', {
      state: { checkInDate, checkOutDate },
    });
  };

  return (
    <div className="container mx-auto my-8 flex items-center justify-between">
      {/* Room Information - Left Side */}
      <div className="w-1/2 pr-4">
        {/* Display Room Image */}
        <img src={roomImage} alt="Hotel Room" className="mb-4 w-full h-auto" />

        {/* Display Price Per Night */}
        <div className="mb-4">
          <p className="text-xl font-bold">{pricePerNight}</p>
        </div>

        {/* Display Description */}
        <div className="mb-4">
          <p>{description}</p>
        </div>
      </div>

      {/* Date Range Calendar - Right Side */}
      <div className="w-1/2 pl-4 flex flex-col items-center justify-center">
        <div className="mb-4">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              setDateRange([item.selection]);
              setCheckInDate(item.selection.startDate);
              setCheckOutDate(item.selection.endDate);
            }}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
        </div>

        {/* Booking Button */}
        <div>
          <Button
            color="lightBlue"
            buttonType="filled"
            size="regular"
            rounded={false}
            block={false}
            ripple="light"
            onClick={handleBooking}
          >
            Pesan Sekarang
          </Button>
        </div>
      </div>
    </div>
  );
};
