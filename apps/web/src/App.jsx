import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import { TransactionForm } from './pages/transactions/transactionPages';
import PaymentPage from './pages/transactions/paymentPage';
import PaymentDetails from './pages/transactions/transferPage';
import { RatingWithComment } from './components/ratingComponent';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { path: '/rating', element: <RatingWithComment/> },
  { path: '/transaction', element: <TransactionForm /> },
  { path: '/payment', element: <PaymentPage /> },
  { path: '/payment-detail', element: <PaymentDetails /> },
 
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
