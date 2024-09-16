import { OmniContextProvider } from '@pw-tech/omni-context';
import { ThemeProvider } from '@pw-tech/omni-ui';
import React from 'react';
import { UserProvider } from './GlobalContext';
interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <UserProvider>
        <OmniContextProvider>
          {children}
        </OmniContextProvider>
      </UserProvider>
    </ThemeProvider>
  );
};
