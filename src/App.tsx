import {Typography} from '@pw-tech/omni-ui';
import {
  AuthHeader,
  AvatarDropdown,
  BackButton,
  CohortButton,
  MenuButton,
  MobileAppStoreBadge,
} from './components';
import {useScreen} from './context';

const App = () => {
  const {isMobile} = useScreen();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-20">
      <AuthHeader
        menuAction={isMobile && <MenuButton />}
        leftAction={true ? <CohortButton /> : <BackButton />}
        rightAction={
          <div className="flex items-center justify-end gap-24">
            <div className="hidden h-48 items-center gap-8 md:flex">
              <Typography variant="tiny" weight="medium">
                Download App
              </Typography>
              <MobileAppStoreBadge />
            </div>
            <AvatarDropdown />
          </div>
        }
      />
      <AuthHeader
        menuAction={isMobile && <MenuButton />}
        leftAction={false ? <CohortButton /> : <BackButton />}
        rightAction={
          <div className="flex items-center justify-end gap-24">
            <div className="hidden h-48 items-center gap-8 md:flex">
              <Typography variant="tiny" weight="medium">
                Download App
              </Typography>
              <MobileAppStoreBadge />
            </div>
            <AvatarDropdown />
          </div>
        }
      />
    </div>
  );
};

export default App;
