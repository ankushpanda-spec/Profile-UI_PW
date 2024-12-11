import {AuthService, LoginMethods} from '@pw-tech/web-sdk';

export const webSDK = AuthService.getInstance({
  clientSecret: process.env.PUBLIC_CLIENT_SECRET as string,
  organizationId: process.env.PUBLIC_ORGANISATION_ID as string,
  apiBaseUrl: process.env.PUBLIC_API_URL as string,
  loginMethods: [LoginMethods.OTP, LoginMethods.PASSWORD],
  localStorageFallback: true,
  clientId: 'system-admin',
  contextIdentifier: 'TOKEN_CONTEXT',
  loginPageUrl: '/login',
  debugMode: false,
});
