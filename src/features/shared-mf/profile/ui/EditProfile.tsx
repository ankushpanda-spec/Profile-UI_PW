import React, {useState, useEffect, act} from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Typography,
  Dropdown,
  InputField,
  RadioButton,
  Separator,
  Alert,
} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';
import {fetchUpdateNumberConfig} from '../api';

import {
  LabelValue,
  ModalTypes,
  UpdateNumberConfig,
  UserInfo,
} from '../types/constants';

import {useForm, Controller} from 'react-hook-form';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import OldPhoneNumberModal from './OldPhoneNumberComponent';
import OTPVerificationModal from './OtpVerification';
import NewNumberVerification from './NewNumberVerification';
import UpdateSuccessModal from './UpdateSuccess';
import getErrorMessage from '../services/showErrorService';
import {useLoader} from '@/hooks/showLoader';
import {useSnackbar} from '@/hooks/showSnackBar';
import {webSDK} from '@/integration';
import {useError} from '@/hooks/showError';
import OfflineUserInstructionsModal from './OfflineUserInstructions';
import {
  handleSelectCity,
  handleSelectState,
  onNameClicked,
  onNameClickedRemove,
} from '../lib';
import useProfileUtils from '../../profile/lib/utils'

type EditProfileModalProps = {
  editModalOpen: boolean;
  handleEditModalClose: () => void;
  handleEditModalOpen: () => void;
  userInfo: any;
};

