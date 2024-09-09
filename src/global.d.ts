// Declarations for modules without types

declare global {
  interface Window {
    PWWebSDK: AuthService; // Make sure AuthService is the correct type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initPWAuthWebSDK: (props: any) => void;
  }
}

// To ensure this file is treated as a module
export {};
