import { Outlet } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';
import { useAppDispatch } from './app/hooks';
import { useContext, useEffect } from 'react';
import { loadNews } from './features/newsSlice';
import { AuthProvider } from './context/AuthContext';
import { MenuContext, MenuProvider } from './context/MenuContext';
import { Menu } from './components/Menu';

export const App = () => {
  const dispatch = useAppDispatch();
  const { showMenu } = useContext(MenuContext);
  console.log(showMenu);

  useEffect(() => {
    dispatch(loadNews());
  }, []);

  return (
    <AuthProvider>
      <TopBar />
      {showMenu && <Menu />}
      <Outlet />
      <Footer />
    </AuthProvider>
  );
};
