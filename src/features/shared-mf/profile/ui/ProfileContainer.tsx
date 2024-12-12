import { CameraIcon } from '@/assets/images';
import {BoyAvatar} from '@/assets/images';
import { GirlAvatar } from '@/assets/images';
import { lazy, useRef } from 'react';
import s from "../styles/index.module.css";
import localStorageService from '../services/localStorageService';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchUser } from '@/api';
import { fetchFile } from '../api';
import SnackBar from './components/snack-bar/SnackBar';

const UserAvatar = lazy(() => import('./UserAvatar'));
const ProfileDetails = lazy(() => import('./ProfileDetails'));

const ProfileContainer = () => {
  // Ref for the hidden file input
  const [userImg, setUserImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = (() => {
    const userData = localStorageService.get("user");
    try {
      return userData ? JSON.parse(userData) : null; // Parse the stored string into an object
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return null; // Return null if parsing fails
    }
  })();

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
  }, [user]);

  // Function to handle camera icon click
  const handleCameraIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  // Function to handle file selection
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      console.log("Selected file:", selectedFile);
  
      // Create a FormData object
      const formData = new FormData();
      formData.append('file', selectedFile);

      console.log("checking here", formData)
  
      try {
        // Call fetchFile with the FormData object
        const fileResponse = await fetchFile(selectedFile);
        console.log("File uploaded successfully:", fileResponse);
  
        // Extract imageId from the response (if applicable)
        // const imageId = fileResponse?.data?.imageId;
        // if (imageId) {
        //   // Call fetchUser with the new imageId
        //   await fetchUser({ imageId });
        //   setUserImg(imageId.baseUrl + imageId.key); // Update the user image locally
        // }
      } catch (error) {
        console.error("Error uploading file or updating user:", error);
      } finally {
        // Optional: handle loader state here
      }
    } else {
      console.log("No file selected");
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
            style={{ display: 'none' }}
            onChange={handleFileChange} // Handle file selection
          />
        </div>
      </div>
      <div className={s.profileDetails}>
        <ProfileDetails />
      </div>
      <SnackBar/>
    </div>
  );
};

export default ProfileContainer;
