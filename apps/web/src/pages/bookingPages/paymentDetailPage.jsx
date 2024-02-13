import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Typography } from '@material-tailwind/react';
import { BookingCard } from '../../components/booking/bookingCard';
import { useBookingDetails } from '../../components/booking/bookingHook';
import { Navbarpage } from '../../components/navbar';
import { formatMataUang } from '../../helper/formatFunction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '../../helper/api';

function PaymentDetails() {
  const { id } = useParams();
  const { bookingDetails, fetchBookingDetails } = useBookingDetails(id);
  const navigate = useNavigate();
  const selectedBank = localStorage.getItem('selectedBank');
  const storedStartTimeKey = `paymentStartTime_${id}`;
  const [startTime, setStartTime] = useState(() => {
    const storedStartTime = sessionStorage.getItem(storedStartTimeKey);
    return storedStartTime ? new Date(storedStartTime) : new Date();
  });
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const now = new Date();
    const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
    setStartTime(oneHourLater);

    sessionStorage.setItem(storedStartTimeKey, oneHourLater.toString());
  }, [id, storedStartTimeKey]);

  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = new Date();
      const timeDiff = Math.floor((startTime - currentTime) / 1000);
      setTimeLeft(Math.max(0, timeDiff));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const formik = useFormik({
    initialValues: {
      bukti_pembayaran: null,
    },
    validationSchema: Yup.object({
      bukti_pembayaran: Yup.mixed()
        .required('A file is required')
        .test(
          'fileSize',
          'File size must be less than 2 MB',
          (value) => value && value.size <= 2 * 1024 * 1024,
        ),
    }),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        formData.append('bukti_pembayaran', values.bukti_pembayaran);
        formData.append('status', 'menunggu konfirmasi');

        const response = await api.patch(
          `/booking/upload-payment/${id}`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          },
        );
        toast.success('Payment successful!', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        localStorage.removeItem('selectedBank');

        setTimeout(() => {
          navigate('/user/dashboard');
        }, 5000);
      } catch {
        toast.error('Error during payment: ' + error.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
  });

  const handleCancelBooking = async () => {
    try {
      await api.patch(
        `/booking/${id}/cancel`,
        { status: 'transaksi dibatalkan' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate('/user/dashboard');
    } catch (error) {
      console.error('Error uploading payment:', error);
    }
  };

  return (
    <>
      <Navbarpage />
      <div className="flex justify-center gap-4">
        <div
          className="flex flex-col justify-center items-center p-10 bg-gray-100 rounded-lg shadow-lg"
          style={{ width: '80%', maxWidth: '600px' }}
        >
          <Typography className="text-3xl font-bold text-blue-500">
            Payment Details
          </Typography>

          <Typography className="text-xl mt-4 text-gray-700">
            Make a Payment Before:
          </Typography>
          <Typography className="text-xl mt-4 text-red-500">
            {startTime.toLocaleTimeString()}
          </Typography>
          <Typography className="text-xl mt-4 text-red-500">
            {formatTimeLeft()}
          </Typography>
          <Typography className="text-lg mt-4 text-gray-700">
            Bank: {selectedBank ? selectedBank.toUpperCase() : 'Not Selected'}
          </Typography>
          <Typography className="text-lg mt-2 text-gray-700">
            Account Number: 123456789
          </Typography>
          <Typography className="text-lg mt-2 text-gray-700">
            Account Holder Name: PT. Masn Stay
          </Typography>
          <Typography className="text-lg mt-2 text-gray-700">
            Transfer amount:{' '}
            {formatMataUang(bookingDetails?.total_price, 'IDR')}
          </Typography>
          <Typography className="text-xl mt-4 text-gray-700">
            Complete Your Payment
          </Typography>
          <Typography className="text-lg mt-2 text-gray-700">
            Upload your transaction receipt here
          </Typography>
          <Input
            id="bukti_pembayaran"
            name="bukti_pembayaran"
            type="file"
            onChange={(event) => {
              formik.setFieldValue(
                'bukti_pembayaran',
                event.currentTarget.files[0],
              );
            }}
            className="mt-2"
          />
          {formik.touched.bukti_pembayaran && formik.errors.bukti_pembayaran ? (
            <div>{formik.errors.bukti_pembayaran}</div>
          ) : null}

          <Button
            className="bg-blue-500 text-white mt-4"
            type="button"
            onClick={formik.handleSubmit}
          >
            I Have Completed Payment
          </Button>
          <Button
            className="bg-blue-500 text-white mt-4"
            type="button"
            onClick={handleCancelBooking}
          >
            Cancel Booking
          </Button>
        </div>
        <div>
          <BookingCard bookingDetails={bookingDetails} />
        </div>
      </div>
    </>
  );
}

export default PaymentDetails;
