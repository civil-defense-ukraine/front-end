import styles from './Admin.module.scss';
import { Sidebar } from './Sidebar';
import { Main } from './Main/Main';
import { AdminProvider } from '../../context/AdminContext';
import { AuthProvider } from '../../context/AuthContext';

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
