import {ChevronDownFilled} from '@/assets/icons';
import {Skeleton, Typography} from '@pw-tech/omni-ui';
import Avatar from '../Avatar/Avatar';
import {AvatarDropdownProps} from '../Header/Types';

function AvatarDropdown({userFirstName, ...props}: AvatarDropdownProps) {
  return (
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
        <ChevronDownFilled className="size-16" />
      </div>
    </button>
  );
}

export default AvatarDropdown;
