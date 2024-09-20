import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const token = localStorage.getItem('tap auth token');
  
    // If no token, redirect to login page
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    return <Outlet />
  };

export default ProtectedRoute