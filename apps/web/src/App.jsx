import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import { TransactionForm } from './pages/transactions/transactionPages';
import PaymentPage from './pages/transactions/paymentPage';
import PaymentDetails from './pages/transactions/transferPage';
import { RatingWithComment } from './components/ratingComponent';
import Login from './pages/authorizationandAuthentication/login';
import { Register } from './pages/authorizationandAuthentication/register';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import { setData } from './redux/userSlice';
import Tenant from './pages/authorizationandAuthentication/tenant';
import ResetPasswordForm from './pages/authorizationandAuthentication/ResetPaswordForm';
import { ModalUserResetPassword } from './pages/authorizationandAuthentication/ModalUserResetPassword';
import { UserProfile } from './components/profile/userprofile';
import Verify from './pages/authorizationandAuthentication/verify';
import { DashboardTenant } from './pages/properties/DashboardTenant';
import { ListPropertyTenant } from './pages/properties/RightBar/ListProperty';
import AddHotelPage from './pages/properties/AddPropertyPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { path: '/rating', element: <RatingWithComment /> },
  { path: '/transaction', element: <TransactionForm /> },
  { path: '/payment', element: <PaymentPage /> },
  { path: '/payment-detail', element: <PaymentDetails /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: 'tenant', element: <Tenant /> },
  { path: '/reset-password/:email', element: <ModalUserResetPassword /> },
  { path: '/resetpasswordform/:email', element: <ResetPasswordForm /> },
  { path: '/user-profile', element: <UserProfile /> },
  { path: '/verify/:id', element: <Verify /> },
  { path: '/list-your-property', element: <DashboardTenant /> },
  { path: '/list-property', element: <ListPropertyTenant /> },
  { path: '/add-properties', element: <AddHotelPage /> },
]);

function App() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();
  console.log(token);

  const KeepLogin = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/Keep-login`,
        config,
      );
      console.log(response.data);
      dispatch(setData(response.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    KeepLogin();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
