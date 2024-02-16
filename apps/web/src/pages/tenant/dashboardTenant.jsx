import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { PaymentProofDialog } from './paymentProof';
import { SidebarTenant } from '../properties/SidebarTenant';
import { CircularPagination } from './paginationTenant';
import { formatDate } from '../../helper/formatFunction';
import { api } from '../../helper/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const TenantDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [processedTransactions, setProcessedTransactions] = useState([]);
  const token = localStorage.getItem('token');
  const user = useSelector((state) => state.user.value);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTransactionId, setSelectedTransactionId] = useState(null);
  const [noDataMessage, setNoDataMessage] = useState(null);
  const openPaymentProofDialog = (id) => {
    setSelectedTransactionId(id);
  };

  const closePaymentProofDialog = () => {
    setSelectedTransactionId(null);
  };

  const getDataTransaction = async (page = 1, limit = 10) => {
    try {
      const response = await api.get('/transaction/tenant', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          statusFilter: statusFilter,
          page: page,
          limit: limit,
        },
      });
      const { totalPages, currentPage, items } = response.data;
      setTotalPages(totalPages);
      setCurrentPage(currentPage);

      if (!items || items.length === 0) {
        setTransactions([]);
        setNoDataMessage('Tidak ada pesanan yang Anda cari.');
      } else {
        setTransactions(items);
        setNoDataMessage(null);
      }
    } catch (error) {
      console.log(error);
      setTransactions([]);
      setNoDataMessage('Error fetching transactions.');
    }
  };

  useEffect(() => {
    getDataTransaction();
  }, [statusFilter]);

  const handleApprove = async (id) => {
    try {
      await api.patch(
        `/transaction/tenant/${id}/approve`,
        { status: 'pembayaran berhasil' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransactions((prevTransactions) => {
        return prevTransactions?.map((transaction) =>
          transaction.id === id
            ? { ...transaction, status: 'pembayaran berhasil' }
            : transaction,
        );
      });

      setProcessedTransactions((prevTransactions) => [...prevTransactions, id]);
      toast.success('Transaction approved successfully!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#4BB543', color: 'white' },
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to approve transaction.');
    }
  };

  const handleReject = async (id) => {
    try {
      await api.patch(
        `/transaction/tenant/${id}/reject`,
        { status: 'menunggu pembayaran' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransactions((prevTransactions) => {
        return prevTransactions?.map((transaction) =>
          transaction.id === id
            ? { ...transaction, status: 'menunggu pembayaran' }
            : transaction,
        );
      });

      setProcessedTransactions((prevTransactions) => [...prevTransactions, id]);
      toast.info('Transaction rejected.', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#FFA500', color: 'white' },
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to reject transaction.');
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.patch(
        `/transaction/tenant/${id}/cancel`,
        { status: 'transaksi dibatalkan' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setTransactions((prevTransactions) => {
        return prevTransactions?.map((transaction) =>
          transaction.id === id
            ? { ...transaction, status: 'transaksi dibatalkan' }
            : transaction,
        );
      });

      setProcessedTransactions((prevTransactions) => [...prevTransactions, id]);

      toast.info('Transaction cancelled.', {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { backgroundColor: '#FFA500', color: 'white' },
      });
    } catch (error) {
      console.log(error);
      toast.error('Failed to cancel transaction.');
    }
  };

  return (
    <div className="flex">
      <SidebarTenant />
      <div className="felx flex-col">
        <div className="container mx-auto my-8">
          <h1 className="text-3xl font-semibold mb-6 text-yellow-600">
            {user?.name}
          </h1>
          <div className="flex my-4">
            <button
              className={`mr-4 px-4 py-2 ${
                statusFilter === 'all'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setStatusFilter('all')}
            >
              All
            </button>
            <button
              className={`mr-4 px-4 py-2 ${
                statusFilter === 'onProcess'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setStatusFilter('onProcess')}
            >
              On Process
            </button>
            <button
              className={`mr-4 px-4 py-2 ${
                statusFilter === 'onGoing'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setStatusFilter('onGoing')}
            >
              On Going
            </button>
            <button
              className={`px-4 py-2 ${
                statusFilter === 'cancel'
                  ? 'bg-yellow-500 text-white'
                  : 'bg-gray-200'
              }`}
              onClick={() => setStatusFilter('cancel')}
            >
              Cancel
            </button>
          </div>
          {noDataMessage && <p className="text-red-500">{noDataMessage}</p>}
          {transactions.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border rounded-lg">
                <thead className="bg-yellow-200">
                  <tr>
                    <th className="border p-3">Tanggal Checkin</th>
                    <th className="border p-3">Nama Pemesan</th>
                    <th className="border p-3">Nama Kamar</th>
                    <th className="border p-3">Status</th>
                    <th
                      className={`border p-3 ${
                        statusFilter === 'cancel' ? 'hidden' : ''
                      }`}
                    >
                      Payment Proof
                    </th>
                    {transactions?.some(
                      (transaction) =>
                        transaction.status === 'menunggu konfirmasi',
                    ) && <th className="border p-3">Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {transactions?.map((transaction) => (
                    <tr key={transaction.id} className="bg-white">
                      <td className="border p-3">
                        {formatDate(transaction.checkIn, 'dd-mm-yyyy')}
                      </td>
                      <td className="border p-3">{transaction.User?.name}</td>
                      <td className="border p-3">{transaction.Room?.name}</td>
                      <td className="border p-3">{transaction?.status}</td>
                      <td
                        className={`border p-3 ${
                          statusFilter === 'cancel' ? 'hidden' : ''
                        }`}
                      >
                        {transaction?.bukti_pembayaran && (
                          <button
                            className="text-blue-500 underline"
                            onClick={() =>
                              openPaymentProofDialog(transaction.id)
                            }
                          >
                            View Payment Proof
                          </button>
                        )}
                      </td>
                      {transaction?.status === 'menunggu konfirmasi' && (
                        <td className="border p-3">
                          <button
                            onClick={() => handleApprove(transaction.id)}
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(transaction.id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                          >
                            Reject
                          </button>
                        </td>
                      )}

                      {transaction?.status === 'menunggu pembayaran' && (
                        <td className="border p-3">
                          <button
                            onClick={() => handleCancel(transaction.id)}
                            className="bg-yellow-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          >
                            Cancel
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <PaymentProofDialog
            isOpen={selectedTransactionId !== null}
            onClose={closePaymentProofDialog}
            imageUrl={
              selectedTransactionId
                ? transactions.find(
                    (transaction) => transaction.id === selectedTransactionId,
                  )?.bukti_pembayaran
                : ''
            }
          />
        </div>
        {transactions.length > 0 && (
          <div className="flex justify-center ">
            <CircularPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => getDataTransaction(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
