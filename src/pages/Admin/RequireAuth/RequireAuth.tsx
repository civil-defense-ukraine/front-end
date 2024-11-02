import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { FormProvider } from '../../../context/FormContext';
import { AuthProvider } from '../../../context/AuthContext';

export const RequireAuth = () => {
  const [authorized] = useSessionStorage('authorized', false);
  const { pathname } = useLocation();

  if (!authorized) {
    return <Navigate to="/login" replace state={{ pathname }} />;
  }

  return (
    <FormProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </FormProvider>
  );
};
