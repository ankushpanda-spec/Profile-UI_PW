import React from 'react';
import {AuthProvider, HeaderProvider, ScreenProvider} from '.';
import {UserProvider} from './user';

interface GlobalProviderProps {
  children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({children}) => {
  return (
    <AuthProvider>
      <HeaderProvider>
        <ScreenProvider>
          <UserProvider>{children}</UserProvider>
        </ScreenProvider>
      </HeaderProvider>
    </AuthProvider>
  );
};
