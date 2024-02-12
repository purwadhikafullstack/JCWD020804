import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Navbarpage } from '../../components/navbar';
import { useBookingDetails } from '../../components/booking/bookingHook';
import { BookingCard } from '../../components/booking/bookingCard';
import { formatMataUang } from '../../helper/formatFunction';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {api} from '../../helper/api';

export const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { bookingDetails, fetchBookingDetails } = useBookingDetails(id);

  const formik = useFormik({
    initialValues: {
      paymentMethod: '',
      selectedBank: '',
    },
    onSubmit: (values) => {
      handlePayment()
    },
  });

  const handlePayment = async () => {
    const token = localStorage.getItem('token');
    try {
      if (!bookingDetails) {
        console.error('Booking details not available.');
        return;
      }
      const response = await api.patch(
        `/booking/${id}`,
        { payment_method: formik.values.paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('complete the payment immediately!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (formik.values.paymentMethod === 'bank transfer') {
        localStorage.setItem('selectedBank', formik.values.selectedBank);
        setTimeout(() => {
          navigate(`/booking-detail/${id}`);
        }, 5000);
      } else {
        const paymentResponse = await api.patch(
          `/api/booking/${id}`,
          { status: 'pembayaran berhasil' },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }
    } catch (error) {
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
  };

  return (
    <>
      <Navbarpage />
      <div className="flex justify-center gap-4">
        <div className="p-4 md:p-8 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-8">
            Payment Information
          </h1>

          <div className="mb-4">
            <label
              htmlFor="paymentMethod"
              className="block mb-2 font-medium text-gray-700"
            >
              Choose Payment Method:
            </label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formik.values.paymentMethod}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Select a payment method
              </option>
              <option value="bank transfer">Bank Transfer</option>
              <option value="otomatis">Automatic Payment</option>
            </select>
          </div>

          {formik.values.paymentMethod === 'bank transfer' && (
            <div className="mb-4">
              <p className="font-semibold mb-2">Choose Bank:</p>
              <div className="flex flex-col">
                {['bni', 'mandiri', 'bca'].map((bank) => (
                  <label key={bank}>
                    <input
                      type="radio"
                      name="selectedBank"
                      value={bank}
                      checked={formik.values.selectedBank === bank}
                      onChange={formik.handleChange}
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      Bank {bank.toUpperCase()}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {formik.values.paymentMethod && (
            <div className="mt-8">
              <p className="font-semibold mb-4">Payment Details:</p>
              <p className="mb-2">
                Selected Payment Method: {formik.values.paymentMethod}
              </p>
              {formik.values.selectedBank && (
                <p className="mb-2">
                  Selected Bank: {formik.values.selectedBank}
                </p>
              )}
            </div>
          )}
          <div className="mt-8">
            <p className="font-semibold mb-4">Price Details:</p>
            <div className="flex justify-between">
              <p className="mb-4">{bookingDetails?.Room.Property.name} </p>
              <p className="mb-4">
                {formatMataUang(bookingDetails?.total_price, 'IDR')}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-8"
            onClick={handlePayment}
          >
            Submit Payment
          </button>
        </div>
        <div>
          <BookingCard bookingDetails={bookingDetails} />
        </div>
      </div>
    </>
  );
};
