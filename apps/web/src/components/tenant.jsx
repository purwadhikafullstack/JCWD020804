import React, { useState } from 'react';

const Tenant = () => {
  const [nik, setNik] = useState('');
  const [ktpImage, setKtpImage] = useState(null);
  const [error, setError] = useState('');

  const handleNikChange = (e) => {
    setNik(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setKtpImage(reader.result);
        setError('');
      };

      reader.onerror = () => {
        setError('Gagal membaca berkas. Pastikan berkas adalah gambar.');
      };

      reader.readAsDataURL(file);
    } else {
      setError('Berkas tidak ditemukan.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    
    // Lakukan sesuatu dengan data NIK dan gambar KTP, misalnya kirim ke server
    console.log('NIK:', nik);
    console.log('KTP Image:', ktpImage);
    // Tambahkan logika pengiriman data ke server di sini
  };

  return (
    <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Became a Tenant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nik" className="block text-sm font-medium text-gray-700">
            Nomor NIK
          </label>
          <input
            type="text"
            id="nik"
            name="nik"
            value={nik}
            onChange={handleNikChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="ktpImage" className="block text-sm font-medium text-gray-700">
            Upload Foto KTP
          </label>
          <input
            type="file"
            id="ktpImage"
            name="ktpImage"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {ktpImage && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Preview Foto KTP
            </label>
            <img src={ktpImage} alt="Preview KTP" className="mt-2 w-full h-32 object-cover rounded-md" />
          </div>
        )}
        <div className="flex items-center justify-end">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tenant;
