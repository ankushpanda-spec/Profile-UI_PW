import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BaseLayout } from './components';
import { GlobalProvider } from './context';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

import SnackbarWrapper from './context/SnackbarContext';
import LoaderWrapper from './context/LoaderContext';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <BaseLayout>
             <SnackbarWrapper>
              <LoaderWrapper>
              <App />
              </LoaderWrapper>
              </SnackbarWrapper>
            </BaseLayout>
          </ErrorBoundary>
        </BrowserRouter>
      </GlobalProvider>
    </React.StrictMode>
  );
}
