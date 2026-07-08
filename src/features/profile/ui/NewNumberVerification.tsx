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

import useLoader from '@/shared/hooks/showLoader';
import ErrorIcon from '@/shared/assets/icons/ErrorIcon';
import {NewNumberVerificationProps, OtpResponseData} from '../types';
import getErrorMessage from '@/shared/services/showErrorService';
import useSecureSendOtp from '../hooks/useSecureSendOtp';
import {CaptchaSection} from '@/shared/components/captcha/CaptchaSection';
import {CAPTCHA_WIDGET_IDS} from '@/shared/components/captcha/constants';

const NewNumberVerification: React.FC<NewNumberVerificationProps> = ({
  isOpen,
  handleEditModalOpen,
  setActiveModal,
  numberChangeRequestId,
  setNewInputMobileNumber,
  newInputMobileNumber,
  isNewNumber,
  setIsNumberAlreadyRegistered,
}) => {
  const {showLoader, hideLoader} = useLoader();
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputErrorMessageShown, setInputErrorMessageShown] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
  const {isCaptchaFlow, sendOtp, captcha} = useSecureSendOtp(
    CAPTCHA_WIDGET_IDS.PROFILE_NEW_NUMBER_OTP
  );

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
    setErrorMessage('');
    setNewInputMobileNumber(prev => ({
      ...prev,
      mobileNumber: value,
    }));
  };
  const checkMobileNumber = (mobileNumber: string): string => {
    if (!mobileNumber) {
      return 'Please enter a vaild mobile number';
    }
    if (
      newInputMobileNumber.countryCode === '+91' &&
      mobileNumber.length !== 10
    ) {
      return 'Please enter a valid 10 digits number';
    }
    if (newInputMobileNumber.countryCode !== '+91' && mobileNumber.length < 4) {
      return 'Please enter a number with minimum 4 digits';
    }
    return '';
  };

  const onContinueClick = async () => {
    setErrorMessage('');
    const message = checkMobileNumber(newInputMobileNumber.mobileNumber);
    if (message) {
      setInputErrorMessage(message);
      setInputErrorMessageShown(true);
      return;
    }
    if (isCaptchaFlow && !captcha.isCaptchaReady()) {
      captcha.setShowCaptchaHint(true);
      return;
    }
    const apiData = {
      phone: newInputMobileNumber.mobileNumber,
      countryCode: newInputMobileNumber.countryCode,
      isNewNumber,
      organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
      requestId: numberChangeRequestId || '',
      isNewShiftFlow: true,
    };
    try {
      showLoader('Sending OTP...');
      const res = await sendOtp(apiData);
      const responseData = res?.data as OtpResponseData | undefined;
      if (res?.success || responseData?.isNumberAlreadyRegistered) {
        const isNumberAlreadyReg =
          responseData?.isNumberAlreadyRegistered ?? false;
        if (setIsNumberAlreadyRegistered) {
          setIsNumberAlreadyRegistered(isNumberAlreadyReg);
        }
        setActiveModal('newNumberOtpVerification');
      } else if (res?.message) {
        setInputErrorMessage(res.message);
        setInputErrorMessageShown(true);
      } else {
        throw new Error(res.error?.message || 'Something went wrong');
      }
    } catch (err) {
      const errorObj = getErrorMessage(err);
      if (errorObj.status === 400) {
        setInputErrorMessage(errorObj.message);
        setInputErrorMessageShown(true);
      } else {
        setErrorMessage(errorObj.message);
      }
      hideLoader();
    } finally {
      hideLoader();
    }
  };
  const mobileNumberInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      onContinueClick();
      return false;
    }
    const digitRegExp = /^[0-9\b]+$/;
    const pressedKey = String.fromCharCode(event.keyCode);
    if (!digitRegExp.test(pressedKey)) {
      event.preventDefault();
      setInputErrorMessage('Please enter numbers only');
      setInputErrorMessageShown(true);
      return false;
    }
    return true;
  };

  return (
    <Modal isOpen={isModalOpen} size="small" onClose={handleClose}>
      <ModalHeader>
        <Typography color="static-black" variant="heading3" weight="bold">
          Enter New Number
        </Typography>
      </ModalHeader>
      <Separator />
      <ModalBody>
        <div className={s.nnvContainer}>
          <Typography weight="semi-bold" color="static-black" variant="regular">
            OTP will be sent on this number for verification.
          </Typography>
          <InputField
            label="Mobile Number"
            placeholder="Enter your phone number"
            type="number"
            fullWidth
            maxLength={newInputMobileNumber.countryCode === '+91' ? 10 : 16}
            message={
              inputErrorMessageShown
                ? inputErrorMessage
                : "Your contents won't be accessible on the old number."
            }
            onChange={handleInputChange}
            onKeyDown={mobileNumberInputKeyPress}
            error={inputErrorMessageShown}
            onCountryChange={country => {
              setNewInputMobileNumber(prev => ({
                ...prev,
                countryCode: country.dialCode,
                countryGroup: country.code,
              }));
            }}
          />
          {isCaptchaFlow && (
            <CaptchaSection
              isCaptchaEnabled={captcha?.isCaptchaEnabled}
              captchaWidgetRef={captcha?.captchaWidgetRef}
              widgetId={CAPTCHA_WIDGET_IDS.PROFILE_NEW_NUMBER_OTP}
              showCaptchaHint={false}
              onVerify={captcha?.handleCaptchaVerify || (() => {})}
              sentryData={{
                mobileNumber: newInputMobileNumber.mobileNumber,
                dialCode: newInputMobileNumber.countryCode,
              }}
            />
          )}
        </div>
      </ModalBody>

      <ModalFooter>
        <Button
          type="button"
          fullWidth
          size="large"
          variant="primary"
          onClick={onContinueClick}
          disabled={isCaptchaFlow && !captcha.isCaptchaReady()}
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
  );
};

export default NewNumberVerification;
