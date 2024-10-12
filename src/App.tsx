import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';
import { useAppDispatch } from './app/hooks';
import { useEffect } from 'react';
import { loadNews } from './features/newsSlice';
import { AuthProvider } from './context/AuthContext';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadNews());
  }, []);

  return (
    <AuthProvider>
      <TopBar />
      <Outlet />
      <Footer />
    </AuthProvider>
  );
};
