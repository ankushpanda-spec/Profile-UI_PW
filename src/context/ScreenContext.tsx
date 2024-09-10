import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

// Define the types for the context state
interface ScreenSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isUltraScreen: boolean;
  width: number,
  height: number
}

// Define the type for the provider's props
interface ScreenProviderProps {
  children: ReactNode;
}

// Create the context with a default value
const ScreenContext = createContext<ScreenSize | undefined>(undefined);

export const ScreenProvider = ({ children }: ScreenProviderProps) => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isUltraScreen: false,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    let debounceTimeout: string | number | NodeJS.Timeout | undefined;

    const updateScreenSize = () => {
      const tag = document.getElementById('pw-container');
      const width = tag?.offsetWidth || 0;
      const height = tag?.offsetHeight || 0;
      const sidenavWidth = 240;
      const finalWidth = width - sidenavWidth;

      setScreenSize({
        isMobile: finalWidth < 480,
        isTablet: finalWidth >= 480 && finalWidth < 1024,
        isDesktop: finalWidth >= 1024 && finalWidth < 1440,
        isUltraScreen: finalWidth >= 1440,
        width: finalWidth,
        height: height,
      });
    };

    const debouncedUpdate = () => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(updateScreenSize, 50); // Debounce delay of 50ms
    };

    updateScreenSize(); // Set the initial value
    window.addEventListener('resize', debouncedUpdate);

    return () => {
      window.removeEventListener('resize', debouncedUpdate);
      clearTimeout(debounceTimeout); // Clean up the timeout
    };
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
