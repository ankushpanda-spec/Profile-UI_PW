import {fetchCohortConfig} from '@/api';
import {AuthHeader, SideNavbar} from '@/components';
import {useScreen, useUser} from '@/context';
import {cohortSDK} from '@/integration';
import {Modal} from '@pw-tech/omni-ui';
import {User} from '@pw-tech/web-sdk';
import {ReactNode, useEffect, useState} from 'react';

const Base = ({children}: {children: ReactNode}) => {
  const {user} = useUser();
  const [modal, setModal] = useState(false);
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
        <div id="pw_auth_flow"></div>
      </Modal>

      {/* Side Navbar */}
      {!isMobile && <SideNavbar />}

      <div className="flex flex-grow flex-col">
        {/* Header */}
        <AuthHeader
          menuActionConfig={{
            enable: true,
            callback: () => alert('Menu button Clicked'),
          }}
          cohortActionConfig={{
            enable: true,
            callback: () => setModal(true),
            cohortData: fetchCohortConfig(),
          }}
          backActionConfig={{
            enable: true,
            callback: () => alert('Cohort button Clicked'),
          }}
          userConfig={user as User}
          onAppDownloadClick={() => alert('Downloading App!!')}
          onProfileClick={() => alert('Clicking profile')}
        />

        {/* Main Content Area */}
        <div className="flex-grow overflow-auto p-4">{children}</div>
      </div>
    </div>
  );
};

export default Base;
