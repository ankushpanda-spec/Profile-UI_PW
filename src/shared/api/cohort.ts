import {webSDK} from '@/shared/services/sdk/webSDK';

export function fetchCohortConfig() {
  return webSDK.cohortConfig;
}
