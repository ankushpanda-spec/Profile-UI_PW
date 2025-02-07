import {useContext} from 'react';
import {LoaderContext} from '@/shared/context/LoaderContext';

const useLoader = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error('useLoader must be used within a LoaderWrapper');
  }

  return {
    showLoader: context.showLoader,
    hideLoader: context.hideLoader,
  };
};
export default useLoader;
