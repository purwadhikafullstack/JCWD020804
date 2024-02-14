import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/home/Home';
import { DetailPage } from './pages/bookingPages/detailPage';
import { BookingPage } from './pages/bookingPages/bookingPage';
import PaymentDetails from './pages/bookingPages/paymentDetailPage';
import Login from './pages/authorizationandAuthentication/login';
import { Register } from './pages/authorizationandAuthentication/register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setData } from './redux/userSlice';
import Tenant from './pages/authorizationandAuthentication/tenant';
import ResetPasswordForm from './pages/authorizationandAuthentication/ResetPaswordForm';
import { ModalUserResetPassword } from './pages/authorizationandAuthentication/ModalUserResetPassword';
import { UserProfile } from './components/profile/userprofile';
import Verify from './pages/authorizationandAuthentication/verify';
import { DashboardTenant } from './pages/properties/DashboardTenant';
import { ListPropertyTenant } from './pages/properties/RightBar/ListProperty';
import { PaymentPage } from './pages/bookingPages/paymentPage';
import { TenantDashboard } from './pages/tenant/dashboardTenant';
import TenantOnly from './components/requiredTenant';
import { UserDashboard } from './pages/user/dashboardUser';
import UserOnly from './components/requiredUser';
import { TenantReviews } from './pages/tenant/listReviewTenant';
import AddRoomForm from './components/propertyManagement/addPropertyRoomForm';
import AddHotelPage from './pages/properties/AddPropertyPage';
import { EditProperty } from './pages/properties/RightBar/EditProperty';
import { ListRoomTenant } from './pages/properties/Roomlist/ListRoom';
import EditRoomForm from './pages/properties/Roomlist/editRoom';
import { Report } from './pages/tenant/salesReport';
import { RoomReport } from './pages/tenant/roomReport';
import { api } from './helper/api';
import { EditEmail } from './components/email/editemail';
import Required from './components/required';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/reset-password/:email', element: <ModalUserResetPassword /> },
  { path: '/resetpasswordform/:email', element: <ResetPasswordForm /> },
  { path: '/user-profile', element: <UserProfile /> },
  { path: '/verify/:id', element: <Verify /> },
  { path: '/edit-email', element: <EditEmail /> },
  {
    element: <Required />,
    children: [
      { path: '/detail/:id', element: <DetailPage /> },
      { path: '/booking', element: <BookingPage /> },
      { path: '/booking/:id', element: <PaymentPage /> },
      { path: '/booking-detail/:id', element: <PaymentDetails /> },
      { path: '/tenant', element: <Tenant /> },
    ],
  },
  {
    element: <UserOnly />,
    children: [{ path: '/user/dashboard', element: <UserDashboard /> }],
  },
  {
    element: <TenantOnly />,
    children: [
      { path: '/tenant/dashboard', element: <TenantDashboard /> },
      { path: '/tenant/ratings', element: <TenantReviews /> },
      { path: '/tenant/sales-report', element: <Report /> },
      { path: '/tenant/room-report', element: <RoomReport /> },
      { path: '/list-property', element: <ListPropertyTenant /> },
      { path: '/add-properties', element: <AddHotelPage /> },
      { path: '/edit-properties/:id', element: <EditProperty /> },
      { path: '/list-room', element: <ListRoomTenant /> },
      { path: '/add-room/:id', element: <AddRoomForm /> },
      { path: '/edit-rooms/:id', element: <EditRoomForm /> },
      { path: '/tenant-dashboard', element: <DashboardTenant /> },
    ],
  },
]);

function App() {
  const token = localStorage.getItem('token');
  const dispatch = useDispatch();

  const KeepLogin = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await api.get(`/user/keep-login`, config);
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
