import {webSDK} from '../services/sdk';
import {ANALYTICS_EVENT_TAG, USER_STATE} from '../types/analytics.type';

import {getUserCohortId, getUserSegment} from './utils';

export const ANALYTICS_EVENT_PARAMS = {
  user_id: webSDK.user?.id || '',
  user_state: webSDK.isLoggedIn
    ? USER_STATE.LOGGED_IN
    : USER_STATE.NON_LOGGED_IN,
  user_type: getUserSegment(),
  cohort_id: getUserCohortId(),
};

// Analytics function to log events
export function logEvent(
  eventName: string,
  eventData: Record<string, string | number | Promise<string>>
) {
  webSDK.eventService?.logEvent({
    eventName,
    eventData,
  });
}

export const LogAnalyticsEvent = {
  profileEdit: () => {
    logEvent(ANALYTICS_EVENT_TAG.PROFILE_EDIT, {
      user_id: ANALYTICS_EVENT_PARAMS.user_id,
      cohort_id: ANALYTICS_EVENT_PARAMS.cohort_id,
      user_state: ANALYTICS_EVENT_PARAMS.user_state,
      user_type: ANALYTICS_EVENT_PARAMS.user_type,
    });
  },
};
