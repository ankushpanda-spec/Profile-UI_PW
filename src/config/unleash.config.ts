import {UnleashSDK} from '@pw-tech/unleash/react';

type ENV = 'production' | 'pre-production' | 'staging' | 'development';

// eslint-disable-next-line import/prefer-default-export
export const unleashConfig = {
  url: process.env.PUBLIC_UNLEASH_PROXY_URL!,
  clientKey: process.env.PUBLIC_UNLEASH_CLIENT_KEY!,
  appName: 'pw-common-mf',
  refreshInterval: 900,
  environment: process.env.PUBLIC_ENVIRONMENT!,
};

// Unlocks the `@pw-tech/unleash` `useFlag` wrapper (it returns `false` until the
// SDK is initialised) and wires up experiment/impression logging. Runs once on
// import; guarded internally against non-browser environments.
UnleashSDK.initialise({
  env: process.env.PUBLIC_ENVIRONMENT as ENV,
  api: {
    headers: {},
  },
  appVersion: '',
});
