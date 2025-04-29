import useLoader from '@/shared/hooks/showLoader';
import webSDK from '@/shared/services/sdk/webSDK';
import {lazy, useEffect, useRef, useState} from 'react';
import {updateUser, uploadFile} from '../api';
import {BoyAvatar, CameraIcon, GirlAvatar} from '../constants';
import s from '../styles/index.module.css';
import {Typography, useToast} from '@pw-tech/omni-ui';
import Learn2EarnBage from './Learn2EarnBage';
import {useUser} from '@pw-tech/omni-context';
import {UploadFileResponse} from '../types';
import getErrorMessage from '@/shared/services/showErrorService';
import {User} from '@pw-tech/web-sdk';

const UserAvatar = lazy(() => import('./UserAvatar'));
const ProfileDetails = lazy(() => import('./ProfileDetails'));

const ProfileContainer = () => {
  // Ref for the hidden file input

  const [userImg, setUserImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {user} = useUser();
  const {showLoader, hideLoader} = useLoader();
  const {toast} = useToast();

  useEffect(() => {
    if (user?.imageId) {
      setUserImg(user.imageId.baseUrl + user.imageId.key);
    } else if (user?.profileId?.gender) {
      if (user.profileId.gender === 'Male') {
        setUserImg(BoyAvatar);
      } else {
        setUserImg(GirlAvatar);
      }
    } else {
      setUserImg(BoyAvatar);
    }
  }, [user?.imageId, user?.profileId]);

  // Function to handle camera icon click
  const handleCameraIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };
  const {setUser} = useUser();
  // Function to handle file selection
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event?.target?.files[0];
      const type = selectedFile.type;
      if (
        type !== 'image/png' &&
        type !== 'image/jpg' &&
        type !== 'image/jpeg'
      ) {
        toast({
          message: 'Please select image file only',
          variant: 'error',
          anchorOrigin: {
            horizontal: 'center',
            vertical: 'top',
          },
        });
      } else {
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
          showLoader('Updating profile...');
          const fileResponse: UploadFileResponse = await uploadFile(formData);
          if (fileResponse) {
            // eslint-disable-next-line no-underscore-dangle
            const imageId = fileResponse.data?._id;
            try {
              const res = await updateUser({imageId});
              if (res) {
                const UserInfo = {...user, imageId: fileResponse.data};
                webSDK.setUser = UserInfo as User;
                setUser(UserInfo);
              }
            } catch (error) {
              const errorObj = getErrorMessage(error);
              toast({
                message: errorObj.message,
                variant: 'error',
                anchorOrigin: {
                  horizontal: 'center',
                  vertical: 'top',
                },
              });
            }
          }
        } catch (error) {
          const errorObj = getErrorMessage(error);
          toast({
            message: errorObj.message,
            variant: 'error',
            anchorOrigin: {
              horizontal: 'center',
              vertical: 'top',
            },
          });
        } finally {
          hideLoader();
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('No file selected');
    }
  };

  return (
    <div className={s.container}>
      <div className={s.containerChildOne}>
        <div className={s.containerChildOneWrapper}>
          <div className={s.wrapper}>
            <UserAvatar src={userImg || ''} className={s.userAvatarContainer} />
            <button
              onClick={handleCameraIconClick} // Handle camera icon click
              aria-label="Upload Avatar"
            >
              <img
                src={CameraIcon}
                className={s.cameraIcon}
                alt="Upload Avatar"
              />
            </button>
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{display: 'none'}}
              onChange={handleFileChange} // Handle file selection
            />
          </div>
          <Typography
            variant="subHeading"
            weight="semi-bold"
            color="static-black"
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </div>
        <Learn2EarnBage />
      </div>
      <div className={s.profileDetails}>
        <ProfileDetails />
      </div>
    </div>
  );
};

export default ProfileContainer;
