import { Outlet, useLocation } from 'react-router-dom';
import './App.scss';
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';
import { useAppDispatch } from './app/hooks';
import { useContext, useEffect } from 'react';
import { loadNews } from './features/newsSlice';
import { MenuContext } from './context/MenuContext';
import { Menu } from './components/Menu';

export const App = () => {
  const dispatch = useAppDispatch();
  const { showMenu } = useContext(MenuContext);

  useEffect(() => {
    dispatch(loadNews());
  }, []);

  return (
    <>
      <TopBar />
      {showMenu && <Menu />}
      <Outlet />
      <Footer />
    </>
  );
};
