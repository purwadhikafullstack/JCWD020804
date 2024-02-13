import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from '@material-tailwind/react';
import { formatDate } from '../../helper/formatFunction';

export const BookingCard = ({ bookingDetails }) => {
  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          src={`${import.meta.env.VITE_IMG_URL}${bookingDetails?.Room.picture}`}
          alt="booking room"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            Booking ID
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            {bookingDetails?.id}
          </Typography>
        </div>
        <Typography variant="h5" color="blue-gray" className="font-medium">
          Booking Details
        </Typography>
        <Typography variant="h5" color="blue-gray" className="font-medium">
          {bookingDetails?.Room.Property.name}
        </Typography>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            Room:
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            {bookingDetails?.Room.name}
          </Typography>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            CheckIn:
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            {bookingDetails?.checkIn && (
              <>{formatDate(new Date(bookingDetails.checkIn))}</>
            )}
          </Typography>
        </div>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            Night:
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            {bookingDetails?.total_night}
          </Typography>
        </div>
      </CardBody>
    </Card>
  );
};
