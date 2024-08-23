import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './ErrorBoundary';
import { Button, ThemeProvider } from '@pw-tech/omni-ui';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <ThemeProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
      </ThemeProvider>
    </React.StrictMode>
  );
}
