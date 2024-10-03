import {useScreen} from '@pw-tech/omni-context';
import {Typography} from '@pw-tech/omni-ui';
import AvatarDropdown from '../../Avatar/AvatarDropdown';
import {MobileAppStoreBadge} from '../../Badge';
import {BackButton, CohortButton, MenuButton} from '../../Button';
import {AuthHeaderProps} from '../Types';
import Auth from './Layout';

function Layout(props: AuthHeaderProps) {
  const {isMobile} = useScreen();
  const {
    menuActionConfig,
    cohortActionConfig,
    backActionConfig,
    onAppDownloadClick,
    userConfig,
    onProfileClick,
  } = props;

  const {enable: menuEnable = true, callback: onMenuClick} = menuActionConfig;
  const {
    enable: cohortEnable,
    callback: onCohortClick,
    cohortData,
  } = cohortActionConfig;
  const {enable: backEnable, callback: onBackClick} = backActionConfig;

  return (
    <Auth
      menuAction={
        isMobile && menuEnable && <MenuButton onClick={onMenuClick} />
      }
      leftAction={
        <>
          {backEnable && <BackButton onClick={onBackClick} />}
          {cohortEnable && (
            <CohortButton onClick={onCohortClick} iconSrc={cohortData?.webIcon}>
              {cohortData?.name || 'Select'}
            </CohortButton>
          )}
        </>
      }
      rightAction={
        <div className="flex items-center justify-end gap-24">
          {onAppDownloadClick && (
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
          )}
          <AvatarDropdown
            onClick={onProfileClick}
            userFirstName={userConfig?.firstName}
          />
        </div>
      }
    />
  );
}

export default Layout;
