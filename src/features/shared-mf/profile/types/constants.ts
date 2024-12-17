export enum ModalTypes {
    EditProfile = 'editProfile',
    TermsAndConditions = 'termsAndConditions',
    OldPhoneNumber = 'oldPhoneNumber',
    OTPVerification = 'otpVerification',
    NewNumberComponent = 'newNumberComponent',
    NewNumberOTPVerification = 'newNumberOtpVerification',
    UpdateSuccess = "updateSuccess",
  }

export type LabelValue = {
  label: string;
  value: string;
};

export interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  gender: string;
  city: string;
  state: string;
}

export interface UpdateNumberConfig {
  isEligible: boolean;
  failureReason: string;
  cooldownPeriod: number;
  requestId: string;
  isOffline: boolean;
  offlineInstruction: string;
  termsNCO: string;
  isAwarenessPopupEnabled: boolean;
}
