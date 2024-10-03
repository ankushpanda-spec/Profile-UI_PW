import {CameraIcon} from '@/assets/images';
import {lazy} from 'react';

const UserAvatar = lazy(() => import('./UserAvatar'));
const ProfileDetails = lazy(() => import('./ProfileDetails'));

const ProfileContainer = () => {
  return (
    <div className="grid grid-cols-8 p-5 lg:gap-4 lg:p-10">
      <div className="col-span-8 lg:col-span-2">
        <div className="relative flex w-full items-center justify-center object-contain">
          <UserAvatar className="w-8/12 rounded-full object-contain" />
          <img
            src={CameraIcon}
            className="absolute bottom-0 right-12 cursor-pointer"
          />
        </div>
      </div>
      <div className="col-span-8 lg:col-span-6">
        <ProfileDetails />
      </div>
    </div>
  );
};

export default ProfileContainer;
