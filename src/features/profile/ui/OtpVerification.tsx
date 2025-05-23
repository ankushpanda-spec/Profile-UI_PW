import React, {useEffect, useRef, useState} from 'react';
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
import EditIcon from '@/shared/assets/icons/EditIcon';
import {fetchOtp, verifyOtp} from '../api';
import getErrorMessage from '@/shared/services/showErrorService';
import useLoader from '@/shared/hooks/showLoader';
import ErrorIcon from '@/shared/assets/icons/ErrorIcon';
import {webSDK} from '@/shared/services/sdk';
import {ApiResponse, OtpVerificationProps} from '../types';
import {useUser} from '@pw-tech/omni-context';
import {User} from '@pw-tech/web-sdk';

const OTPVerificationModal: React.FC<OtpVerificationProps> = ({
  isOpen,
  setActiveModal,
  selectedMobileNumber,
  numberChangeRequestId,
  handleEditModalOpen,
  nextActiveModal,
  isNewNumber,
  showEditIcon,
}) => {
  const {showLoader, hideLoader} = useLoader();
  const {user: userInfo} = useUser();
  const {setUser} = useUser();
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showResendMessage, setShowResendMessage] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    // Clean up the interval on unmount or when timeLeft changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeLeft, setTimeLeft]); // Added setTimeLeft to dependencies
  const handleClose = () => {
    setIsModalOpen(false);
    handleEditModalOpen();
  };

  const handleOnChange = (newOtp: string) => {
    setOtp(newOtp);
  };

  const updateNumberInGlobalState = () => {
    if (selectedMobileNumber && userInfo) {
      const newUserInfo = {
        ...userInfo,
        primaryNumber: selectedMobileNumber.mobileNumber,
        countryCode: selectedMobileNumber.countryCode,
        countryGroup: selectedMobileNumber.countryGroup,
      };
      webSDK.setUser = newUserInfo as User;
      setUser(newUserInfo);
    }
  };

  const onResendOtp = async () => {
    setError('');
    showLoader('Sending OTP...');
    try {
      const apiData = {
        phone: selectedMobileNumber.mobileNumber,
        countryCode: selectedMobileNumber.countryCode,
        isNewNumber,
        organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
        requestId: numberChangeRequestId || '',
      };
      const res: ApiResponse = await fetchOtp(apiData);
      if (res.success) {
        hideLoader();
        setShowResendMessage(true);
        setTimeLeft(30);
      } else {
        setError(res.error?.message || '');
      }
    } catch (_error) {
      const errorObj = getErrorMessage(_error);
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
        phone: selectedMobileNumber.mobileNumber,
        countryCode: selectedMobileNumber.countryCode,
        isNewNumber,
        organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
        otp,
        requestId: numberChangeRequestId || '',
      };
      const res: ApiResponse = await verifyOtp(apiData);
      if (res.success) {
        if (isNewNumber) {
          updateNumberInGlobalState();
        }
        setActiveModal(nextActiveModal);
      } else {
        setError(res?.message || 'Something Went Wrong');
      }
      hideLoader();
    } catch (_error) {
      const errorObj = getErrorMessage(_error);
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
              <Typography variant="regular" weight="medium" color="text-body-1">
                Please enter the 6 digit code sent on
              </Typography>
              <div className={s.otpText}>
                <Typography
                  color="text-heading"
                  variant="regular"
                  weight="semi-bold"
                >
                  {selectedMobileNumber.countryCode}{' '}
                  {selectedMobileNumber.mobileNumber}
                </Typography>
                {showEditIcon && (
                  <EditIcon
                    onClick={() => setActiveModal('newNumberComponent')}
                  />
                )}
              </div>
            </div>

            {/* OTP Input */}

            <OTP length={6} value={otp} onChange={handleOnChange} />

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
                Didn&apos;t get an OTP?{' '}
              </Typography>
              <Button
                onClick={() => {
                  setOtp('');
                  onResendOtp();
                }}
                size="medium"
                variant="link"
                className="text-[#0592CB] underline"
                disabled={timeLeft > 0}
              >
                Resend
              </Button>
            </div>
          </div>
          <Button
            fullWidth
            disabled={otp.length !== 6}
            onClick={handleVerifyOtp}
          >
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
