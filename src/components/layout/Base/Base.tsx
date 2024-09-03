import {AuthHeader, SideNavbar} from '@/components';
import {useScreen, useUser} from '@/context';
import {Modal} from '@pw-tech/omni-ui';
import {useEffect, useState} from 'react';

const Base = () => {
  const {user} = useUser();
  const [modal, setModal] = useState(false);
  const {isMobile} = useScreen();
  const checkInitApp = () => {
    if (window?.initPWAuthWebSDK) {
      const propConfig = {
        flow: 'cohort',
        webSDK: window?.PWWebSDK,
        renderType: 'page',
        handleRelativeRedirection: async () => {
          await setModal(false);
        },
        goBack: () => {
          setModal(false);
        },
      };
      window?.initPWAuthWebSDK(propConfig);
    }
  };

  useEffect(() => {
    checkInitApp();
  }, [modal]);

  return (
    <div className="flex justify-end">
      {!isMobile && <SideNavbar />}
      <AuthHeader
        onAppDownloadClick={() => alert('Downloading app')}
        onBackClick={() => alert('Going Back')}
        onCohortClick={() => setModal(true)}
        onMenuClick={() => alert('Clicking Menu')}
        onProfileClick={() => alert('Clicking Profile')}
        toggleCohortVisibility={true}
        user={user || {}}
      />
      <Modal
        isOpen={modal}
        showCloseIcon={false}
        closeOnOutsideClick={false}
        fullWidth
      >
        <div id="pw_auth_flow"></div>
      </Modal>
    </div>
  );
};

export default Base;
