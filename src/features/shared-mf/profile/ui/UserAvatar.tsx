import { BoyAvatar } from '@/assets/images';

const UserAvatar = ({
  src = BoyAvatar,
  height,
  width,
  className,
}: {
  src?: string;
  height?: number;
  width?: number;
  className?: string;
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
