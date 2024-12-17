// SnackbarWrapper.tsx
import React, { createContext, useState, ReactNode } from 'react';
import { Modal , ModalBody , Loader} from '@pw-tech/omni-ui'; // Assuming you already have the Toast component


type LoaderContextType = {
  showLoader: (primaryMessage:string , secondaryMessage?:string) => void;
  hideLoader: () => void;
};

export const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

interface LoaderWrapperProps {
  children?: ReactNode;
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [primaryMessage, setPrimaryMessage] = useState<string | null>(null);
  const [secondaryMessage, setSecondaryMessage] = useState<string>();
  

  const showLoader = (primaryMessage: string, secondaryMessage?:string) => {
    setIsOpen(true);
    setPrimaryMessage(primaryMessage);
    setSecondaryMessage(secondaryMessage);
  };

  const hideLoader = () => {
    setIsOpen(false);
    setPrimaryMessage('');
    setSecondaryMessage('');
  }

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}
      {primaryMessage && (
        <Modal size="extra-small" isOpen={isOpen} showCloseIcon={false}>
        <ModalBody>
        <div className='flex flex-wrap mx-2 overflow-hidden justify-center items-center my-2 px-2'>
        <Loader size="medium"/>
        <div className='my-2 px-2 w-full overflow-hidden text-center'>
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
