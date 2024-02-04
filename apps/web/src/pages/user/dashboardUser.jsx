import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography } from '@material-tailwind/react';

export const UserDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [processedTransactions, setProcessedTransactions] = useState([]);
  const token = localStorage.getItem('token');

  const formatDate = (date) => {
    const dateFormat = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    return dateFormat.format(date);
  };

  const getDataTransaction = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction/user',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data.result);
      setTransactions(response?.data.result);
      setProcessedTransactions([]); // Reset state processedTransactions
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDataTransaction();
  }, []);

  // ...


  return (
    <div className="container mx-auto my-8">
         <div className="flex items-center gap-4">
          <img
            src="../src/assets/masnstay.jpg"
            alt="Logo"
            className="h-16 w-16 mr-2 "
          />
          <Typography
            as="a"
            href="/"
            variant="h6"
            className="cursor-pointer py-1.5 text-black"
          >
            MasnStay
          </Typography>
        </div>
      <h1 className="text-3xl font-semibold mb-6">User Dashboard</h1>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border bg-gray-100 p-4">Tanggal Checkin</th>
            <th className="border bg-gray-100 p-4">Nama Property</th>
            <th className="border bg-gray-100 p-4">Nama Kamar</th>
            <th className="border bg-gray-100 p-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="border p-4">
                {formatDate(new Date(transaction.checkIn))}
              </td>
              <td className="border p-4">{transaction.Room.Property.name}</td>
              <td className="border p-4">{transaction.Room.name}</td>
              <td className="border p-4">{transaction.status}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
