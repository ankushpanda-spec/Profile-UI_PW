import {ThemeProvider} from '@pw-tech/omni-ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BaseLayout} from './components';
import {GlobalProvider} from './context';
import ErrorBoundary from './ErrorBoundary';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <BrowserRouter  basename="/study-v2">
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
    </React.StrictMode>
  );
}
