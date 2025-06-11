import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';
import Root from './layout/Root';
import Users from './pages/users/Users';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      { path: '/users', element: <Users /> },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
