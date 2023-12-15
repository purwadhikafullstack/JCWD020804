import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Input, Typography } from '@material-tailwind/react';

function PaymentDetails() {
  const [time, setTime] = useState(new Date());
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  //waktu terkini
  const timeStamp = new Date(time.getTime());

  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600); // calculate hours
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${
      seconds < 10 ? '0' : ''
    }${seconds}`;
  };

  const formik = useFormik({
    initialValues: {
      file: '',
    },
    validationSchema: Yup.object({
      file: Yup.mixed().required('A file is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div
      className="flex flex-col justify-center items-center p-10 bg-gray-100 rounded-lg shadow-lg"
      style={{ width: '80%', maxWidth: '600px' }}
    >
      <Typography className="text-3xl font-bold text-blue-500">
        Payment Details
      </Typography>
      <Typography className="text-lg mt-2 text-gray-700">
        {timeStamp.toLocaleTimeString()}
      </Typography>
      <Typography className="text-xl mt-4 text-gray-700">
        Make a Payment Before:
      </Typography>
      <Typography className="text-xl mt-4 text-red-500">
        {formatTimeLeft()}
      </Typography>
      <Typography className="text-lg mt-4 text-gray-700">Bank: BNI</Typography>
      <Typography className="text-lg mt-2 text-gray-700">
        Account Number: 123456789
      </Typography>
      <Typography className="text-lg mt-2 text-gray-700">
        Account Holder Name: PT. Masn Stay
      </Typography>
      <Typography className="text-lg mt-2 text-gray-700">
        Transfer amount: Rp 1.000.000
      </Typography>
      <Typography className="text-xl mt-4 text-gray-700">
        Complete Your Payment
      </Typography>
      <Typography className="text-lg mt-2 text-gray-700">
        Upload your transaction receipt here
      </Typography>
      <Input
        id="file"
        name="file"
        type="file"
        onChange={(event) => {
          formik.setFieldValue('file', event.currentTarget.files[0]);
        }}
        className="mt-2"
      />
      {formik.touched.file && formik.errors.file ? (
        <div>{formik.errors.file}</div>
      ) : null}
      <Button
        className="bg-blue-500 text-white mt-4"
        onClick={formik.handleSubmit}
      >
        I Have Completed Payment
      </Button>
    </div>
  );
}

export default PaymentDetails;
