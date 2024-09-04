import {webSDK} from '@/integration/webSDK';

export const fetchUser = async () => {
  try {
    const response = webSDK.user;
    return response;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};
