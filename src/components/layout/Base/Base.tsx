import { fetchCohortConfig } from '@/api';
import { AuthHeader, Container, SideNavbar } from '@/components';
import { useScreen, useUser } from '@/context';
import { cohortSDK } from '@/integration';
import { useHeaderContext } from '@pw-tech/omni-context';
import { Drawer, Modal } from '@pw-tech/omni-ui';
import { User } from '@pw-tech/web-sdk';
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
    <div className="flex h-screen">
      <Modal
        isOpen={showModal}
        showCloseIcon={false}
        closeOnOutsideClick={false}
        fullWidth
      >
        <div id="pw_auth-flow"></div>
      </Modal>

      {isMobile ? (
        <Drawer
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
          className="w-auto"
        >
          <SideNavbar onItemClick={() => setShowSidebar(false)} />
        </Drawer>
      ) : (
        <SideNavbar onItemClick={() => setShowSidebar(false)} />
      )}

      <div className="flex flex-grow flex-col">
        <AuthHeader
          menuActionConfig={{
            enable: true,
            callback: toggleSidebar,
          }}
          cohortActionConfig={{
            enable: isCohortActionEnabled,
            callback: isCohortActionEnabled ? onCohortActionClick : undefined,
            cohortData: fetchCohortConfig(),
          }}
          backActionConfig={{
            enable: isBackActionEnabled,
            callback: isBackActionEnabled ? onBackActionClick : undefined,
          }}
          userConfig={user as User}
        // onAppDownloadClick={() =>
        //   window.open(process.env.PUBLIC_MOBILE_APP_DOWNLOAD_REDIRECTION_LINK, '_blank')
        // }
        />

        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default Base;
