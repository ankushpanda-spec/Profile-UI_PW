import {
  Alert,
  Button,
  Dropdown,
  InputField,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  RadioButton,
  Separator,
  Typography,
} from '@pw-tech/omni-ui';
import React, {useEffect, useState} from 'react';
import useProfileUtils from '../lib/profileUtils';
import {Controller, useForm} from 'react-hook-form';
import {
  handleSelectCity,
  handleSelectState,
  onNameClicked,
  onNameClickedRemove,
} from '../lib';
import s from '../styles/index.module.css';

import {fetchUpdateNumberConfig} from '../api';
import {EditProfileFormProps} from '../types';
import {useUser} from '@pw-tech/omni-context';
import getErrorMessage from '@/shared/services/showErrorService';

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  editModalOpen,
  setUpdateNumberConfig,
  setActiveModal,
  setOfflineInstructions,
  handleEditModalClose,
  cities,
  states,
  setSelectedState,
}) => {
  const {user: userInfo, setUser} = useUser();
  const formData = {
    firstName: userInfo?.firstName || '',
    lastName: userInfo?.lastName || '',
    email: userInfo?.email || '',
    mobile: userInfo?.primaryNumber || '',
    gender: userInfo?.gender || userInfo?.profileId?.gender || '',
    city: userInfo?.profileId?.address?.city || '',
    state: userInfo?.profileId?.address?.state || '',
  };

  const {handleSubmit, control, setValue, watch, formState, reset, trigger} =
    useForm({
      defaultValues: formData,
    });

  const [showWarningForNameChange, setShowWarningForNameChange] =
    useState(false);
  const [isUpdateNameDisabled, setIsUpdateNameDisabled] = useState(false);
  const [isUpdateNumberConfigLoading, setIsUpdateNumberConfigLoading] =
    useState(false);
  const [calculatedDate, setCalculatedDate] = useState<string | null>(null);
  const [updateNumberErrorMessage, setUpdateNumberErrorMessage] = useState('');
  const [updatedNumber, setUpdatedNumber] = useState<string>(
    userInfo?.primaryNumber || ''
  );
  const [countryGroup, setCountryGroup] = useState<string>('IN');
  const selectedState = watch('state'); // Watch the state field for changes
  const {isValid} = formState;

  useEffect(() => {
    setSelectedState(selectedState);
  }, [selectedState]);

  const {checkDigitInput, checkEmail, handleFormSubmit} = useProfileUtils();

  const handleUpdateNumber = async () => {
    setUpdateNumberErrorMessage('');
    setIsUpdateNumberConfigLoading(true);
    try {
      const res = await fetchUpdateNumberConfig();

      setUpdateNumberConfig(res.data);
      const isPureOfflineUser = !!res.data.isOffline;
      const eligible = !!res.data.isEligible;
      const failureReason = res.data.failureReason;
      const instructions = res.data.offlineInstruction;

      if (eligible || isPureOfflineUser) {
        const editProfileDialog = document.getElementById(
          'edit-profile-dialog'
        );
        if (editProfileDialog) {
          editProfileDialog.style = 'display: none;';
        }
        if (isPureOfflineUser) {
          setOfflineInstructions(instructions);
          setActiveModal('offlineUserInstructions');
        } else {
          setActiveModal('termsAndConditions');
        }
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
    if (userInfo?.primaryNumber) {
      setValue('mobile', userInfo?.primaryNumber);
      setUpdatedNumber(userInfo?.primaryNumber);
    }
    setCountryGroup(userInfo?.countryGroup);
  }, [userInfo?.primaryNumber, userInfo?.countryGroup, setValue]);

  return (
    <Modal
      id="edit-profile-dialog"
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
        <Typography color="static-black" variant="regular" weight="semi-bold">
          Edit Details
        </Typography>
      </ModalHeader>
      <Separator />
      <form
        autoComplete="off"
        onSubmit={e => {
          e.preventDefault();
          // Prevent default form submission behavior
          handleSubmit(data =>
            handleFormSubmit(
              data,
              setValue,
              setActiveModal,
              handleEditModalClose,
              userInfo,
              setUser
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
                    onFocus={() => onNameClicked(setShowWarningForNameChange)}
                    onBlur={() =>
                      onNameClickedRemove(
                        isUpdateNameDisabled,
                        setShowWarningForNameChange
                      )
                    }
                    onKeyDown={e => checkDigitInput(e, 'lastName', setValue)}
                  />
                )}
              />
              {showWarningForNameChange &&
                (isUpdateNameDisabled ? (
                  <Alert
                    subHeading={`You have already updated your profile name once! You won’t be able to
        update it before ${calculatedDate}!`}
                    intent="error"
                    fullWidth
                  />
                ) : (
                  <Alert
                    subHeading={`If you change your profile name, you won't be able to update it till ${calculatedDate}!`}
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
            <Controller
              name="gender"
              control={control}
              rules={{required: 'Gender is required'}}
              render={({field}) => (
                <div className={s.epGenderContainer}>
                  {['Male', 'Female'].map(option => (
                    <div key={option} className={s.epGenderSubContainer}>
                      <div className={s.epGender}>
                        <RadioButton
                          value={option}
                          checked={field.value === option}
                          onChange={e => field.onChange(e.target.value)}
                          variant="primary"
                          size="sm"
                        />
                        <Typography variant="regular" weight="medium">
                          {option}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Mobile */}
          <div className={s.epContainer}>
            <Controller
              name="mobile"
              control={control}
              render={({field}) => (
                <InputField
                  {...field}
                  value={updatedNumber}
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
                  defaultCountryCode={countryGroup}
                  onCountryChange={country => {
                    setCountryGroup(country.code);
                  }}
                  readOnly
                  action={handleUpdateNumber}
                  message={updateNumberErrorMessage}
                  error={!!updateNumberErrorMessage}
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
                  values={[field.value]}
                  label="State"
                  variant="outside"
                  required={false}
                  options={states}
                  maxHeight={280}
                  onChange={e => {
                    handleSelectState(e, setValue);
                    trigger();
                  }}
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
                  values={[field.value]}
                  placeholder="Select City"
                  fullWidth
                  label="City"
                  variant="outside"
                  required={false}
                  maxHeight={280}
                  onChange={e => {
                    handleSelectCity(e, setValue);
                    trigger(); // Trigger validation
                  }}
                  disabled={!selectedState}
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
              disabled={!isValid}
              type="submit"
              className={s.epCTA}
            >
              Save Changes
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

export default EditProfileForm;
