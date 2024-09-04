import {fetchCohortConfig} from '@/api';
import {AuthHeader, Container, SideNavbar} from '@/components';
import {useScreen, useUser} from '@/context';
import {cohortSDK} from '@/integration';
import {Drawer, Modal} from '@pw-tech/omni-ui';
import {User} from '@pw-tech/web-sdk';
import {ReactNode, useEffect, useState} from 'react';

const Base = ({children}: {children: ReactNode}) => {
  const {user} = useUser();
  const [modal, setModal] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const {isMobile} = useScreen();

  useEffect(() => {
    cohortSDK({
      goBack: () => setModal(false),
      handleRedirection: () => setModal(false),
    });
  }, [modal]);

  return (
    <div className="flex h-screen">
      <Modal
        isOpen={modal}
        showCloseIcon={false}
        closeOnOutsideClick={false}
        fullWidth
      >
        <div id="pw_auth-flow"></div>
      </Modal>
      {/* Side Navbar */}
      {isMobile ? (
        <Drawer
          open={sidebar}
          onClose={() => setSidebar(false)}
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
            callback: () => setSidebar(true),
          }}
          cohortActionConfig={{
            enable: true,
            callback: () => setModal(true),
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
          onProfileClick={() => alert('Clicking profile')}
        />

        {/* REMOTE CONTAINER */}
        <Container>{children}</Container>
      </div>
    </div>
  );
};

export default Base;
