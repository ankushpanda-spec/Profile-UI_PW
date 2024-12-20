// SnackbarWrapper.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Modal , ModalBody , Loader, ModalHeader, Typography, ModalFooter, Button} from '@pw-tech/omni-ui'; // Assuming you already have the Toast component


type ErrorContextType = {
  showError: (error:string) => void;
 
};

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

interface LoaderWrapperProps {
  children?: ReactNode;
}

const ErrorWrapper: React.FC<LoaderWrapperProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error , setError] = useState<string | null>(null);
  
  

  const showError = (error:string) => {
    setIsOpen(true);
    setError(error);
    
  };

 

  return (
    <ErrorContext.Provider value={{ showError}}>
      {children}
      {error && (
        <Modal size="extra-small" isOpen={isOpen} showCloseIcon={false}>
         <ModalHeader>
            <Typography variant="heading2" color="error" weight="semi-bold" component='div' className='w-full text-center'> Error</Typography>
         </ModalHeader>
        <ModalBody>
          <Typography>{error}</Typography>
        </ModalBody>
        <ModalFooter>
         <div className='flex justify-center mb-12'>
         <Button variant="lowFocus" size="tiny" onClick={() => setIsOpen(!isOpen)}>OK</Button>
         </div>
        </ModalFooter>
      </Modal>
      )}
    </ErrorContext.Provider>
  );
};

export default ErrorWrapper;
