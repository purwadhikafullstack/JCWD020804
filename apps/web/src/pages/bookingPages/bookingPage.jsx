// Pada komponen BookingPage.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkInDate, checkOutDate, selectedRoom, roomPrice } = location.state;

  // Fungsi untuk menghitung selisih hari antara dua tanggal
  const calculateTotalNights = (checkIn, checkOut) => {
    const oneDay = 24 * 60 * 60 * 1000; // Satu hari dalam milidetik
    const diffDays = Math.round(Math.abs((checkOut - checkIn) / oneDay));
    return diffDays;
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (date) => {
    // Tentukan zona waktu Indonesia (Waktu Indonesia Barat)
    const options = {
      timeZone: 'Asia/Jakarta',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };

    // Ganti objek Date dengan waktu Indonesia
    const localizedDate = date
      ? new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }))
      : new Date();

    // Kembalikan tanggal yang diformat
    return localizedDate.toLocaleDateString('en-US', options);
  };

  // Menghitung total malam
  const totalNights = calculateTotalNights(checkInDate, checkOutDate);
  const totalPrice = totalNights * roomPrice;
  const RoomId = selectedRoom.id;
  console.log(RoomId);
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
      const { data: bookingResponse } = await axios.post(
        'http://localhost:8000/api/booking',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log('Booking successful:', bookingResponse);
      navigate(`/booking/${bookingResponse.id}`);
    } catch (error) {
      console.error('Error during booking:', error);
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-2xl font-semibold mb-4">Booking Details</h1>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
        {/* Informasi Kamar */}
        <div className="md:w-1/2">
          <img
            src={selectedRoom.image}
            alt={selectedRoom.room_name}
            className="w-full h-auto mb-4"
          />
          <p className="text-lg font-semibold mb-2">{selectedRoom.room_name}</p>
          <p className="text-gray-500">
            Price: Rp {roomPrice.toLocaleString()} per night
          </p>
        </div>
        {/* Informasi Tanggal dan Harga */}
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
              <span className="font-semibold">Total Price:</span> Rp{' '}
              {totalPrice.toLocaleString()}
            </p>
          </div>
          {/* Tombol Booking */}
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
