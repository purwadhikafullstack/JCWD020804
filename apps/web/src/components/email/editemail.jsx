import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
const EditEmailSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export const EditEmail = () => {
  const token = localStorage.getItem('token');
  const [showModal, setShowModal] = useState(false);
  const authToken = token;
  const user = useSelector((state) => state.user.value);
  const id = user.id;

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: EditEmailSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        console.log(values);

        if (values.email.trim() !== '') {
          formData.append('email', values.email);
        }

        const url = `http://localhost:8000/api/user/edit-email`;

        const response = await axios.patch(url, values, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log('Response:', response.data);
          notif();
        } else {
          console.error('Error:', response.status, response.statusText);
          // Atasi kesalahan sesuai dengan status code yang diterima
        }
      } catch (error) {
        console.log('Error:', error);
      }
    },
  });

  const notif = () => {
    toast.success(
      'Your email has been successfully updated. Please check your email for verification',
      {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        onClose: () => {
          // navigate('/');
          setTimeout(() => {}, 5000);
        },
      },
    );
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 p-2 w-full border rounded-md ${
                formik.touched.email && formik.errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:border-blue-500'
              } focus:outline-none`}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="text-black bg-yellow-500 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-black"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
  
};
