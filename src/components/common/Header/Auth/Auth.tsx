import {useScreen} from '@/context';
import {Typography} from '@pw-tech/omni-ui';
import AvatarDropdown from '../../AvatarDropdown';
import {MobileAppStoreBadge} from '../../Badge';
import {BackButton, CohortButton, MenuButton} from '../../Button';
import {AuthHeaderProps} from '../Types';
import Auth from './Layout';

function Layout(props: AuthHeaderProps) {
  const {isMobile} = useScreen();
  const {
    onMenuClick,
    onCohortClick,
    onBackClick,
    onProfileClick,
    onAppDownloadClick,
    toggleCohortVisibility = true,
    user,
  } = props;

  return (
    <Auth
      menuAction={isMobile && <MenuButton onClick={onMenuClick} />}
      leftAction={
        toggleCohortVisibility ? (
          <CohortButton onClick={onCohortClick} />
        ) : (
          <BackButton onClick={onBackClick} />
        )
      }
      rightAction={
        <div className="flex items-center justify-end gap-24">
          <div className="hidden h-48 items-center gap-8 md:flex">
            <Typography
              variant="tiny"
              weight="medium"
              className="cursor-pointer"
              onClick={onAppDownloadClick}
            >
              Download App
            </Typography>
            <MobileAppStoreBadge onClick={onAppDownloadClick} />
          </div>
          <AvatarDropdown
            onClick={onProfileClick}
            userFirstName={user?.firstName}
          />
        </div>
      }
    />
  );
}

export default Layout;
