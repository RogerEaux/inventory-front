import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Root from './layout/Root';
import Users from './pages/users/users-page/Users';
import ErrorPage from './layout/ErrorPage';
import ProtectedRoute from './layout/routes/ProtectedRoute';
import Products from './pages/products/Products';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: '/users', element: <Users /> },
      { path: '/products', element: <Products /> },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
