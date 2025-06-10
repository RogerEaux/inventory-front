import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/login/Login';

const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;
