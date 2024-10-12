import ReactDOM from 'react-dom/client';

import './index.css';
import { Root } from './Root';
import ErrorBoundary from './pages/ErrorBoundary/ErrorBoundary';
import { ErrorPage } from './pages/ErrorPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <ErrorBoundary fallback={<ErrorPage />}>
    <Root />
  </ErrorBoundary>,
);
