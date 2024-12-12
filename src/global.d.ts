import {AuthService} from '@pw-tech/web-sdk';

declare global {
  interface Window {
    PWWebSDK: AuthService;
    initPWAuthWebSDK: (props: any) => void;
  }
}

export {};
