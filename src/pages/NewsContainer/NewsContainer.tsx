import styles from './NewsContainer.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Outlet } from 'react-router-dom';

export const NewsContainer = () => {
  return (
    <section>
      <div className={styles.header}>
        <Breadcrumbs />
      </div>
      <Outlet />
    </section>
  );
};
