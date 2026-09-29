import React, {useState} from 'react';
import {
  Button,
  Typography,
  RadioButton,
  ModalHeader,
  ModalBody,
  Modal,
  Separator,
} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';

import useLoader from '@/shared/hooks/showLoader';
import {OldPhoneNumberProps} from '../types';
import {useUser} from '@pw-tech/omni-context';
import getErrorMessage from '@/shared/services/showErrorService';
import ErrorIcon from '@/shared/assets/icons/ErrorIcon';
import useSecureSendOtp from '../hooks/useSecureSendOtp';
import {CaptchaSection} from '@/shared/components/captcha/CaptchaSection';
import {CAPTCHA_WIDGET_IDS} from '@/shared/components/captcha/constants';

const OldPhoneNumberModal: React.FC<OldPhoneNumberProps> = ({
  isOpen,
  setActiveModal,
  numberChangeRequestId,
  selectedMobileNumber,
  setSelectedMobileNumber,
  handleEditModalOpen,
}) => {
  const {showLoader, hideLoader} = useLoader();
  const {user: userInfo} = useUser();
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
  const {isCaptchaFlow, sendOtp, captcha} = useSecureSendOtp(
    CAPTCHA_WIDGET_IDS.PROFILE_OLD_NUMBER_OTP
  );
  const handleClose = () => {
    setIsModalOpen(false);
    setActiveModal('');
    handleEditModalOpen();
  };

  const handleRequestOtp = async () => {
    if (isCaptchaFlow && !captcha.isCaptchaReady()) {
      captcha.setShowCaptchaHint(true);
      return;
    }
    showLoader('Sending OTP...');
    try {
      const apiData = {
        phone: selectedMobileNumber.mobileNumber,
        countryCode: userInfo?.countryCode,
        isNewNumber: false,
        organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
        requestId: numberChangeRequestId || '',
        isNewShiftFlow: true,
      };
      const res = await sendOtp(apiData);
      if (res.success) {
        setActiveModal('otpVerification');
      } else {
        setError(res.error?.message || 'Something went wrong');
      }
    } catch (_error) {
      const errorObj = getErrorMessage(_error);
      setError(errorObj.message);
      hideLoader();
    } finally {
      hideLoader();
    }
  };

  return (
    <Modal isOpen={isModalOpen} size="small" onClose={handleClose}>
      <ModalHeader>
        <Typography color="text-heading" variant="heading4" weight="semi-bold">
          Select Mobile Number
        </Typography>
      </ModalHeader>
      <Separator />
      <ModalBody>
        <div className={s.opWrapper}>
          <Typography variant="regular" weight="medium" color="text-body-1">
            Please note that you will not be able to change your mobile number
            after this for a year. Please select a previously used mobile number
            to continue
          </Typography>
          <div className={s.opContainer}>
            <div className={s.opSubContainer}>
              <RadioButton
                size="sm"
                defaultChecked
                onClick={() =>
                  setSelectedMobileNumber({
                    ...selectedMobileNumber,
                    mobileNumber: userInfo?.primaryNumber,
                  })
                }
              />
              <Typography
                variant="regular"
                weight="semi-bold"
                color="text-body-1"
              >
                {userInfo?.primaryNumber}
              </Typography>
            </div>
            {isCaptchaFlow && (
              <CaptchaSection
                isCaptchaEnabled={captcha?.isCaptchaEnabled}
                captchaWidgetRef={captcha?.captchaWidgetRef}
                widgetId={CAPTCHA_WIDGET_IDS.PROFILE_OLD_NUMBER_OTP}
                showCaptchaHint={false}
                onVerify={captcha?.handleCaptchaVerify || (() => {})}
                sentryData={{
                  mobileNumber: selectedMobileNumber?.mobileNumber,
                  dialCode: userInfo?.countryCode,
                }}
              />
            )}
            <Button
              fullWidth
              size="medium"
              variant="dark"
              disabled={
                !selectedMobileNumber ||
                (isCaptchaFlow && !captcha.isCaptchaReady())
              }
              onClick={handleRequestOtp}
            >
              Request OTP
            </Button>
          </div>
          {error && (
            <div className={s.errorMsg}>
              <ErrorIcon />
              <Typography variant="tiny" weight="semi-bold" color="error">
                {error}
              </Typography>
            </div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};

export default OldPhoneNumberModal;
