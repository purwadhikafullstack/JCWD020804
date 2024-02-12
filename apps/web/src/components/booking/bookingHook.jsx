import { useEffect, useState } from 'react';
import { api } from '../../helper/api';

export const useBookingDetails = (id) => {
  const [bookingDetails, setBookingDetails] = useState(null);
  const token = localStorage.getItem('token');
  const fetchBookingDetails = async () => {
    try {
      const response = await api.get(
        `/booking/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setBookingDetails(response.data.result);
    } catch (error) {
      console.error('Error fetching Booking details:', error);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [id]);

  return { bookingDetails, fetchBookingDetails };
};
