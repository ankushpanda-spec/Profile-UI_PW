import webSDK from '@/shared/services/sdk/webSDK';

const fetchUser = async () => {
  try {
    const response = webSDK.user;
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

export default fetchUser;
