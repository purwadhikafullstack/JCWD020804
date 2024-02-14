import React, { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { SidebarTenant } from '../properties/SidebarTenant';
import { formatDate, formatMataUang } from '../../helper/formatFunction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { CircularPagination } from './paginationTenant';
import { api } from '../../helper/api';

export const Report = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const token = localStorage.getItem('token');
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const getSalesTransaction = async (page = 1) => {
    try {
      const queryParams = `?${startDate ? `startDate=${startDate}&` : ''}${
        endDate ? `endDate=${endDate}&` : ''
      }page=${page}`;
      const response = await api.get(
        `/transaction/tenant/sales-report${queryParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);

      setTransactions(response?.data.transactions);
      setTotalRevenue(response?.data.totalRevenue);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getSalesTransaction();
  }, [startDate, endDate]);

  return (
    <div className="flex flex-row min-h-screen">
      <SidebarTenant />
      <div className="flex-1 m-6 p-8 overflow-hidden">
        <div className="flex justify-center gap-20">
          <div>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setDateRange([item.selection]);
                setStartDate(item.selection.startDate);
                setEndDate(item.selection.endDate);
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
            />
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faCoins} size="lg" color="gold" />
            <span>Total Revenue: {formatMataUang(totalRevenue, 'IDR')}</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-green-500">
                <th>User</th>
                <th>Room</th>
                <th>Check In</th>
                <th>Status</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((transaction) => (
                <tr key={transaction.id} className="border-b">
                  <td>{transaction.User.name}</td>
                  <td>{transaction.Room.name}</td>
                  <td>{formatDate(new Date(transaction.checkIn))}</td>
                  <td>{transaction.status}</td>
                  <td>{formatMataUang(transaction.total_price, 'IDR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {transactions.length > 0 && (
          <div className="flex justify-center ">
            <CircularPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => getSalesTransaction(page)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
