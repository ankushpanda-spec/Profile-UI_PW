import {useContext} from 'react';
import {ErrorContext} from '@/shared/context/ErrorContext';

const useError = () => {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error('useError must be used within a LoaderWrapper');
  }

  return context.showError;
};
export default useError;
