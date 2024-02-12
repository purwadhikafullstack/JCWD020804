import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-tailwind/react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Navbarpage } from '../../components/navbar';
import { averageRating } from '../../helper/getRating';
import { formatDate, formatMataUang } from '../../helper/formatFunction';
import { api } from '../../helper/api';

export const DetailPage = () => {
  const { id } = useParams();
  const [propertyDetails, setPropertyDetails] = useState();
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
  const [selectedRoom, setSelectedRoom] = useState(null);

  const roomImage =
    'https://all.accor.com/middleware/images/1385747632498/1681988911601/so-text-with-image-600x500-low.jpg'; // Replace with the actual URL

  const handleBooking = () => {
    if (selectedRoom) {
      navigate('/booking', {
        state: {
          checkInDate,
          checkOutDate,
          selectedRoom,
          roomPrice: selectedRoom.price,
        },
      });
    } else {
      console.error('Please select a room before booking.');
    }
  };

  const handleRoomSelect = (room) => {
    if (!room.Transactions || room.Transactions.length === 0) {
      setSelectedRoom(room);
    }
  };

  const fetchApi = async () => {
    try {
      console.log({ checkInDate, checkOutDate });
      const response = await api.get(
        `/property/${id}?checkIn=${checkInDate}&checkOut=${checkOutDate}`,
      );
      console.log(response.data);
      setPropertyDetails(response?.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, [id, checkInDate, checkOutDate]);

  return (
    <>
      <Navbarpage />
      <div className="container mx-auto my-8 flex items-center justify-between">
        <div className="w-1/2 pr-4">
          <img
            src={`${import.meta.env.VITE_IMG_URL}${propertyDetails?.picture}`}
            alt="Hotel Room"
            className="mb-4 w-full h-auto"
          />

          <div className="mb-4">
            <p>{propertyDetails?.description}</p>

            {averageRating(propertyDetails?.Reviews) != null && (
              <div className="flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-0.5 h-5 w-5 text-yellow-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
                <Typography color="blue-gray" className="font-normal">
                  {averageRating(propertyDetails?.Reviews)}
                </Typography>
              </div>
            )}
          </div>

          {propertyDetails?.Rooms && propertyDetails?.Rooms.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-2">Available Rooms:</h2>
              <ul>
                {propertyDetails.Rooms.map((room) => (
                  <li
                    key={room.id}
                    onClick={() => handleRoomSelect(room)}
                    className={`cursor-pointer ${
                      selectedRoom && selectedRoom.id === room.id
                        ? 'text-blue-500 font-bold'
                        : ''
                    } ${
                      room.Transactions && room.Transactions.length > 0
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:text-blue-700'
                    }`}
                  >
                    <p>{room.name}</p>
                    <img
                      src={`${import.meta.env.VITE_IMG_URL}${room.picture}`}
                    />
                    <p>Price: {formatMataUang(room.price, 'IDR')}</p>
                    {room.Transactions && room.Transactions.length > 0 ? (
                      <p className="text-red-500">Kamar Telah Dibooking</p>
                    ) : (
                      <p className="text-green-500">Kamar Tersedia</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="w-1/2 pl-4 flex flex-col items-center justify-center">
          <div className="mb-4">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                console.log(item);
                setDateRange([item.selection]);
                setCheckInDate(item.selection.startDate);
                setCheckOutDate(item.selection.endDate);
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </div>

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
    </>
  );
};
