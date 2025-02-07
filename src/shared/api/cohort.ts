import webSDK from '@/shared/services/sdk/webSDK';

function fetchCohortConfig() {
  return webSDK.cohortConfig;
}

export default fetchCohortConfig;
