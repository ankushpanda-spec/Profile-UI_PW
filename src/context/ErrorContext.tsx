// SnackbarWrapper.tsx
import React, { createContext, useState} from 'react';
import { Modal , ModalBody, ModalHeader, Typography, ModalFooter, Button} from '@pw-tech/omni-ui'; // Assuming you already have the Toast component
import { ErrorContextType, ErrorWrapperProps } from './types';
import s from "./styles/index.module.css"

export const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

const ErrorWrapper: React.FC<ErrorWrapperProps> = ({ children }) => {
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
            <Typography variant="heading2" color="error" weight="semi-bold" component='div' className={s.textError}> Error</Typography>
         </ModalHeader>
        <ModalBody>
          <Typography>{error}</Typography>
        </ModalBody>
        <ModalFooter>
         <div className={s.button}>
         <Button variant="lowFocus" size="tiny" onClick={() => setIsOpen(!isOpen)}>OK</Button>
         </div>
        </ModalFooter>
      </Modal>
      )}
    </ErrorContext.Provider>
  );
};

export default ErrorWrapper;
