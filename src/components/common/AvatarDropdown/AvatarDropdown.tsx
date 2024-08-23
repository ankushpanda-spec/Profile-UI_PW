import {ChevronDownFilled} from '@/assets/icons';
import {Typography} from '@pw-tech/omni-ui';
import Avatar from '../Avatar/Avatar';

function AvatarDropdown(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="flex h-48 items-center gap-12" {...props}>
      <Typography variant="small" weight="semi-bold">
        Hi, Ravi
      </Typography>
      <div className="flex items-center gap-4">
        <Avatar />
        <ChevronDownFilled className="size-16" />
      </div>
    </button>
  );
}

export default AvatarDropdown;
