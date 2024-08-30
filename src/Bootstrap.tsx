import {ThemeProvider} from '@pw-tech/omni-ui';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ScreenProvider, UserProvider} from './context';
import ErrorBoundary from './ErrorBoundary';
import './index.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <ScreenProvider>
            <UserProvider>
              <App />
            </UserProvider>
          </ScreenProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
