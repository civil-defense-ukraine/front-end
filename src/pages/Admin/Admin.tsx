import styles from './Admin.module.scss';
import { Sidebar } from './Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { AdminSearch } from './components/AdminSearch';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Suspense, useEffect } from 'react';
import { loadNews } from '../../features/newsSlice';
import { loadTeam } from '../../features/teamSlice';
import { Error } from '../../components/Error';
import { LoadingPage } from '../LoadingPage/LoadingPage';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';

const Admin = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { news } = useAppSelector(state => state.news);
  useEffect(() => {
    dispatch(loadNews());
    dispatch(loadTeam());
  }, []);

  console.log(news);

  return (
    <ErrorBoundary fallback={<Error />}>
      <Suspense fallback={<LoadingPage />}>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <Sidebar />
          </div>
          <section className={styles.main}>
            {pathname !== '/admin/active-donation' && <AdminSearch />}

            <Outlet />
          </section>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default Admin;
