import {ChevronDownFilled} from '@/assets/icons';
import {Typography} from '@pw-tech/omni-ui';
import Avatar from '../Avatar/Avatar';
import {AvatarDropdownProps} from '../Header/Types';

function AvatarDropdown({userFirstName, ...props}: AvatarDropdownProps) {
  return (
    <button
      className="flex h-40 items-center md:gap-8 lg:h-48 lg:gap-12"
      {...props}
    >
      <Typography
        variant="small"
        weight="semi-bold"
        className="hidden md:block"
      >
        Hi, {userFirstName || 'User'}
      </Typography>
      <div className="flex items-center gap-2 lg:gap-4">
        <Avatar className="size-32 md:size-40" />
        <ChevronDownFilled className="size-16" />
      </div>
    </button>
  );
}

export default AvatarDropdown;
