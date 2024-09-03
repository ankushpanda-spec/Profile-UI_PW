import {COMMON_ENV_VARS, STAGING_ENV_VARS} from '@/environments';
import {AuthService, LoginMethods} from '@pw-tech/web-sdk';

const {baseURL} = STAGING_ENV_VARS;
const {clientSecret, organizationId} = COMMON_ENV_VARS;

export const webSDK = AuthService.getInstance({
  clientSecret,
  organizationId,
  apiBaseUrl: baseURL,
  loginMethods: [LoginMethods.OTP, LoginMethods.PASSWORD],
  localStorageFallback: true,
  clientId: 'system-admin',
  contextIdentifier: 'TOKEN_CONTEXT',
  loginPageUrl: '/login',
  debugMode: false,
});
