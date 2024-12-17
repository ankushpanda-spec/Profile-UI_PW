// SnackbarWrapper.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Toast } from '@pw-tech/omni-ui'; // Assuming you already have the Toast component

type ToastVariant = "info" | "success" | "error";

type SnackbarContextType = {
  showSnackbar: (message: string, duration?: number, variant?: ToastVariant) => void;
};

export const SnackbarContext = createContext<SnackbarContextType | undefined>(undefined);

interface SnackbarWrapperProps {
  children?: ReactNode;
}

const SnackbarWrapper: React.FC<SnackbarWrapperProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(3000); // Default to 3000ms
  const [variant, setVariant] = useState<ToastVariant>("info"); // Default to "info"

  const showSnackbar = (message: string, duration: number = 2000, variant: ToastVariant = "info") => {
    setMessage(message);
    setDuration(duration);
    setVariant(variant);
    setIsOpen(true); // Show snackbar when called
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {message && (
        <Toast
          message={message}
          autoHideDuration={duration}
          open={isOpen}
          variant={variant} // Pass the variant to Toast
          onClose={() => setIsOpen(false)} // Close snackbar on close
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'top'
          }}
        />
      )}
    </SnackbarContext.Provider>
  );
};

export default SnackbarWrapper;
