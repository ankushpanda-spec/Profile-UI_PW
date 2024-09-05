import {webSDK} from '@/integration/webSDK';

export function fetchCohortConfig() {
  return webSDK.cohortConfig;
}
