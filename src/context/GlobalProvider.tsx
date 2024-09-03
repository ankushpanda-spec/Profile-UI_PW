import React from 'react';
import {ScreenProvider, UserProvider} from './GlobalContext';
interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
  return (
    <ScreenProvider>
      <UserProvider>{children}</UserProvider>
    </ScreenProvider>
  );
};
