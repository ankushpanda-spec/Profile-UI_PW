import React, { createContext, ReactNode, useContext, useState } from 'react';

/**
 * Type definition for the user object.
 */
type User = Record<string, any>;

/**
 * Defines the shape of the UserContext.
 * @property {User | null} user - The current user object, or null if no user is set.
 * @property {(user: User | null) => void} setUser - Function to manually set or update the user data.
 */
interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
}

/**
 * Creates the UserContext with a default value of `undefined`.
 * This context will be used to store and manage the current user state and the setUser function.
 */
const UserContext = createContext<UserContextType | undefined>(undefined);

/**
 * Custom hook to provide easy access to the UserContext.
 * This hook ensures that it can only be used within the UserProvider.
 * @returns {UserContextType} - The user context value containing the user and the setUser function.
 * @throws {Error} - If the hook is used outside of a UserProvider.
 */
export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('OMNI CONEXT: useUser must be used within a UserProvider');
    }
    return context;
};

/**
 * Props interface for the UserProvider component.
 * @property {ReactNode} children - The child components that will have access to the UserContext.
 */
interface UserProviderProps {
    children: ReactNode;
}

/**
 * UserProvider component to wrap around parts of the app that need access to the user state.
 * It provides the user object and setUser function to the component tree.
 * 
 * @param {UserProviderProps} props - The properties for the UserProvider component.
 * @returns {JSX.Element} - The UserContext provider wrapping its children.
 */
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    // State for storing the user object, initialized as null
    const [user, setUserState] = useState<User | null>(null);

    /**
     * Sets or updates the user state.
     * 
     * @param {User} newUser - The user data to set or update.
     */
    const setUser = (newUser: User | null) => {
        setUserState(newUser);
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};