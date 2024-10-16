import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

export const RequireAuth = () => {
  const { authorized } = useContext(AuthContext);
  const { pathname } = useLocation();

  if (!authorized) {
    return <Navigate to="/login" replace state={{ pathname }} />;
  }

  return <Outlet />;
};
