import { ThemeProvider } from '@pw-tech/omni-ui';
import { WebCircuitProvider } from '@pw-tech/web-circuit';
import React from 'react';
import { ScreenProvider, UserProvider } from './GlobalContext';
interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <ScreenProvider>
        <UserProvider>
          <WebCircuitProvider>
            {children}
          </WebCircuitProvider>
        </UserProvider>
      </ScreenProvider>
    </ThemeProvider>
  );
};
