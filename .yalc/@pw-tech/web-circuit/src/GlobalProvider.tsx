import React from 'react';
import { AuthProvider, HeaderProvider } from '.';

interface GlobalProviderProps {
    children: React.ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    return (
        <AuthProvider>
            <HeaderProvider>
                {children}
            </HeaderProvider>
        </AuthProvider>

    );
};
