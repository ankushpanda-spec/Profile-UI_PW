import React, {useState, useEffect} from 'react';
import {LabelValue, ModalTypes, UpdateNumberConfig} from '../types/constants';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import OldPhoneNumberModal from './OldPhoneNumberComponent';
import OTPVerificationModal from './OtpVerification';
import NewNumberVerification from './NewNumberVerification';
import UpdateSuccessModal from './UpdateSuccess';
import OfflineUserInstructionsModal from './OfflineUserInstructions';
import EditProfileForm from './EditProfileForm';
import { EditProfileModalProps } from '../types';
import useProfileUtils from '../lib/profileUtils';

const EditProfile: React.FC<EditProfileModalProps> = ({
  editModalOpen,
  handleEditModalClose,
  handleEditModalOpen,
  userInfo,
}) => {
  const {fetchStateData,
    fetchCityData} = useProfileUtils();
  const [activeModal, setActiveModal] = useState<string>('');

  const [offlineInstructions, setOfflineInstructions] = useState<string>('');
  const [updateNumberConfig, setUpdateNumberConfig] =
    useState<UpdateNumberConfig>();

  const [selectedMobileNumber, setSelectedMobileNumber] = useState<string>('');
  const [newInputMobileNumber, setNewInputMobileNumber] = useState<string>('');
  const [newCountryCode, setNewCountryCode] = useState<string>('+91');
  const [states, setStates] = useState<LabelValue[]>([]);
  const [cities, setCities] = useState<LabelValue[]>([]);
  const [selectedState , setSelectedState] = useState<string>('');
  const handleSuccessModalClose = () => {
    handleEditModalOpen();
    setActiveModal('');
  };

  useEffect(() => {
    fetchStateData(setStates);
  }, []);

  useEffect(() => {
    fetchCityData(selectedState, setCities);
  }, [selectedState]); // Re-fetch cities when state changes
  return (
    <>
      {' '}
      {editModalOpen && (
        <EditProfileForm
          editModalOpen={editModalOpen}
          userInfo={userInfo}
          setUpdateNumberConfig={setUpdateNumberConfig}
          setActiveModal={setActiveModal}
          setOfflineInstructions={setOfflineInstructions}
          selectedMobileNumber={selectedMobileNumber}
          handleEditModalClose={handleEditModalClose}
          cities={cities}
          states={states}
          setSelectedState={setSelectedState}
        />
      )}
      {activeModal === ModalTypes.OfflineUserInstructions && (
        <OfflineUserInstructionsModal
          isOpen={true}
          onClose={() => {
            handleEditModalOpen();
            setActiveModal('');
          }}
          body={offlineInstructions}
        />
      )}
      {activeModal === ModalTypes.TermsAndConditions && (
        <TermsAndConditionsModal
          isOpen={true}
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
        />
      )}
      {activeModal === ModalTypes.OldPhoneNumber && (
        <OldPhoneNumberModal
          selectedMobileNumber={selectedMobileNumber}
          setSelectedMobileNumber={setSelectedMobileNumber}
          isOpen={true}
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
          numberChangeRequestId={updateNumberConfig?.requestId}
          userInfo={userInfo}
        />
      )}
      {activeModal === ModalTypes.OTPVerification && (
        <OTPVerificationModal
          selectedMobileNumber={selectedMobileNumber}
          userInfo={userInfo}
          isOpen={true}
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
          numberChangeRequestId={updateNumberConfig?.requestId}
          countryCode={userInfo?.countryCode}
          nextActiveModal="newNumberComponent"
          isNewNumber={false}
          showEditIcon={false}
        />
      )}
      {activeModal === ModalTypes.NewNumberComponent && (
        <NewNumberVerification
          isOpen={true}
          handleEditModalOpen={handleEditModalOpen}
          setActiveModal={setActiveModal}
          numberChangeRequestId={updateNumberConfig?.requestId}
          setNewInputMobileNumber={setNewInputMobileNumber}
          newInputMobileNumber={newInputMobileNumber}
          setNewCountryCode={setNewCountryCode}
          newCountryCode={newCountryCode}
          isNewNumber={true}
        />
      )}
      {activeModal === ModalTypes.NewNumberOTPVerification && (
        <OTPVerificationModal
          selectedMobileNumber={newInputMobileNumber}
          isOpen={true}
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
          numberChangeRequestId={updateNumberConfig?.requestId}
          countryCode={newCountryCode}
          nextActiveModal="numberUpdateSuccess"
          isNewNumber={true}
          showEditIcon={true}
          userInfo={userInfo}
        />
      )}
      {activeModal === ModalTypes.NumberUpdateSuccess && (
        <UpdateSuccessModal isOpen={true} onClose={handleSuccessModalClose} />
      )}
      {activeModal === ModalTypes.ProfileUpdateSuccess && (
        <UpdateSuccessModal
          isOpen={true}
          onClose={() => {
            handleEditModalClose();
            setActiveModal('');
          }}
          primaryMessage="Your Profile has been successfully changed!"
          secondaryMessage=""
        />
      )}
    </>
  );
};

export default EditProfile;
