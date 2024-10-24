import styles from './Admin.module.scss';
import { Sidebar } from './Sidebar';
import { Main } from './Main/Main';
import { AdminContext, AdminProvider } from '../../context/AdminContext';
import { useContext } from 'react';
import classNames from 'classnames';
import { AuthProvider } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';
import { NewsForm } from './AdminForm';

const Admin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <AuthProvider>
        <AdminProvider>
          <div className={styles.main}>
            <Main />
          </div>
        </AdminProvider>
      </AuthProvider>
    </div>
  );
};

export default Admin;
