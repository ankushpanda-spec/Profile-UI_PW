import {webSDK} from '@/integration/webSDK';
import {ApiClient} from '@pw-tech/web-sdk';

const feedbackOverallApi = '/v1/doubts/subject-matter-expert/feedback-overall';

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
