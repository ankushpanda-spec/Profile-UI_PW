// UserContext.tsx
import {fetchUser} from '@/api';
import React, {createContext, useContext, useEffect, useState} from 'react';

// Define the shape of the user object
type User = Record<string, any>;

// Define the context value type
interface UserContextType {
  user: User | null;
  getUser: () => User | null;
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      try {
        const response = await fetchUser();
        setUser(response);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchAndSetUser();
  }, []);

  // Define the method to get the user
  const getUser = () => {
    return user;
  };

  return (
    <UserContext.Provider value={{user, getUser}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
