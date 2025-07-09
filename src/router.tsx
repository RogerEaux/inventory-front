import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Root from './layout/Root';
import Users from './pages/users/Users';
import ErrorPage from './layout/ErrorPage';
import ProtectedRoute from './layout/routes/ProtectedRoute';
import Products from './pages/products/Products';
import UnauthorisedPage from './layout/UnauthorisedPage';
import ProductDetails from './pages/product-details/ProductDetails';

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
      {
        path: '/users',
        element: (
          <ProtectedRoute allowedRoles={['ADMIN']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products',
        children: [
          { index: true, element: <Products /> },
          { path: ':productId', element: <ProductDetails /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/unauthorised', element: <UnauthorisedPage /> },
  { path: '*', element: <ErrorPage /> },
]);

export default router;
