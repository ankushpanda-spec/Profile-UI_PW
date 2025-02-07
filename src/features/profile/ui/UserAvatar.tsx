import {BoyAvatar} from '../constants';
import {UserAvatarProps} from '../types';

const UserAvatar: React.FC<UserAvatarProps> = ({
  src = BoyAvatar,
  height,
  width,
  className,
}) => {
  return (
    <img
      src={src || BoyAvatar}
      height={height}
      width={width}
      className={className}
      alt="User Avatar"
    />
  );
};

export default UserAvatar;
