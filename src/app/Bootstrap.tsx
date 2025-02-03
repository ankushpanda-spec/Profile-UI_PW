import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './globals.css';
import { BaseLayout } from '@/shared/components';
import { GlobalProvider } from '@/shared/context';
import ErrorBoundary from './pages/error-boundary';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <GlobalProvider>
        <BrowserRouter>
          <ErrorBoundary>
            <BaseLayout>
              <App />  
            </BaseLayout>
          </ErrorBoundary>
        </BrowserRouter>
      </GlobalProvider>
    </React.StrictMode>
  );
}
