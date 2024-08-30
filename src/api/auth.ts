import {webSDK} from '@/auth';
import {API_ENDPOINT} from './constants';

const {cohortDetails} = API_ENDPOINT;

export async function fetchCohortDetails() {
  const response = await webSDK.apiClient.get(cohortDetails, {});
  return response;
}
