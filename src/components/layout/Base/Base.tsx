import { fetchCohortConfig } from '@/api';
import { Container } from '@/components';
import { useScreen, useUser } from '@/context';
import { cohortSDK } from '@/integration';
import { useHeaderContext } from '@pw-tech/omni-context';
import { ReactNode, useCallback, useEffect, useState } from 'react';

const Base = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { isMobile } = useScreen();
  const { isBackActionEnabled, isCohortActionEnabled, onCohortActionClick, setCohortActionCallback, onBackActionClick } = useHeaderContext();

  // Initialize cohort SDK and callback
  useEffect(() => {
    const cohortConfig = fetchCohortConfig();

    const handleCohortActionClick = () => {
      setShowModal(true);
      onCohortActionClick && onCohortActionClick();
    };

    cohortSDK({
      goBack: () => setShowModal(false),
      handleRedirection: () => setShowModal(false),
    });

    setCohortActionCallback(() => handleCohortActionClick);

    // Clean up callback on unmount
    return () => setCohortActionCallback(() => { });
  }, [showModal, isBackActionEnabled, isCohortActionEnabled]);

  // Handler for side navbar toggle
  const toggleSidebar = useCallback(() => setShowSidebar(prev => !prev), []);

  return (
    <Container>{children}</Container>

  );
};

export default Base;
