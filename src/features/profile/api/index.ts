import {
  feedbackOverallApi,
  getCitiesApi,
  getIsEligible,
  getOtp,
  getStatesApi,
  setFile,
  setUser,
  verifyOtpUrl,
} from './constants';
import {ApiClient} from '@pw-tech/web-sdk';
import {getUtcStartEndTime} from '../lib';
import {
  ApiResponse,
  doubtSolvingFeedbackDataResponse,
  FetchCitiesResponse,
  fetchLevelUpDataResponse,
  FetchStatesResponse,
  GetLearn2EarnConfigResponse,
  GetUpdateNumberConfigResponse,
  UploadFileResponse,
} from '../types';
import {User} from '@pw-tech/omni-context/dist/context/user';

export const fetchStates = async (country: string) => {
  const url = getStatesApi(country);
  const res = await ApiClient.get<FetchStatesResponse>(url, {});
  return res.data;
};

export const fetchCities = async (country: string, state: string) => {
  const url = getCitiesApi(country, state);
  const res = await ApiClient.get<FetchCitiesResponse>(url, {});
  return res.data;
};

export const fetchUpdateNumberConfig = async () => {
  const url = getIsEligible();
  const data = await ApiClient.get<GetUpdateNumberConfigResponse>(url, {});
  return data;
};
export const fetchOtp = async (payload: {
  countryCode: string;
  isNewNumber: boolean;
  organizationId: string;
  phone: string;
  requestId: string;
}): Promise<ApiResponse> => {
  const url = getOtp();
  const data = await ApiClient.post<ApiResponse>(url, payload);
  return data;
};
export const verifyOtp = async (payload: {
  countryCode: string;
  isNewNumber: boolean;
  organizationId: string;
  phone: string;
  otp: string;
  requestId: string;
}): Promise<ApiResponse> => {
  const url = verifyOtpUrl();
  const data = await ApiClient.post<ApiResponse>(url, payload);
  return data;
};

export const uploadFile = async (payload: FormData) => {
  const url = setFile();
  const data = await ApiClient.postMultipart<UploadFileResponse>(url, payload, {
    headers: {
      'Content-Type': null,
    },
  });
  return data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUser = async (payload: any) => {
  const url = setUser();
  const data = await ApiClient.put<User>(url, payload);
  return data;
};

const getLearn2EarnConfig = async (cohortId: string) => {
  const url = `engagement/learn-to-earn/config/${cohortId}`;
  const response = await ApiClient.get<GetLearn2EarnConfigResponse>(url, {});
  return response.data;
};

const fetchLevelUpData = async (cohortId: string) => {
  const configData = await getLearn2EarnConfig(cohortId);
  const startDate = configData?.leaderboardUpdateNextDate
    ? new Date(configData.leaderboardUpdateNextDate)
    : new Date();
  startDate.setDate(
    startDate.getDate() -
      ((configData?.featureDetails?.LEADERBOARD_UPDATE_DAYS ?? 0) - 1)
  );
  const endDate = configData?.leaderboardUpdateNextDate
    ? new Date(configData.leaderboardUpdateNextDate)
    : new Date();
  const {utcStartDate, utcEndDate} = getUtcStartEndTime(startDate, endDate);

  const url = `engagement/learn-to-earn/profile-data/${cohortId}?startDate=${utcStartDate}&endDate=${utcEndDate}`;
  const response = await ApiClient.get<fetchLevelUpDataResponse>(url, {});
  return response.data;
};

export const doubtSolvingFeedbackData = async () => {
  const data = await ApiClient.get<doubtSolvingFeedbackDataResponse>(
    feedbackOverallApi,
    {}
  );
  return data;
};

export const learn2earnData = async (cohortId: string) => {
  return fetchLevelUpData(cohortId);
};
