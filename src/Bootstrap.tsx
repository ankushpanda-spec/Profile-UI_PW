import { ThemeProvider } from '@pw-tech/omni-ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { BaseLayout } from './components';
import { GlobalProvider } from './context';
import ErrorBoundary from './ErrorBoundary';
import {AuthProvider} from '@pw-tech/web-circuit';
import './index.css';


const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <AuthProvider>
      <BrowserRouter basename={process.env.PUBLIC_BASE_PATH}>
        <ErrorBoundary>
          <GlobalProvider>
            <ThemeProvider>
              <BaseLayout>
                <App />
              </BaseLayout>
            </ThemeProvider>
          </GlobalProvider>
        </ErrorBoundary>
      </BrowserRouter>
      </AuthProvider>
    </React.StrictMode>
  );
}
