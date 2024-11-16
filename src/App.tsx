import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';
import { useAppDispatch } from './app/hooks';
import { Suspense, useContext, useEffect } from 'react';
import { loadNews } from './features/newsSlice';
import { MenuContext } from './context/MenuContext';
import { Menu } from './components/Menu';
import ErrorBoundary from './pages/ErrorBoundary/ErrorBoundary';
import { LoadingPage } from './pages/LoadingPage/LoadingPage';
import { Error } from './components/Error';
import { createPortal } from 'react-dom';

export const App = () => {
  const dispatch = useAppDispatch();
  const { showMenu } = useContext(MenuContext);

  useEffect(() => {
    dispatch(loadNews());
  }, []);

  return (
    <>
      <TopBar />
      <ErrorBoundary fallback={<Error />}>
        <Suspense fallback={<LoadingPage />}>
          {showMenu && (createPortal(
              <Menu />,
              document.body,
            ))}
          <Outlet />
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </>
  );
};
