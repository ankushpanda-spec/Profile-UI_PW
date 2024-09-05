import {AuthService, LoginMethods} from '@pw-tech/web-sdk';

export const webSDK = AuthService.getInstance({
  clientSecret: process.env.PUBLIC_CLIENT_SECRET,
  organizationId: process.env.PUBLIC_ORGANISATION_ID,
  apiBaseUrl: process.env.PUBLIC_BASE_URL,
  loginMethods: [LoginMethods.OTP, LoginMethods.PASSWORD],
  localStorageFallback: true,
  clientId: 'system-admin',
  contextIdentifier: 'TOKEN_CONTEXT',
  loginPageUrl: '/login',
  debugMode: false,
});
