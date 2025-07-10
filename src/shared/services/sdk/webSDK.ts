import {
  AuthService,
  EVENT_PLATFORMS,
  EVENTS_ORG,
  LoginMethods,
} from '@pw-tech/web-sdk';

const webSDK = AuthService.getInstance({
  clientSecret: process.env.PUBLIC_CLIENT_SECRET as string,
  organizationId: process.env.PUBLIC_ORGANISATION_ID as string,
  apiBaseUrl: process.env.PUBLIC_API_URL as string,
  loginMethods: [LoginMethods.OTP, LoginMethods.PASSWORD],
  localStorageFallback: true,
  clientId: 'system-admin',
  contextIdentifier: 'TOKEN_CONTEXT',
  loginPageUrl: '/',
  debugMode: process.env.PUBLIC_DEBUG_MODE === 'true',
  eventConfig: {
    organizationName: EVENTS_ORG.PHYSICS_WALLAH,
    eventPlatforms: [
      EVENT_PLATFORMS.GA,
      EVENT_PLATFORMS.MOENGAGE,
      EVENT_PLATFORMS.APPFLYER,
    ],
    eventsDebugMode: process.env.PUBLIC_DEBUG_MODE === 'true',
  },
});

export default webSDK;
