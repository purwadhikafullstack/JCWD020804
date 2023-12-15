// Pada komponen PaymentPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const PaymentPage = () => {
  const location = useLocation();
  const { checkInDate, checkOutDate } = location.state;

  // Fungsi untuk menghitung selisih hari antara dua tanggal
  const calculateTotalNights = (checkIn, checkOut) => {
    const oneDay = 24 * 60 * 60 * 1000; // Satu hari dalam milidetik
    const diffDays = Math.round(Math.abs((checkOut - checkIn) / oneDay));
    return diffDays;
  };

  // Fungsi untuk memformat tanggal
  const formatDate = (date) => {
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    return date ? date.toLocaleDateString('en-US', options) : '';
  };
  const pricePerNight = 500000;
  // Menghitung total malam
  const totalNights = calculateTotalNights(checkInDate, checkOutDate);
  const totalPrice = totalNights * pricePerNight;

  return (
    <div>
      <h1>Payment Page</h1>
      <p>Check-in Date: {formatDate(checkInDate)}</p>
      <p>Check-out Date: {formatDate(checkOutDate)}</p>
      <p>Total Price: Rp {`${pricePerNight} * ${totalNights} malam`}</p>
      <p>Rp {totalPrice.toLocaleString()}</p>
      {/* Add your payment process UI/components here */}
    </div>
  );
};

export default PaymentPage;
