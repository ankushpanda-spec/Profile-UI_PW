import {webSDK} from '@/shared/services/sdk/webSDK';
import {ApiClient} from '@pw-tech/web-sdk';
import {feedbackOverallApi} from './constants';

export const fetchUser = async () => {
  try {
    const response = webSDK.user;
    return response;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
};

