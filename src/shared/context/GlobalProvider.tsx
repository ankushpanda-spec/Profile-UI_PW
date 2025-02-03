import {OmniContextProvider} from '@pw-tech/omni-context';
import {ThemeProvider} from '@pw-tech/omni-ui';
import React from 'react';
interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
  return (
    <ThemeProvider>
      <OmniContextProvider>{children}</OmniContextProvider>
    </ThemeProvider>
  );
};
