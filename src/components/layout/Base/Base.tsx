import { fetchCohortConfig } from '@/api';
import { AuthHeader, Container, SideNavbar } from '@/components';
import { useScreen, useUser } from '@/context';
import { cohortSDK } from '@/integration';
import { Drawer, Modal } from '@pw-tech/omni-ui';
import { User } from '@pw-tech/web-sdk';
import { ReactNode, useEffect, useState } from 'react';

const Base = ({children}: {children: ReactNode}) => {
  const {user} = useUser();
  const [showModal, setShowModal] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const {isMobile, width} = useScreen();

  useEffect(() => {
    cohortSDK({
      goBack: () => setShowModal(false),
      handleRedirection: () => setShowModal(false),
    });
  }, [showModal]);

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
      {/* Side Navbar */}
      {isMobile ? (
        <Drawer
          open={showSidebar}
          onClose={() => setShowSidebar(false)}
          className="w-auto"
        >
          <SideNavbar />
        </Drawer>
      ) : (
        <SideNavbar />
      )}

      <div className="flex flex-grow flex-col">
        {/* Header */}
        <AuthHeader
          menuActionConfig={{
            enable: true,
            callback: () => setShowSidebar(true),
          }}
          cohortActionConfig={{
            enable: true,
            callback: () => setShowModal(true),
            cohortData: fetchCohortConfig(),
          }}
          backActionConfig={{
            enable: false,
            callback: () => alert('Cohort button Clicked'),
          }}
          userConfig={user as User}
          onAppDownloadClick={() =>
            window.open(
              process.env.PUBLIC_MOBILE_APP_DOWNLOAD_REDIRECTION_LINK,
              '_blank'
            )
          }
          // onProfileClick={() => alert('Clicking profile')}
        />

        {/* REMOTE CONTAINER */}
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default Base;
