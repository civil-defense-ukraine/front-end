import styles from './NewsContainer.module.scss';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

export const NewsContainer = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <section>
      <div className={styles.header}>
        <Breadcrumbs />
      </div>
      <Outlet />
    </section>
  );
};
