import { Outlet } from 'react-router-dom';

import './App.scss';
import { Footer } from './components/Footer';
import { TopBar } from './components/TopBar';
import { Provider } from 'react-redux';
import { store } from './app/store';

export const App = () => {
  return (
    <Provider store={store}>
      <TopBar />
      <Outlet />
      <Footer />
    </Provider>
  );
};
