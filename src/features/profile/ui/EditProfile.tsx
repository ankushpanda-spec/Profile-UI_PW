import React, {useState, useEffect} from 'react';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import OldPhoneNumberModal from './OldPhoneNumberComponent';
import OTPVerificationModal from './OtpVerification';
import NewNumberVerification from './NewNumberVerification';
import UpdateSuccessModal from './UpdateSuccess';
import OfflineUserInstructionsModal from './OfflineUserInstructions';
import EditProfileForm from './EditProfileForm';
import {EditProfileModalProps, LabelValue, UpdateNumberConfig} from '../types';
import useProfileUtils from '../lib/profileUtils';
import {ModalTypes} from '../constants';
import {useUser} from '@pw-tech/omni-context';

const EditProfile: React.FC<EditProfileModalProps> = ({
  editModalOpen,
  handleEditModalClose,
  handleEditModalOpen,
}) => {
  const {fetchStateData, fetchCityData} = useProfileUtils();
  const [activeModal, setActiveModal] = useState<string>('');

  const [offlineInstructions, setOfflineInstructions] = useState<string>('');
  const [updateNumberConfig, setUpdateNumberConfig] =
    useState<UpdateNumberConfig>();

  const [selectedMobileNumber, setSelectedMobileNumber] = useState<string>('');
  const [newInputMobileNumber, setNewInputMobileNumber] = useState<string>('');
  const [newCountryCode, setNewCountryCode] = useState<string>('+91');
  const [states, setStates] = useState<LabelValue[]>([]);
  const [cities, setCities] = useState<LabelValue[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');

  const {user: userInfo} = useUser();
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
          setUpdateNumberConfig={setUpdateNumberConfig}
          setActiveModal={setActiveModal}
          setOfflineInstructions={setOfflineInstructions}
          handleEditModalClose={handleEditModalClose}
          cities={cities}
          states={states}
          setSelectedState={setSelectedState}
        />
      )}
      {activeModal === ModalTypes.OfflineUserInstructions && (
        <OfflineUserInstructionsModal
          isOpen
          onClose={() => {
            handleEditModalOpen();
            setActiveModal('');
          }}
          body={offlineInstructions}
        />
      )}
      {activeModal === ModalTypes.TermsAndConditions && (
        <TermsAndConditionsModal
          isOpen
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
        />
      )}
      {activeModal === ModalTypes.OldPhoneNumber && (
        <OldPhoneNumberModal
          selectedMobileNumber={selectedMobileNumber}
          setSelectedMobileNumber={setSelectedMobileNumber}
          isOpen
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
          numberChangeRequestId={updateNumberConfig?.requestId}
        />
      )}
      {activeModal === ModalTypes.OTPVerification && (
        <OTPVerificationModal
          selectedMobileNumber={selectedMobileNumber}
          isOpen
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
          isOpen
          handleEditModalOpen={handleEditModalOpen}
          setActiveModal={setActiveModal}
          numberChangeRequestId={updateNumberConfig?.requestId}
          setNewInputMobileNumber={setNewInputMobileNumber}
          newInputMobileNumber={newInputMobileNumber}
          setNewCountryCode={setNewCountryCode}
          newCountryCode={newCountryCode}
          isNewNumber
        />
      )}
      {activeModal === ModalTypes.NewNumberOTPVerification && (
        <OTPVerificationModal
          selectedMobileNumber={newInputMobileNumber}
          isOpen
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
          numberChangeRequestId={updateNumberConfig?.requestId}
          countryCode={newCountryCode}
          nextActiveModal="numberUpdateSuccess"
          isNewNumber
          showEditIcon
        />
      )}
      {activeModal === ModalTypes.NumberUpdateSuccess && (
        <UpdateSuccessModal isOpen onClose={handleSuccessModalClose} />
      )}
      {activeModal === ModalTypes.ProfileUpdateSuccess && (
        <UpdateSuccessModal
          isOpen
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