const EditProfileFrom: React.FC<EditProfileModalProps> = ({
  editModalOpen,
  handleEditModalClose,
  handleEditModalOpen,
  userInfo,
}) => {
  const formData = {
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    mobile: userInfo?.primaryNumber || '',
    gender: userInfo?.gender || '',
    city: userInfo?.profileId?.address?.city || '',
    state: userInfo?.profileId?.address?.state || '',
  };

  const {handleSubmit, control, setValue, watch, formState, reset} = useForm({
    defaultValues: formData,
  });
  const {checkDigitInput, checkEmail, fetchStateData, fetchCityData,  handleFormSubmit} =
    useProfileUtils();
  const [activeModal, setActiveModal] = useState<string>('');
  const [showWarningForNameChange, setShowWarningForNameChange] =
    useState(false);
  const [isUpdateNameDisabled, setIsUpdateNameDisabled] = useState(false);
  const [isUpdateNumberConfigLoading, setIsUpdateNumberConfigLoading] =
    useState(false);
  const [offlineInstructions, setOfflineInstructions] = useState<string>('');
  const [updateNumberConfig, setUpdateNumberConfig] =
    useState<UpdateNumberConfig>();
  const [updateNumberErrorMessage, setUpdateNumberErrorMessage] = useState('');
  const [calculatedDate, setCalculatedDate] = useState<string | null>(null);
  const [selectedMobileNumber, setSelectedMobileNumber] = useState<string>('');
  const [newInputMobileNumber, setNewInputMobileNumber] = useState<string>('');
  const [newCountryCode, setNewCountryCode] = useState<string>('+91');
  const [states, setStates] = useState<LabelValue[]>([]);
  const [cities, setCities] = useState<LabelValue[]>([]);
  const selectedState = watch('state'); // Watch the state field for changes
  const selectedGender = watch('gender');

  useEffect(() => {
    const nameUpdateBlockedUntil = userInfo?.nameUpdateBlockedUntil;
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    const blockedUntilDate = nameUpdateBlockedUntil
      ? new Date(nameUpdateBlockedUntil)
      : null;

    futureDate.setDate(currentDate.getDate() + 180);

    // Format the futureDate and blockedUntilDate
    const formatDate = (date: Date | null) => {
      const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      };
      return date ? date.toLocaleDateString('en-GB', options) : null;
    };

    if (!blockedUntilDate || blockedUntilDate < currentDate) {
      setCalculatedDate(formatDate(futureDate));
      setIsUpdateNameDisabled(false);
    } else {
      setCalculatedDate(formatDate(blockedUntilDate));
      setIsUpdateNameDisabled(true);
    }
  }, [userInfo]);

  useEffect(() => {
    fetchStateData(setStates);
  }, []);

  useEffect(() => {
    fetchCityData(selectedState, setCities);
  }, [selectedState]); // Re-fetch cities when state changes

  const handleUpdateNumber = async () => {
    setUpdateNumberErrorMessage('');
    setIsUpdateNumberConfigLoading(true);
    try {
      const res: any = await fetchUpdateNumberConfig();

      setUpdateNumberConfig(res.data);
      const isPureOfflineUser = !!res.data.isOffline;
      const eligible = !!res.data.isEligible;
      const failureReason = res.data.failureReason;
      const instructions = res.data.offlineInstruction;
      console.log(typeof res.data.offlineInstruction);

      if (eligible || isPureOfflineUser) {
        if (isPureOfflineUser) {
          setOfflineInstructions(instructions);
          setActiveModal('offlineUserInstructions');
        } else {
          setActiveModal('termsAndConditions');
        }
        handleEditModalClose();
      } else if (!eligible && failureReason) {
        setUpdateNumberErrorMessage(failureReason);
      }
    } catch (error) {
      const errorObj = getErrorMessage(error);
      setUpdateNumberErrorMessage(errorObj.message);
    } finally {
      setIsUpdateNumberConfigLoading(false);
    }
  };

  const handleSuccessModalClose = () => {
    handleEditModalOpen();
    setActiveModal('');
  };
  return (
    <>
      {' '}
      {editModalOpen && (
        <Modal
          closeOnOutsideClick
          onClose={() => {
            handleEditModalClose();
            reset(); // Reset the form when the modal is closed
          }}
          showCloseIcon
          size="small"
          isOpen={editModalOpen}
        >
          <ModalHeader>
            <Typography
              color="static-black"
              variant="regular"
              weight="semi-bold"
            >
              Edit Details
            </Typography>
          </ModalHeader>
          <Separator />
          <form
            autoComplete="off"
            onKeyDown={e => {
              if (e.key === 'Enter') e.preventDefault();
            }}
            onSubmit={e => {
              e.preventDefault(); // Prevent default form submission behavior
              handleSubmit(data =>
                handleFormSubmit(
                  data,
                  setValue,
                  setActiveModal,
                  userInfo,
                  handleEditModalClose
                )
              )();
            }}
          >
            <ModalBody>
              {/* First Name */}
              <div className={s.epNameContainer}>
                <Controller
                  name="firstName"
                  control={control}
                  rules={{required: true, pattern: /^[A-Za-z\s]+$/}}
                  render={({field}) => (
                    <InputField
                      {...field}
                      placeholder="Enter First Name"
                      type="text"
                      readOnly={isUpdateNameDisabled && userInfo?.firstName}
                      fullWidth
                      label="First Name"
                      variant="outside"
                      onFocus={() => onNameClicked(setShowWarningForNameChange)}
                      onBlur={() =>
                        onNameClickedRemove(
                          isUpdateNameDisabled,
                          setShowWarningForNameChange
                        )
                      }
                      onKeyDown={e => checkDigitInput(e, 'firstName', setValue)}
                    />
                  )}
                />

                <div className={s.epNameSubContainer}>
                  {/* Last Name */}

                  <Controller
                    name="lastName"
                    control={control}
                    rules={{required: true, pattern: /^[A-Za-z\s]+$/}}
                    render={({field}) => (
                      <InputField
                        {...field}
                        placeholder="Enter Last Name"
                        readOnly={isUpdateNameDisabled && userInfo?.lastName}
                        type="text"
                        fullWidth
                        label="Last Name"
                        variant="outside"
                        onFocus={() =>
                          onNameClicked(setShowWarningForNameChange)
                        }
                        onBlur={() =>
                          onNameClickedRemove(
                            isUpdateNameDisabled,
                            setShowWarningForNameChange
                          )
                        }
                        onKeyDown={e =>
                          checkDigitInput(e, 'lastName', setValue)
                        }
                      />
                    )}
                  />
                  {showWarningForNameChange &&
                    (isUpdateNameDisabled ? (
                      <Alert
                        heading={`You have already updated your profile name once! You won’t be able to
        update it before ${calculatedDate}!`}
                        intent="error"
                        fullWidth
                      />
                    ) : (
                      <Alert
                        heading={`If you change your profile name, you won't be able to update it till ${calculatedDate}!`}
                        intent="warning"
                        fullWidth
                      />
                    ))}
                </div>
              </div>
              {/* Gender */}

              <div className={s.epGenderWrapper}>
                <Typography variant="regular" weight="semi-bold">
                  Gender
                </Typography>
                <div className={s.epGenderContainer}>
                  <div className={s.epGenderSubContainer}>
                    <div className={s.epGender}>
                      <Controller
                        name="gender"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                          <RadioButton
                            {...field}
                            value="Male"
                            checked={selectedGender === 'Male'}
                            variant="primary"
                            size="sm"
                          />
                        )}
                      />
                      <Typography variant="regular" weight="medium">
                        Male
                      </Typography>
                    </div>
                  </div>
                  <div className={s.epGenderSubContainer}>
                    <div className={s.epGender}>
                      <Controller
                        name="gender"
                        control={control}
                        rules={{required: true}}
                        render={({field}) => (
                          <RadioButton
                            {...field}
                            value="Female"
                            checked={selectedGender === 'Female'}
                            variant="primary"
                            size="sm"
                          />
                        )}
                      />
                      <Typography variant="regular" weight="medium">
                        Female
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile */}
              <div className={s.epContainer}>
                <Controller
                  name="mobile"
                  control={control}
                  render={({field}) => (
                    <InputField
                      {...field}
                      value={
                        selectedMobileNumber
                          ? selectedMobileNumber
                          : userInfo?.primaryNumber
                      }
                      label="Mobile Number"
                      placeholder="Enter Mobile Number"
                      type="number"
                      fullWidth
                      variant="outside"
                      actionText={
                        isUpdateNumberConfigLoading
                          ? 'Updating...'
                          : 'Update Number'
                      }
                      minLength={4}
                      maxLength={16}
                      readOnly
                      action={handleUpdateNumber}
                      message={updateNumberErrorMessage}
                      error={updateNumberErrorMessage ? true : false}
                    />
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={control}
                  rules={{required: true, pattern: /\S+@\S+\.\S+/}}
                  render={({field}) => (
                    <InputField
                      {...field}
                      placeholder="Enter Email"
                      type="text"
                      fullWidth
                      label="Email"
                      variant="outside"
                      onKeyDown={e => checkEmail(e, setValue)}
                    />
                  )}
                />

                {/* State */}
                <Controller
                  name="state"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <Dropdown
                      {...field}
                      placeholder="Select State"
                      fullWidth
                      label="State"
                      variant="outside"
                      required={false}
                      options={states}
                      onChange={e => handleSelectState(e, setValue)}
                      maxHeight={280}
                    />
                  )}
                />

                {/* City */}
                <Controller
                  name="city"
                  control={control}
                  rules={{required: true}}
                  render={({field}) => (
                    <Dropdown
                      {...field}
                      options={cities}
                      placeholder="Select City"
                      fullWidth
                      label="City"
                      variant="outside"
                      required={false}
                      onChange={e => handleSelectCity(e, setValue)}
                      disabled={!selectedState}
                      maxHeight={280}
                    />
                  )}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <div className={s.modalFooter}>
                <Button
                  size="small"
                  variant="secondary"
                  onClick={() => {
                    handleEditModalClose();
                    reset(); // Reset the form when the modal is closed
                  }}
                  type="button"
                  className={s.epCTA}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="primary"
                  disabled={!formState.isValid}
                  type="submit"
                  className={s.epCTA}
                >
                  Save Changes
                </Button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
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

export default EditProfileFrom;
