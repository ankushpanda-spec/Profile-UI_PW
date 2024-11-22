import { CameraIcon } from '@/assets/images';
import { lazy } from 'react';
import s from "./index.module.css";
import { Link } from 'react-router-dom';
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
        <Link to="/pdf-viewer/testing-all-actions-009825">Open PDF</Link>
      </div>
    </div>
  );
};

export default ProfileContainer;
