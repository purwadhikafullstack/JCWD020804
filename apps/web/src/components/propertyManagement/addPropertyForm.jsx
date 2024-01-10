// AddHotelForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddHotelForm = ({ addHotel }) => {
  const formik = useFormik({
    initialValues: {
      namaHotel: '',
      lokasi: '',
    },
    validationSchema: Yup.object({
      namaHotel: Yup.string().required('Nama Hotel harus diisi'),
      lokasi: Yup.string().required('Lokasi harus diisi'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await fetch('http://localhost:3001/api/hotels', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const newHotel = await response.json();
          addHotel(newHotel);
          resetForm();
        } else {
          console.error('Gagal menambahkan hotel');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border mx-auto">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label htmlFor="namaHotel" className="block text-sm font-medium text-gray-700">
            Name Hotel:
          </label>
          <input
            type="text"
            id="namaHotel"
            name="namaHotel"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.namaHotel}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.namaHotel && formik.errors.namaHotel ? (
            <div className="text-red-500 text-sm">{formik.errors.namaHotel}</div>
          ) : null}
        </div>
  
        <div className="mb-4">
          <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700">
            Lokasi:
          </label>
          <input
            type="text"
            id="lokasi"
            name="lokasi"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lokasi}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.lokasi && formik.errors.lokasi ? (
            <div className="text-red-500 text-sm">{formik.errors.lokasi}</div>
          ) : null}
        </div>
  
        <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded-md">
          Tambah Hotel
        </button>
      </form>
    </div>
  );
  
};

export default AddHotelForm;
