import {createContext, ReactNode, useContext, useEffect, useState} from 'react';

// Define the types for the context state
interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
}

// Define the type for the provider's props
interface ScreenProviderProps {
  children: ReactNode;
}

// Create the context with a default value
const ScreenContext = createContext<ScreenSize | undefined>(undefined);

export const ScreenProvider = ({children}: ScreenProviderProps) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
  });

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 480,
        isTablet: width >= 480 && width < 1024,
        isLaptop: width >= 1024,
      });
    };

    updateScreenSize(); // Set the initial value
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  return (
    <ScreenContext.Provider value={screenSize}>
      {children}
    </ScreenContext.Provider>
  );
};

// Custom hook to use the screen context
export const useScreen = (): ScreenSize => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error('useScreen must be used within a ScreenProvider');
  }
  return context;
};
