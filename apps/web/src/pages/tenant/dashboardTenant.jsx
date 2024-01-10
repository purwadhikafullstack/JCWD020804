import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export const TenantDashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [processedTransactions, setProcessedTransactions] = useState([]);
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user.value);

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
        'http://localhost:8000/api/transaction/tenant',
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

  

  const handleApprove = async (id) => {
    try {
      await axios.patch(
        `http://localhost:8000/api/transaction/tenant/${id}/approve`,
        { status: 'pembayaran berhasil' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(`Approving transaction ${id}`);

      // Update status langsung pada state transactions
      setTransactions((prevTransactions) => {
        return prevTransactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, status: 'pembayaran berhasil' }
            : transaction,
        );
      });

      // Set state processedTransactions setelah approve
      setProcessedTransactions((prevTransactions) => [...prevTransactions, id]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    // Logika untuk menolak transaksi
    try {
      await axios.patch(
        `http://localhost:8000/api/transaction/tenant/${id}/reject`,
        { status: 'transaksi dibatalkan' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update status langsung pada state transactions
      setTransactions((prevTransactions) => {
        return prevTransactions.map((transaction) =>
          transaction.id === id
            ? { ...transaction, status: 'transaksi dibatalkan' }
            : transaction,
        );
      });

      // Set state processedTransactions setelah reject
      setProcessedTransactions((prevTransactions) => [...prevTransactions, id]);
    } catch (error) {
      console.log(error);
    }
  };

  // ...

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-6 text-yellow-600">Tenant Dashboard</h1>
      <h1 className="text-3xl font-semibold mb-6 text-yellow-600">{user.name}</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border rounded-lg">
          <thead className="bg-yellow-200">
            <tr>
              <th className="border p-3">Tanggal Checkin</th>
              <th className="border p-3">Nama Pemesan</th>
              <th className="border p-3">Nama Kamar</th>
              <th className="border p-3">Status</th>
              <th className="border p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="bg-white">
                <td className="border p-3">
                  {formatDate(new Date(transaction.checkIn))}
                </td>
                <td className="border p-3">{transaction.User.name}</td>
                <td className="border p-3">{transaction.Room.name}</td>
                <td className="border p-3">{transaction.status}</td>
                <td className="border p-3">
                  {transaction.status === 'menunggu konfirmasi' && (
                    <>
                      <button
                        onClick={() => handleApprove(transaction.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(transaction.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
