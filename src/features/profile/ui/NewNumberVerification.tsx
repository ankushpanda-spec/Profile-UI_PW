import React, {useState} from 'react';
import {
  Button,
  Typography,
  InputField,
  ModalHeader,
  ModalFooter,
  Modal,
  ModalBody,
  Separator,
} from '@pw-tech/omni-ui';

import s from '../styles/index.module.css';
import {fetchOtp} from '../api';
import getErrorMessage from '../services/showErrorService';
import {useLoader} from '@/shared/hooks/showLoader';
import ErrorIcon from '@/shared/assets/icons/ErrorIcon';
import { NewNumberVerificationProps } from '../types';

const NewNumberVerification: React.FC<NewNumberVerificationProps> = ({
  isOpen,
  handleEditModalOpen,
  setActiveModal,
  numberChangeRequestId,
  setNewCountryCode,
  setNewInputMobileNumber,
  newInputMobileNumber,
  newCountryCode,
  isNewNumber,
}) => {
  const {showLoader, hideLoader} = useLoader();
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputErrorMessageShown, setInputErrorMessageShown] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  const handleClose = () => {
    setIsModalOpen(false);
    setActiveModal('');
    handleEditModalOpen();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Reset the error message and visibility
    if (inputErrorMessageShown) {
      setInputErrorMessage('');
      setInputErrorMessageShown(false);
    }

    setNewInputMobileNumber(value);
  };

  const onContinueClick = async () => {
    const errorMessage = checkMobileNumber(newInputMobileNumber);
    if (errorMessage) {
      setInputErrorMessage(errorMessage);
      setInputErrorMessageShown(true);
      return;
    }
    const apiData = {
      phone: newInputMobileNumber,
      countryCode: newCountryCode,
      isNewNumber: isNewNumber,
      organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
      requestId: numberChangeRequestId || '',
    };
    try {
      showLoader('Sending OTP...');
      const res: any = await fetchOtp(apiData);

      if (res?.success) {
        setActiveModal('newNumberOtpVerification');
      } else {
        if (res?.message) {
          setInputErrorMessage(res.message);
          setInputErrorMessageShown(true);
        } else {
          throw new Error('');
        }
      }
    } catch (err) {
      const errorObj = getErrorMessage(err);

      setInputErrorMessage(errorObj.message);
      setInputErrorMessageShown(true);

      hideLoader();
    } finally {
      hideLoader();
    }
  };

  const checkMobileNumber = (mobileNumber: string): string => {
    if (!mobileNumber) {
      return 'Please enter a vaild mobile number';
    }
    if (newCountryCode === '+91' && mobileNumber.length !== 10) {
      return 'Please enter a valid 10 digits number';
    }
    if (newCountryCode !== '+91' && mobileNumber.length < 4) {
      return 'Please enter a number with minimum 4 digits';
    }
    return '';
  };
  const mobileNumberInputKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      onContinueClick();
      return;
    }
    const digitRegExp = /^[0-9\b]+$/;
    const pressedKey = String.fromCharCode(event.keyCode);
    if (!digitRegExp.test(pressedKey)) {
      event.preventDefault();
      setInputErrorMessage('Please enter numbers only');
      setInputErrorMessageShown(true);
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} size="small" onClose={handleClose}>
        <ModalHeader>
          <Typography color="static-black" variant="heading3" weight="bold">
            Enter New Number
          </Typography>
        </ModalHeader>
        <Separator />
        <ModalBody>
          <div className={s.nnvContainer}>
            <Typography
              weight="semi-bold"
              color="static-black"
              variant="regular"
            >
              OTP will be sent on this number for verification.
            </Typography>
            <InputField
              label="Mobile Number"
              placeholder="Enter your phone number"
              type="number"
              fullWidth
              message={
                inputErrorMessageShown
                  ? inputErrorMessage
                  : "Your contents won't be accessible on the old number."
              }
              onChange={handleInputChange}
              onKeyDown={mobileNumberInputKeyPress}
              error={inputErrorMessageShown}
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            fullWidth
            size="large"
            variant="primary"
            onClick={onContinueClick}
          >
            Continue
          </Button>

          {errorMessage && (
            <div className={s.errorMsg}>
              <ErrorIcon />
              <Typography variant="tiny" weight="semi-bold" color="error">
                {errorMessage}
              </Typography>
            </div>
          )}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NewNumberVerification;
