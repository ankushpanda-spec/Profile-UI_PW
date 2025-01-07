import {lazy, useRef} from 'react';
import s from '../styles/index.module.css';
import {useEffect} from 'react';
import {useState} from 'react';
import {updateUser, uploadFile} from '../api';
import {useSnackbar} from '@/hooks/showSnackBar';
import {webSDK} from '@/integration/webSDK';
import {useLoader} from '@/hooks/showLoader';
import getErrorMessage from '../services/showErrorService';
import { BoyAvatar, CameraIcon, GirlAvatar } from '../constants';

const UserAvatar = lazy(() => import('./UserAvatar'));
const ProfileDetails = lazy(() => import('./ProfileDetails'));

const ProfileContainer = () => {
  // Ref for the hidden file input

  const [userImg, setUserImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const showSnackBar = useSnackbar();
  const user:any = webSDK.user;
  const {showLoader, hideLoader} = useLoader();
  
  useEffect(() => {
    if (user?.imageId) {
      setUserImg(user.imageId.baseUrl + user.imageId.key);
    } else if (user?.profileId) {
      if (user.profileId.gender === 'Male') {
        setUserImg(BoyAvatar);
      } else {
        setUserImg(GirlAvatar);
      }
    } else {
      setUserImg(null); // Default to null if no conditions are met
    }
  }, [user?.imageId , user?.profileId]);
  
  // Function to handle camera icon click
  const handleCameraIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  // Function to handle file selection
  const handleFileChange = async (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event?.target?.files[0];
      const type = selectedFile.type;
      if (
        type !== 'image/png' &&
        type !== 'image/jpg' &&
        type !== 'image/jpeg'
      ) {
        showSnackBar('Please select image file only');
        return;
      } else {
        const formData = new FormData();
        formData.append('file', selectedFile);
        try {
          showLoader('Updating profile...');
          const fileResponse: any = await uploadFile(formData);
          if (fileResponse) {
            const imageId = fileResponse.data?._id;
            try {
              const res = await updateUser({imageId: imageId});
              if (res) {
                const _UserInfo = {...user , imageId:fileResponse.data}
                webSDK.setUser = _UserInfo;
              }
            } catch (error) {
              const errorObj = getErrorMessage(error);
              showSnackBar(errorObj.message);  
            }

          }
        } catch (error) {
          const errorObj = getErrorMessage(error);
          showSnackBar(errorObj.message);
        } finally {
          hideLoader();
        }
      }
    } else {
      console.log('No file selected');
      return;
    }
  };

  return (
    <div className={s.container}>
      <div className={s.containerChildOne}>
        <div className={s.wrapper}>
          <UserAvatar src={userImg} className={s.userAvatarContainer} />
          <img
            src={CameraIcon}
            className={s.cameraIcon}
            alt="Upload Avatar"
            onClick={handleCameraIconClick} // Handle camera icon click
          />
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{display: 'none'}}
            onChange={handleFileChange} // Handle file selection
          />
        </div>
      </div>
      <div className={s.profileDetails}>
        <ProfileDetails/>
      </div>
    </div>
  );
};

export default ProfileContainer;
