import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from '@pw-tech/omni-ui';
import {useEffect, useState} from 'react';
import {AuthHeader, SideNavbar} from './components';
import {useUser} from './context';

const App = () => {
  const {getUser, user} = useUser();
  useEffect(() => {
    console.log(getUser());
    console.log(process.env.PUBLIC_NAME);
    console.log(import.meta.env.PUBLIC_NAME);
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-end">
      <SideNavbar />
      <AuthHeader
        onAppDownloadClick={() => alert('Downloading app')}
        onBackClick={() => alert('Going Back')}
        onCohortClick={() => setOpen(true)}
        onMenuClick={() => alert('Clicking Menu')}
        // onProfileClick={() => alert('Clicking Profile')}
        toggleCohortVisibility={true}
        user={user || {}}
      />
      <Drawer
        // closeOnOutsideClick
        onClose={() => setOpen(false)}
        screenPosition="right"
        showCloseIcon
        variant="overlay"
        open={open}
      >
        <DrawerHeader>Header</DrawerHeader>
        <DrawerBody>
          <div className="flex flex-col gap-6">
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled.
            </div>
            <div className="flex flex-col gap-6" />
          </div>
        </DrawerBody>
        <DrawerFooter>
          <div className="flex flex-row justify-between gap-12">
            <Button fullWidth variant="secondary">
              Cancel
            </Button>
            <Button fullWidth>Submit</Button>
          </div>
        </DrawerFooter>
      </Drawer>
    </div>
  );
};

export default App;
