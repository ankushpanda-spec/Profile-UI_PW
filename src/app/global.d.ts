import {AuthService} from '@pw-tech/web-sdk';

declare global {
  interface Window {
    PWWebSDK: AuthService;
    initPWAuthWebSDK: (props: {
      flow: string;
      webSDK: AuthService;
      renderType: string;
    }) => void;
  }
}

export {};
