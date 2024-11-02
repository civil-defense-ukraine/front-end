import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { lazy } from 'react';

import { App } from './App';
import { Home } from './pages/Home';
const NewsPage = lazy(() => import('./pages/NewsPage/NewsPage'));
const NewsArticle = lazy(() => import('./pages/NewsArticle/NewsArticle'));
const AboutUs = lazy(() => import('./pages/AboutUs/AboutUs'));
import { NewsContainer } from './pages/NewsContainer';
const LoginPage = lazy(() => import('./pages/Admin/LoginPage/LoginPage'));
import { RequireAuth } from './pages/Admin/RequireAuth/RequireAuth';

import { AuthProvider } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';

import { ErrorPage } from './pages/ErrorPage';

import { DonatePage } from './pages/DonatePage';
const AdminNews = lazy(() => import('./pages/Admin/AdminNews/AdminNews'));
const AdminTeam = lazy(() => import('./pages/Admin/AdminTeam/AdminTeam'));

import { AdminDonation } from './pages/Admin/AdminDonation';
import Admin from './pages/Admin/Admin';

export const Root = () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <Router>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="news" element={<NewsContainer />}>
                <Route index element={<NewsPage />} />
                <Route path=":newsId" element={<NewsArticle />} />
              </Route>
              <Route path="reports" element={<NewsContainer />}>
                <Route index element={<NewsPage />} />
                <Route path=":newsId" element={<NewsArticle />} />
              </Route>
              <Route path="donate" element={<DonatePage />} />
              <Route path="*" element={<ErrorPage />} />
              <Route
                path="login"
                element={
                  <AuthProvider>
                    <LoginPage />
                  </AuthProvider>
                }
              />
            </Route>
            <Route path="admin" element={<RequireAuth />}>
              <Route element={<Admin />}>
                <Route index element={<AdminNews />} />
                <Route path="team" element={<AdminTeam />} />
                <Route path="active-donation" element={<AdminDonation />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </MenuProvider>
    </Provider>
  );
};
