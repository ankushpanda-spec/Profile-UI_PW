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