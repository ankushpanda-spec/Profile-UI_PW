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
import {fetchCities, fetchStates, fetchUpdateNumberConfig} from '../api';
import {formatToLabelValue} from '../services/utils';
import {
  LabelValue,
  ModalTypes,
  UpdateNumberConfig,
  UserInfo,
} from '../types/constants';
import {useUser} from '@pw-tech/omni-context';
import {useForm, Controller} from 'react-hook-form';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import OldPhoneNumberModal from './OldPhoneNumberComponent';
import OTPVerificationModal from './OtpVerification';
import NewNumberVerification from './NewNumberVerification';
import UpdateSuccessModal from './UpdateSuccess';
import getErrorMessage from '../services/showErrorService';
import {useLoader} from '@/hooks/showLoader';
import {useSnackbar} from '@/hooks/showSnackBar';

type EditProfileModalProps = {
  editModalOpen: boolean;
  handleEditModalClose: () => void;
  handleEditModalOpen: () => void;
};

const EditProfileFrom: React.FC<EditProfileModalProps> = ({
  editModalOpen,
  handleEditModalClose,
  handleEditModalOpen,
}) => {
  const {user} = useUser();
  const showSnackBar = useSnackbar();
  const {showLoader, hideLoader} = useLoader();
  const formData: UserInfo = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    mobile: user?.primaryNumber || '',
    gender: user?.gender || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
  };
  console.log('USER', user);
  const {handleSubmit, control, setValue, watch, formState, reset} = useForm({
    defaultValues: formData,
  });

  const [activeModal, setActiveModal] = useState<string>('');
  const [showWarningForNameChange, setShowWarningForNameChange] =
    useState(false);
  const [isUpdateNameDisabled, setIsUpdateNameDisabled] = useState(false);
  const [isUpdateNumberConfigLoading, setIsUpdateNumberConfigLoading] =
    useState(false);

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
    if (user) {
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('email', user.email);
      setValue('mobile', user.primaryNumber);
      setValue('gender', user.gender);
      setValue('city', user.address?.city);
      setValue('state', user.address?.state);
    }
  }, [user]);

  useEffect(() => {
    const nameUpdateBlockedUntil = user?.nameUpdateBlockedUntil;
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
  }, [user]);

  useEffect(() => {
    const fetchStateData = async () => {
      try {
        showLoader('Loading...');
        const country = 'IND'; // Adjust as needed
        const response: any = await fetchStates(country);
        const statesInFormattedForm: LabelValue[] = formatToLabelValue(
          response.data
        );
        setStates(statesInFormattedForm); // Assuming response contains states data
      } catch (error) {
        console.error('Error fetching states:', error);
      } finally {
        hideLoader();
      }
    };

    fetchStateData();
  }, []);

  useEffect(() => {
    const fetchCityData = async () => {
      if (selectedState) {
        showLoader('Loading...');
        try {
          const country = 'IND'; // Adjust as needed
          const response: any = await fetchCities(country, selectedState);
          const citiesInFormattedForm: LabelValue[] = formatToLabelValue(
            response.data
          );
          setCities(citiesInFormattedForm); // Assuming response contains cities data
        } catch (error) {
          console.error('Error fetching cities:', error);
        } finally {
          hideLoader();
        }
      }
    };
    fetchCityData();
  }, [selectedState]); // Re-fetch cities when state changes

  const handleUpdateNumber = async () => {
    setIsUpdateNumberConfigLoading(true);
    try {
      const res: any = await fetchUpdateNumberConfig();

      setUpdateNumberConfig(res.data);
      const isPureOfflineUser = res.data.isOffline;
      const eligible = res.data.isEligible;
      const failureReason = res.data.failureReason;

      if (eligible || isPureOfflineUser) {
        setActiveModal('termsAndConditions');
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

  const onNameClicked = () => {
    setShowWarningForNameChange(true);
  };
  const onNameClickedRemove = () => {
    if (isUpdateNameDisabled) {
      return;
    }
    setShowWarningForNameChange(false);
  };

  const handleFormSubmit = (data: UserInfo) => {
    console.log('data', data);
    alert('Form Submitted');
  };

  const handleSelectState = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue('state', e.target.value);
    setValue('city', '');
  };

  const handleSelectCity = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValue('city', e.target.value || '');
  };

  const isASCII = (input: string) => {
    return /^[\x00-\x7F]*$/.test(input);
  };

  const checkDigitInput = (event: any, inputName: 'firstName' | 'lastName') => {
    const regExp = /^[0-9\b]+$/;
    const regSpecialCharacter = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    const isAscii = isASCII(event.key);
    if (event.key === 'Enter') {
      event.preventDefault();
      let value = event.target.value;
      let valueReplaced = value.toString().replace(/[^a-zA-Z\s]/gm, '');
      setValue(inputName, valueReplaced.toString().trim());
      if (value != valueReplaced) {
        showSnackBar('Hindi Character, Emojis not allowed.');
      }
    }

    if (
      regExp.test(event.key) ||
      regSpecialCharacter.test(event.key) ||
      !isAscii
    ) {
      event.preventDefault();
      showSnackBar('Please enter alphabets only');
      return false;
    } else {
      return true;
    }
  };
  const checkEmail = (event: any) => {
    const isAscii = isASCII(event.key);
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (event.key === 'Enter') {
      event.preventDefault();
      let value = event.target.value;
      let valueReplaced = value.toString().replace(/[^a-zA-Z0-9_.\-\s@]/gm, '');
      setValue('email', valueReplaced.toString().trim());
      if (value != valueReplaced) {
        showSnackBar('Hindi Character, Emojis not allowed.');
      }
    }

    if (regExp.test(event.key) || event.key === ' ' || !isAscii) {
      event.preventDefault();
      showSnackBar('Please enter proper email only');
      return false;
    } else {
      return true;
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
              e.preventDefault();
              handleSubmit(handleFormSubmit)();
            }}
          >
            <ModalBody>
              {/* First Name */}
              <div className="flex flex-col items-start gap-8">
                <Controller
                  name="firstName"
                  control={control}
                  rules={{required: true, pattern: /^[A-Za-z\s]+$/}}
                  render={({field}) => (
                    <InputField
                      {...field}
                      placeholder="Enter First Name"
                      type="text"
                      readOnly={isUpdateNameDisabled && user?.firstName}
                      fullWidth
                      label="First Name"
                      variant="outside"
                      onFocus={onNameClicked}
                      onBlur={onNameClickedRemove}
                      onKeyDown={e => checkDigitInput(e, 'firstName')}
                    />
                  )}
                />

                <div className="flex w-full flex-col items-start gap-12">
                  {/* Last Name */}

                  <Controller
                    name="lastName"
                    control={control}
                    rules={{required: true, pattern: /^[A-Za-z\s]+$/}}
                    render={({field}) => (
                      <InputField
                        {...field}
                        placeholder="Enter Last Name"
                        readOnly={isUpdateNameDisabled && user?.lastName}
                        type="text"
                        fullWidth
                        label="Last Name"
                        variant="outside"
                        onFocus={onNameClicked}
                        onBlur={onNameClickedRemove}
                        onKeyDown={e => checkDigitInput(e, 'lastName')}
                      />
                    )}
                  />
                  {showWarningForNameChange &&
                    (isUpdateNameDisabled ? (
                      <Alert
                        heading={`You have already updated your profile name once! You won’t be able to
        update it before ${ calculatedDate }!`}
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

              <div className="flex items-center gap-24">
                <Typography variant="regular" weight="semi-bold">
                  Gender
                </Typography>
                <div className="flex items-center gap-12">
                  <div className="flex w-[104px] flex-col items-start gap-10 py-12 pl-10 pr-32">
                    <div className="flex items-start gap-10">
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
                  <div className="flex w-[104px] flex-col items-start gap-10 py-12 pl-10 pr-32">
                    <div className="flex items-start gap-10">
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
              <div className="flex-start flex flex-col items-stretch gap-8">
                <Controller
                  name="mobile"
                  control={control}
                  render={({field}) => (
                    <InputField
                      {...field}
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
                      onKeyDown={e => checkEmail(e)}
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
                      onChange={handleSelectState}
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
                      onChange={handleSelectCity}
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
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="primary"
                  disabled={!formState.isValid}
                  type="submit"
                >
                  Save Changes
                </Button>
              </div>
            </ModalFooter>
          </form>
        </Modal>
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
        />
      )}
      {activeModal === ModalTypes.OTPVerification && (
        <OTPVerificationModal
          selectedMobileNumber={selectedMobileNumber}
          isOpen={true}
          setActiveModal={setActiveModal}
          handleEditModalOpen={handleEditModalOpen}
          numberChangeRequestId={updateNumberConfig?.requestId}
          countryCode={user?.countryCode}
          nextActiveModal="newNumberComponent"
          isNewNumber={false}
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
          nextActiveModal="updateSuccess"
          isNewNumber={true}
        />
      )}
      {activeModal === ModalTypes.UpdateSuccess && (
        <UpdateSuccessModal isOpen={true} onClose={handleSuccessModalClose} />
      )}
    </>
  );
};

export default EditProfileFrom;
