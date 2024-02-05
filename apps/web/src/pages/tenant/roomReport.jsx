import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { formatMataUang } from '../../helper/formatFunction';

export const RoomReport = () => {
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem('token');

  const fetchRooms = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/transaction/tenant/room-report',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching room report:', error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-green-500">
            <th>Name</th>
            <th>Total Stays</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id} className="border-b">
              <td>{room.name}</td>
              <td>{room.total_stays}</td>
              <td>{formatMataUang(room.total_revenue, 'IDR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
