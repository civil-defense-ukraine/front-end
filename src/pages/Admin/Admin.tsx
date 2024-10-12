import styles from './Admin.module.scss';
import { Sidebar } from './Sidebar';
import { Main } from './Sidebar/Main/Main';

export const Admin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        <Main />
      </div>
      <div className={styles.form}></div>
    </div>
  );
};
