import styles from './Admin.module.scss';
import { Sidebar } from './Sidebar';
import { Main } from './Main/Main';
import { Form } from './Form';
import { AdminContext, AdminProvider } from '../../context/AdminContext';
import { useContext } from 'react';
import classNames from 'classnames';

const Admin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <AdminProvider>
        <div className={styles.main}>
          <Main />
        </div>
        <Form />
      </AdminProvider>
    </div>
  );
};

export default Admin;
