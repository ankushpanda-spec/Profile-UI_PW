import {Storage} from '@pw-tech/web-sdk';

import {webSDK} from '../services/sdk';
import LOCAL_STORAGE_KEYS from '../types/localStorage.types';

async function getUserSegment() {
  if (webSDK.isLoggedIn) {
    const data = Storage.get(LOCAL_STORAGE_KEYS.BATCH_USER_SEGMENT, {
      plain: true,
    });
    if (data) {
      return data;
    }
    const res = await webSDK.getUserSegment();
    const val = res?.data?.batchUserSegment;
    Storage.set(LOCAL_STORAGE_KEYS.BATCH_USER_SEGMENT, val, {plain: true});
    return val;
  }
  return '';
}

function getUserCohortId() {
  return (
    webSDK.cohortId ||
    Storage.get(LOCAL_STORAGE_KEYS.COHORT_ID, {plain: true}) ||
    Storage.get(LOCAL_STORAGE_KEYS.COHORT_ID_LC, {plain: true}) ||
    ''
  );
}

export {getUserCohortId, getUserSegment};
