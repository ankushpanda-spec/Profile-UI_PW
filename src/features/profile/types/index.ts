export interface ImageData {
  name: string;
  baseUrl: string;
  key: string;
  status: string;
  _id: string;
  createdAt: Date;
  __v: number;
}

export interface User {
  countryCode: string;
  countryGroup: string;
  id: string;
  firstName: string;
  lastName: string;
  address: {
    city: string;
    state: string;
  };
  email: string;
  gender: string;
  isProfileCompleted: boolean;
  imageId: ImageData;
  profileId: {
    address: {
      city: string;
      state: string;
    };
    gender: string;
    isProfileCompleted: string;
  };
  nameUpdateBlockedUntil?: string;
  primaryNumber: string;
}

export type EditProfileModalProps = {
  editModalOpen: boolean;
  handleEditModalClose: () => void;
};

export type Mobile = {
  countryCode: string;
  countryGroup: string;
  mobileNumber: string;
};

export type NewNumberVerificationProps = {
  isOpen: boolean;
  handleEditModalOpen: () => void;
  numberChangeRequestId: string | undefined;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  setNewInputMobileNumber: React.Dispatch<React.SetStateAction<Mobile>>;
  newInputMobileNumber: Mobile;
  isNewNumber: boolean;
  setIsNumberAlreadyRegistered?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type OldPhoneNumberProps = {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  numberChangeRequestId: string | undefined;
  selectedMobileNumber: Mobile;
  setSelectedMobileNumber: React.Dispatch<React.SetStateAction<Mobile>>;
  handleEditModalOpen: () => void;
};

export type OtpVerificationProps = {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  selectedMobileNumber: Mobile;
  numberChangeRequestId: string | undefined;
  handleEditModalOpen: () => void;
  nextActiveModal: string;
  isNewNumber: boolean;
  showEditIcon: boolean;
  isNumberAlreadyRegistered?: boolean;
  setIsNumberAlreadyRegistered?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type TermsAndConditionsProps = {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  handleEditModalOpen: () => void;
};
export type UpdateSuccessProps = {
  isOpen: boolean;
  onClose: () => void;
  primaryMessage?: string;
  secondaryMessage?: string;
};

export type UserAvatarProps = {
  src?: string;
  height?: number;
  width?: number;
  className?: string;
};

export type OfflineUserInstructionsProps = {
  isOpen: boolean;
  onClose: () => void;
  body: string;
};
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
export type EditProfileFormProps = {
  editModalOpen: boolean;
  setUpdateNumberConfig: React.Dispatch<
    React.SetStateAction<UpdateNumberConfig | undefined>
  >;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  setOfflineInstructions: React.Dispatch<React.SetStateAction<string>>;
  handleEditModalClose: () => void;
  cities: LabelValue[];
  states: LabelValue[];
  setSelectedState: React.Dispatch<React.SetStateAction<string>>;
};
export interface FetchStatesResponse {
  success: boolean;
  data: string[];
}
export interface FetchCitiesResponse {
  success: boolean;
  data: string[];
}
export interface Error {
  message: string;
  status: number;
}
export interface ApiResponse {
  data: unknown;
  success: boolean;
  message?: string | null;
  error?: Error;
}

export interface OtpResponseData {
  isNumberAlreadyRegistered?: boolean;
}

export interface FetchOtpResponse extends ApiResponse {
  data: OtpResponseData;
}

export interface GetUpdateNumberConfigResponse extends ApiResponse {
  data: UpdateNumberConfig;
}
export interface LevelDetails {
  displayOrder: number;
  icon: string;
  name: string;
}
export interface Learn2EarnConfigData {
  featureDetails: Record<string, number>;
  isLearnToEarnActive: boolean;
  leaderboardUpdateFrequency: number;
  leaderboardUpdateNextDate: Date;
  levelDetails: LevelDetails[];
  segmentId: string;
}
export interface LevelUpData {
  currentLevel: LevelDetails;
  highestLevel: LevelDetails;
  totalXP: number;
}
export interface GetLearn2EarnConfigResponse {
  success: boolean;
  data: Learn2EarnConfigData;
}

export interface fetchLevelUpDataResponse {
  success: boolean;
  data: LevelUpData;
}
export interface FeedbackData {
  satisfactoryRate: number;
  totalSolved: number;
  totalRated: number;
}
export interface doubtSolvingFeedbackDataResponse {
  success: boolean;
  data: FeedbackData;
}

export interface UploadFileResponse {
  success: boolean;
  data: ImageData;
}
export interface StatTile {
  title: string;
  value: number | string;
  info: string;
  icon?: string;
}
export interface SectionValue {
  key: string;
  value: string;
}
export interface Section {
  sectionName: string;
  values: SectionValue[];
  showEdit?: boolean;
}
export interface ProfileInfo {
  board: string;
  class: string;
  cohortId: string;
  exams: string[];
  stream: string;
  language: string;
}
export interface getUserProfileInfoResponse {
  success: boolean;
  data: ProfileInfo;
}
