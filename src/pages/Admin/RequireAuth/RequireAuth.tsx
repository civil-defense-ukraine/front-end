import { Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from '../../../context/AuthContext';
import { useSessionStorage } from '../../../hooks/useSessionStorage';
import { FormProvider } from '../../../context/FormContext';
import { AdminProvider } from '../../../context/AdminContext';
import Admin from '../Admin';

export const RequireAuth = () => {
  const [authorized] = useSessionStorage('authorized', false);
  const { pathname } = useLocation();

  if (!authorized) {
    return <Navigate to="/login" replace state={{ pathname }} />;
  }

  return (
    <AuthProvider>
      <FormProvider>
        <AdminProvider>
          <Admin />
        </AdminProvider>
      </FormProvider>
    </AuthProvider>
  );
};
