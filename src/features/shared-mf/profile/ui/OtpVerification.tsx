import React, {useEffect, useState} from 'react';
import {
  Button,
  Typography,
  OTP,
  ModalHeader,
  ModalBody,
  Modal,
  Separator,
} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';
import EditIcon from '@/assets/icons/EditIcon';
import {fetchOtp, verifyOtp} from '../api';
import getErrorMessage from '../services/showErrorService';
import {useLoader} from '@/hooks/showLoader';
import ErrorIcon from '@/assets/icons/ErrorIcon';
import {webSDK} from '@/integration';

const OTPVerificationModal = ({
  isOpen,
  setActiveModal,
  selectedMobileNumber,
  numberChangeRequestId,
  handleEditModalOpen,
  nextActiveModal,
  isNewNumber,
  countryCode,
  showEditIcon,
  userInfo,
}: {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  selectedMobileNumber: string;
  numberChangeRequestId: string | undefined;
  handleEditModalOpen: () => void;
  nextActiveModal: string;
  isNewNumber: boolean;
  countryCode: string;
  showEditIcon: boolean;
  userInfo: any;
}) => {
  const {showLoader, hideLoader} = useLoader();
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showResendMessage, setShowResendMessage] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  const handleClose = () => {
    setIsModalOpen(false);
    handleEditModalOpen();
  };

  useEffect(() => {
    if (timeLeft <= 0) return; // If the timer is already done, no need to set up another interval

    const timerInterval = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timerInterval); // Stop the timer when it reaches 0
          return 0; // Ensures the timer reaches 0
        }
        return prevTime - 1; // Decrease the time by 1 second
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(timerInterval);
  }, [timeLeft]);
  const handleOTPComplete = (otp: number) => {
    setOtp(otp.toString());
  };

  const updateNumberInGlobalState = () => {
    if (selectedMobileNumber && userInfo) {
      const newUserInfo = {...userInfo, primaryNumber: selectedMobileNumber};
      webSDK.setUser = newUserInfo;
    }
  };

  const onResendOtp = async () => {
    setError('');
    showLoader('Sending OTP...');
    try {
      const apiData = {
        phone: selectedMobileNumber,
        countryCode: countryCode,
        isNewNumber: isNewNumber,
        organizationId: process.env.PUBLIC_ORGANISATION_ID || "",
        requestId: numberChangeRequestId || '',
      };
      const res: any = await fetchOtp(apiData);
      if (res.success) {
        hideLoader();
        setShowResendMessage(true);
        setTimeLeft(30);
      } else {
        setError(res.error);
      }
    } catch (error) {
      const errorObj = getErrorMessage(error);
      setError(errorObj.message);
      hideLoader();
    } finally {
      hideLoader();
      setShowResendMessage(true);
      setTimeLeft(30);
    }
  };

  const handleVerifyOtp = async () => {
    showLoader('Verifying OTP...');
    try {
      const apiData = {
        phone: selectedMobileNumber,
        countryCode: countryCode,
        isNewNumber: isNewNumber,
        organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
        otp: otp,
        requestId: numberChangeRequestId || '',
      };
      const res: any = await verifyOtp(apiData);
      if (res.success) {
        if (isNewNumber) {
          updateNumberInGlobalState();
        }
        setActiveModal(nextActiveModal);
      } else {
        setError(res?.message || '');
      }
      hideLoader();
    } catch (error) {
      const errorObj = getErrorMessage(error);
      setError(errorObj.message);
      hideLoader();
    } finally {
      hideLoader();
    }
  };

  return (
    <Modal size="small" isOpen={isModalOpen} onClose={handleClose}>
      <ModalHeader>
        <Typography color="text-heading" variant="heading4" weight="semi-bold">
          OTP Verification
        </Typography>
      </ModalHeader>
      <Separator />
      <ModalBody>
        <div className={s.otpWrapper}>
          <div className={s.otpContainer}>
              <div className={s.otpSubContainer}>
                <Typography
                  variant="regular"
                  weight="medium"
                  color="text-body-1"
                >
                  Please enter the 6 digit code sent on
                </Typography>
                <div className={s.otpText}>
                  <Typography
                    color="text-heading"
                    variant="regular"
                    weight="semi-bold"
                  >
                    {countryCode} {selectedMobileNumber}
                  </Typography>
                  {showEditIcon && (
                    <EditIcon
                      onClick={() => setActiveModal('newNumberComponent')}
                    />
                  )}
                </div>
            </div>

            {/* OTP Input */}

            <OTP length={6} onOTPComplete={handleOTPComplete} />

            {/* Resend OTP Timer */}
            {showResendMessage && (
              <Typography color="success" variant="regular" weight="medium">
                OTP has been resent
              </Typography>
            )}
            {timeLeft > 0 && (
              <Typography
                color="static-black"
                variant="regular"
                weight="medium"
              >
                {timeLeft} seconds
              </Typography>
            )}

            <div className={s.otpText}>
              <Typography color="text-body-1" variant="regular" weight="medium">
                Didn't get an OTP?{' '}
              </Typography>
              <Button
                onClick={onResendOtp}
                size="medium"
                variant="link"
                className="text-[#0592CB] underline"
                disabled={timeLeft > 0}
              >
                Resend
              </Button>
            </div>
          </div>
          <Button fullWidth disabled={!otp} onClick={handleVerifyOtp}>
            Verify OTP
          </Button>
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

export default OTPVerificationModal;
