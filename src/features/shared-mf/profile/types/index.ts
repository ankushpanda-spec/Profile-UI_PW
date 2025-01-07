import { LabelValue, UpdateNumberConfig } from "./constants";

export type EditProfileModalProps = {
    editModalOpen: boolean;
    handleEditModalClose: () => void;
    handleEditModalOpen: () => void;
    userInfo: any;
  };

 export type EditProfileFormProps = {
    editModalOpen: boolean;
    userInfo: any;
    setUpdateNumberConfig:React.Dispatch<React.SetStateAction<UpdateNumberConfig | undefined>>
    setActiveModal: React.Dispatch<React.SetStateAction<string>>
    setOfflineInstructions: React.Dispatch<React.SetStateAction<string>>
    selectedMobileNumber:string
    handleEditModalClose: () => void
    cities: LabelValue[],
    states: LabelValue[],
    setSelectedState:React.Dispatch<React.SetStateAction<string>>
  };

export type NewNumberVerificationProps={
  isOpen: boolean;
  handleEditModalOpen: () => void;
  numberChangeRequestId: string | undefined;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  setNewCountryCode: React.Dispatch<React.SetStateAction<string>>;
  setNewInputMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  newInputMobileNumber: string;
  newCountryCode: string;
  isNewNumber: boolean;
};

export type OldPhoneNumberProps = {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  numberChangeRequestId: string | undefined;
  selectedMobileNumber: string;
  setSelectedMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  handleEditModalOpen: () => void;
  userInfo: any;
}

export type OtpVerificationProps = {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  selectedMobileNumber: string;
  numberChangeRequestId: string | undefined;
  handleEditModalOpen: () => void;
  nextActiveModal: string;
  isNewNumber: boolean;
  countryCode: string;
  showEditIcon: boolean;
  userInfo: any;
}

export type TermsAndConditionsProps = {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  handleEditModalOpen: () => void;
}
export type UpdateSuccessProps = {
  isOpen: boolean;
  onClose: () => void;
  primaryMessage?: string;
  secondaryMessage?: string;
}

export type UserAvatarProps = {
  src?: string;
  height?: number;
  width?: number;
  className?: string;
}

export type OfflineUserInstructionsProps = {
  isOpen: boolean;
  onClose: () => void;
  body: string;
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