// Pada komponen BookingPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatDate, formatMataUang } from '../../helper/formatFunction';
import { toast} from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import {api} from '../../helper/api';

export const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkInDate, checkOutDate, selectedRoom, roomPrice } = location.state;
  const calculateTotalNights = (checkIn, checkOut) => {
    const oneDay = 24 * 60 * 60 * 1000; 
    const diffDays = Math.round(Math.abs((checkOut - checkIn) / oneDay));
    return diffDays;
  };

  const totalNights = calculateTotalNights(checkInDate, checkOutDate);
  const totalPrice = totalNights * roomPrice;
  const RoomId = selectedRoom.id;
 console.log(selectedRoom);
  const handleBooking = async () => {
    try {
      const data = {
        checkIn: checkInDate,
        checkOut: checkOutDate,
        RoomId,
        total_price: totalPrice,
        total_night: totalNights,
      };
      const token = localStorage.getItem('token');
      const { data: bookingResponse } = await api.post(
        '/booking',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('Booking successful!', {
        position: "top-center",
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate(`/booking/${bookingResponse.id}`);
      }, 5000);

    } catch (error) {
      toast.error('Error during booking: ' + error.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-semibold mb-4">Booking Details</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        <div className="md:w-1/2">
          <img
            src={`${import.meta.env.VITE_IMG_URL}${selectedRoom.picture}`}
            alt={selectedRoom.name}
            className="w-full h-auto mb-4"
          />
          <p className="text-gray-500">{selectedRoom.name}</p>
          <p className="text-gray-500">
            Price: {formatMataUang(roomPrice, 'IDR')} per night
          </p>
        </div>
        <div className="md:w-1/2">
          <div className="mb-4">
            <p>
              <span className="font-semibold">Check-in Date:</span>{' '}
              {formatDate(checkInDate)}
            </p>
            <p>
              <span className="font-semibold">Check-out Date:</span>{' '}
              {formatDate(checkOutDate)}
            </p>
          </div>
          <div className="mb-4">
            <p>
              <span className="font-semibold">Total Nights:</span> {totalNights}
            </p>
            <p>
              <span className="font-semibold">Total Price: </span> 
              {formatMataUang(totalPrice, 'IDR')}
            </p>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            onClick={handleBooking}
          >
            Choose Payment Method
          </button>
        </div>
      </div>
    </div>
  );
};
