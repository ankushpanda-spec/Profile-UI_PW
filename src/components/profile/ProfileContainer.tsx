import { CameraIcon } from '@/assets/images';
import { lazy } from 'react';
import s from "./index.module.css";
const UserAvatar = lazy(() => import('./UserAvatar'));
const ProfileDetails = lazy(() => import('./ProfileDetails'));

const ProfileContainer = () => {
  return (
    <div className={s.container}>
      <div className={s.containerChildOne}>
        <div className={s.wrapper}>
          <UserAvatar className={s.userAvatarContainer} />
          <img
            src={CameraIcon}
            className={s.cameraIcon}
          />
        </div>
      </div>
      <div className={s.profileDetails}>
        <ProfileDetails />
      </div>
    </div>
  );
};

export default ProfileContainer;
