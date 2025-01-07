// SnackbarWrapper.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Modal , ModalBody , Loader} from '@pw-tech/omni-ui'; // Assuming you already have the Toast component
import { LoaderContextType, LoaderWrapperProps } from './types';
import s from "./styles/index.module.css"

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);
const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [primaryMessage, setPrimaryMessage] = useState<string | null>(null);

  const showLoader = (primaryMessage: string) => {
    setIsOpen(true);
    setPrimaryMessage(primaryMessage);
  };

  const hideLoader = () => {
    setIsOpen(false);
    setPrimaryMessage('');
  }

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {primaryMessage && (
        <Modal size="extra-small" isOpen={isOpen} showCloseIcon={false}>
        <ModalBody>
        <div className={s.loader}>
        <Loader size="medium"/>
        <div className={s.primaryMessage}>
        {primaryMessage}
        </div>
        </div>
        </ModalBody>
      </Modal>
      )}
    </LoaderContext.Provider>
  );
};

export default LoaderWrapper;
