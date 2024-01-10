import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import Home from './pages/home/Home';
import { DetailPage } from './pages/bookingPages/detailPage';
import { BookingPage } from './pages/bookingPages/bookingPage';
import PaymentDetails from './pages/bookingPages/paymentDetailPage';
import { RatingWithComment } from './components/ratingComponent';
import Login from './pages/authorizationandAuthentication/login';
import { Register } from './pages/authorizationandAuthentication/register';
import { ToastContainer } from 'react-toastify';
import { setData } from './redux/userSlice';
import Tenant from './pages/authorizationandAuthentication/tenant';
import ResetPasswordForm from './pages/authorizationandAuthentication/ResetPaswordForm';
import { ModalUserResetPassword } from './pages/authorizationandAuthentication/ModalUserResetPassword';
import { UserProfile } from './components/profile/userprofile';
import Verify from './pages/authorizationandAuthentication/verify';
import { DashboardTenant } from './pages/properties/DashboardTenant';
import { ListPropertyTenant } from './pages/properties/RightBar/ListProperty';
import { AddPropertiesTenant } from './pages/properties/AddProperties';
import { PaymentPage } from './pages/bookingPages/paymentPage';
import { TenantDashboard } from './pages/tenant/dashboardTenant';
import { UserDashboard } from './pages/user/dashboardUser';
import TenantOnly from './components/requiredTenant';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { path: '/rating', element: <RatingWithComment /> },
  { path: '/detail/:id', element: <DetailPage /> },
  { path: '/booking', element: <BookingPage /> },
  { path: '/booking/:id', element: <PaymentPage /> },
  { path: '/booking-detail/:id', element: <PaymentDetails /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/tenant', element: <Tenant /> },
  { path: '/user/dashboard', element: <UserDashboard /> },
  {
    element: <TenantOnly />,
    children: [{ path: '/tenant/dashboard', element: <TenantDashboard /> }],
  },
  { path: '/reset-password/:email', element: <ModalUserResetPassword /> },
  { path: '/resetpasswordform/:email', element: <ResetPasswordForm /> },
  { path: '/user-profile', element: <UserProfile /> },
  { path: '/verify/:id', element: <Verify /> },
  { path: '/list-your-property', element: <DashboardTenant /> },
  { path: '/list-property', element: <ListPropertyTenant /> },
  { path: '/add-properties', element: <AddPropertiesTenant /> },
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
        `http://localhost:8000/api/user/keep-login`,
        config,
      );
      // console.log(response.data);
      dispatch(setData(response.data));
      localStorage.setItem('isTenant', response.data.isTenant);
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
