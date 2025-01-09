import {webSDK} from '@/integration/webSDK';
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

export const learn2earnData = async () => {
  try {
  } catch (error) {}
};

export const doubtSolvingFeedbackData = async () => {
  try {
    return ApiClient.get(feedbackOverallApi, {});
  } catch (error) {}
};

