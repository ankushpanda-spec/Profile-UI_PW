import { ArrowRightStartOnRect, BriefCase, ChevronDownFilled, User } from '@/assets/icons';
import { Skeleton, Typography } from '@pw-tech/omni-ui';
import Avatar from '../Avatar/Avatar';
import { AvatarDropdownProps } from '../Header/Types';
import './index.css';
import AvatarPopover from './Popover';

function AvatarDropdown({ userFirstName, ...props }: AvatarDropdownProps) {
  const options = [
    {
      label: 'My Profile',
      icon: <User className="size-24" />,
      href:"/profile",
    },
    {
      label: 'My Purchases',
      icon: <BriefCase className="size-24" />,
      href:"/my-purchase",
    },
    {
      label: 'Logout',
      icon: <ArrowRightStartOnRect className="size-24" />,
      style: {
        borderTop: '1px #dcdcdc solid',
      },
      href:"/logout",
    },
  ];
  return (
    <AvatarPopover options={options}>
      <button
        className="flex h-40 items-center gap-6 md:gap-8 lg:h-48 lg:gap-12"
        {...props}
      >
        {userFirstName ? (
          <Typography
            variant="small"
            weight="semi-bold"
            className="hidden md:block"
          >
            Hi, {userFirstName}
          </Typography>
        ) : (
          <Skeleton animate className="h-10 w-[70px]" />
        )}
        <div className="flex items-center gap-2 lg:gap-4">
          <Avatar className="size-32 md:size-40" />
          <ChevronDownFilled className="size-24" />
        </div>
      </button>
    </AvatarPopover>
  );
}

export default AvatarDropdown
