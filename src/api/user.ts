import {webSDK} from '@/integration/webSDK';
import {ApiClient} from '@pw-tech/web-sdk';
import {feedbackOverallApi , pdfDetialApi} from './constants';

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

function buildParams(params: Record<string, any>): URLSearchParams {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams;
}

export const getPdfDetails  = async (params: {
  type?: string;
  programId?: string;
  subjectId?: string;
  chapterId?: string;
  topicId?: string;
  page?: number;
}, contentId: string = '') => {
  
  try {
    const apiPath = pdfDetialApi;

    // Construct parameters
    const queryParams = buildParams({
      organizationId: process.env.PUBLIC_ORGANISATION_ID, 
      type: params.type || '',
      programId: params.programId,
      subjectId: params.subjectId,
      chapterId: params.chapterId,
      topicId: params.topicId || '',
      page: params.page,
      contentId,
    });

    // Full URL with query parameters
    const url = `${apiPath}?${queryParams.toString()}`;
    return ApiClient.get(url, {});
  } catch (error) {}
};