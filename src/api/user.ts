import {webSDK} from '@/auth';

export const fetchUser = async () => {
  try {
    const response = await webSDK.getUser();
    // setUser(response);
    return response;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};
