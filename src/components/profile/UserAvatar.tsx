import {BoyAvatar} from '@/assets/images';
const UserAvatar = ({
  height,
  width,
  className,
}: {
  height?: number;
  width?: number;
  className?: string;
}) => {
  return (
    <img src={BoyAvatar} height={height} width={width} className={className} />
  );
};

export default UserAvatar;
