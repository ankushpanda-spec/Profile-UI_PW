import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Button,
  Typography,
  OTP,
  ModalHeader,
  ModalBody,
  Modal,
  Separator,
  ModalFooter,
} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';
import EditIcon from '@/shared/assets/icons/EditIcon';
import {verifyOtp} from '../api';
import getErrorMessage from '@/shared/services/showErrorService';
import useLoader from '@/shared/hooks/showLoader';
import ErrorIcon from '@/shared/assets/icons/ErrorIcon';
import {webSDK} from '@/shared/services/sdk';
import {ApiResponse, OtpVerificationProps} from '../types';
import {useUser} from '@pw-tech/omni-context';
import {User} from '@pw-tech/web-sdk';
import useMyOrders, {MyOrder} from '../hooks/useMyOrders';
import BatchSelectionModal from './BatchSelectionModal';
import useSecureSendOtp from '../hooks/useSecureSendOtp';
import {CaptchaSection} from '@/shared/components/captcha/CaptchaSection';
import {CAPTCHA_WIDGET_IDS} from '@/shared/components/captcha/constants';

const OTPVerificationModal: React.FC<OtpVerificationProps> = ({
  isOpen,
  setActiveModal,
  selectedMobileNumber,
  numberChangeRequestId,
  handleEditModalOpen,
  nextActiveModal,
  isNewNumber,
  showEditIcon,
  isNumberAlreadyRegistered: propIsNumberAlreadyRegistered,
}) => {
  const {showLoader, hideLoader} = useLoader();
  const {user: userInfo, setUser} = useUser();
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showResendMessage, setShowResendMessage] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);
  const [showBatchesModal, setShowBatchesModal] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]); // stores orderIds
  const [hasOtpError, setHasOtpError] = useState<boolean>(false); // tracks if OTP verification failed
  const {isCaptchaFlow, sendOtp, captcha} = useSecureSendOtp(
    CAPTCHA_WIDGET_IDS.PROFILE_RESEND_OTP
  );

  const {
    data: purchasedBatchesData,
    isLoading: isBatchesLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useMyOrders({
    enabled: showBatchesModal,
    status: 'SUCCESS',
    limit: 10,
  });

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

  const batches = useMemo(() => {
    return purchasedBatchesData
      .filter(
        (item: MyOrder) =>
          [
            'BATCH',
            'TEST',
            'TEST_CATEGORY',
            'TEST_CATEGORY_MODE',
            'PASS',
          ].includes(item.typeOfOrder) &&
          !['CASH', 'FREE'].includes(item.modeOfPayment)
      )
      .map((item: MyOrder) => ({
        orderId: item.orderId,
        itemName: item.itemName,
      }));
  }, [purchasedBatchesData]);

  const handleBatchToggle = (orderId: string) => {
    setSelectedBatches(prev =>
      prev.includes(orderId)
        ? prev.filter(b => b !== orderId)
        : [...prev, orderId]
    );
  };

  const updateNumberInGlobalState = () => {
    if (selectedMobileNumber && userInfo && !propIsNumberAlreadyRegistered) {
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

  const handleFinalVerify = async (orderIds: string[]) => {
    showLoader('Verifying OTP...');
    try {
      const apiData = {
        phone: selectedMobileNumber.mobileNumber,
        countryCode: selectedMobileNumber.countryCode,
        isNewNumber,
        organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
        otp,
        requestId: numberChangeRequestId || '',
        orderIds,
      };
      const res: ApiResponse = await verifyOtp(apiData);
      if (res.success) {
        updateNumberInGlobalState();
        setShowBatchesModal(false);
        setShowConfirmModal(false);
        setActiveModal(nextActiveModal);
      } else {
        setError(res?.message || 'Something Went Wrong');
        setHasOtpError(true);
      }
    } catch (_error) {
      const errorObj = getErrorMessage(_error);
      setError(errorObj.message);
      setHasOtpError(true);
    } finally {
      hideLoader();
    }
  };

  const handleSaveBatches = () => {
    setShowBatchesModal(false);
    setShowConfirmModal(true);
  };

  const onResendOtp = async () => {
    if (isCaptchaFlow && !captcha.isCaptchaReady()) {
      captcha.setShowCaptchaHint(true);
      return;
    }
    setError('');
    showLoader('Sending OTP...');
    try {
      const apiData = {
        phone: selectedMobileNumber.mobileNumber,
        countryCode: selectedMobileNumber.countryCode,
        isNewNumber,
        organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
        requestId: numberChangeRequestId || '',
        isNewShiftFlow: true,
      };
      const res: ApiResponse = await sendOtp(apiData);
      if (
        res.success ||
        (res.data &&
          (res.data as {isNumberAlreadyRegistered?: boolean})
            .isNumberAlreadyRegistered)
      ) {
        hideLoader();
        setShowResendMessage(true);
        setTimeLeft(30);
      } else {
        hideLoader();
        setError(res.error?.message || '');
      }
    } catch (_error) {
      const errorObj = getErrorMessage(_error);
      setError(errorObj.message);
      hideLoader();
    }
  };

  const handleVerifyOtp = async () => {
    if (!isNewNumber) {
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
          setActiveModal(nextActiveModal);
        } else {
          setError(res?.message || 'Something Went Wrong');
          setHasOtpError(true);
        }
      } catch (_error) {
        const errorObj = getErrorMessage(_error);
        setError(errorObj.message);
        setHasOtpError(true);
      } finally {
        hideLoader();
      }
      return;
    }

    if (propIsNumberAlreadyRegistered) {
      setIsModalOpen(false);
      setShowBatchesModal(true);
    } else {
      showLoader('Verifying OTP...');
      try {
        const apiData = {
          phone: selectedMobileNumber.mobileNumber,
          countryCode: selectedMobileNumber.countryCode,
          isNewNumber,
          organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
          otp,
          requestId: numberChangeRequestId || '',
          orderIds: [],
        };
        const res: ApiResponse = await verifyOtp(apiData);
        if (res.success) {
          updateNumberInGlobalState();
          setActiveModal(nextActiveModal);
        } else {
          setError(res?.message || 'Something Went Wrong');
          setHasOtpError(true);
        }
      } catch (_error) {
        const errorObj = getErrorMessage(_error);
        setError(errorObj.message);
        setHasOtpError(true);
      } finally {
        hideLoader();
      }
    }
  };

  return (
    <>
      <Modal size="small" isOpen={isModalOpen} onClose={handleClose}>
        <ModalHeader>
          <Typography
            color="text-heading"
            variant="heading4"
            weight="semi-bold"
          >
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

              {isCaptchaFlow && (
                <CaptchaSection
                  isCaptchaEnabled={captcha?.isCaptchaEnabled}
                  captchaWidgetRef={captcha?.captchaWidgetRef}
                  widgetId={CAPTCHA_WIDGET_IDS.PROFILE_RESEND_OTP}
                  showCaptchaHint={false}
                  onVerify={captcha?.handleCaptchaVerify || (() => {})}
                  sentryData={{
                    mobileNumber: selectedMobileNumber?.mobileNumber,
                    dialCode: selectedMobileNumber?.countryCode,
                  }}
                />
              )}

              <div className={s.otpText}>
                <Typography
                  color="text-body-1"
                  variant="regular"
                  weight="medium"
                >
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
                  disabled={
                    timeLeft > 0 || (isCaptchaFlow && !captcha.isCaptchaReady())
                  }
                >
                  Resend
                </Button>
              </div>
            </div>
            <Button
              fullWidth
              size="medium"
              variant="dark"
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

      {/* Batch Selection Modal */}
      <BatchSelectionModal
        isOpen={showBatchesModal}
        batches={batches}
        selectedBatches={selectedBatches}
        onBatchToggle={(orderId: string) => {
          handleBatchToggle(orderId);
        }}
        onSelectAll={() =>
          selectedBatches.length === batches.length
            ? setSelectedBatches([])
            : setSelectedBatches(batches.map(b => b.orderId))
        }
        onClose={() => {
          setShowBatchesModal(false);
          setIsModalOpen(true);
        }}
        onSave={handleSaveBatches}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isBatchesLoading={isBatchesLoading}
        fetchNextPage={() => fetchNextPage?.()}
      />

      {/* Confirm Number Change Modal */}
      <Modal
        isOpen={showConfirmModal}
        size="small"
        onClose={() => {
          setShowConfirmModal(false);
          setError('');
          if (hasOtpError) {
            setIsModalOpen(true);
            setHasOtpError(false);
          } else {
            setShowBatchesModal(true);
          }
        }}
      >
        <ModalHeader>
          <Typography
            color="text-heading"
            variant="heading4"
            weight="semi-bold"
          >
            Confirm Number Change
          </Typography>
        </ModalHeader>
        <Separator />
        <ModalBody>
          <div className={s.confirmModalBody}>
            <Typography variant="regular" color="text-body-1">
              Confirm the change in registered mobile no. to{' '}
              <strong>
                {selectedMobileNumber.countryCode}-
                {selectedMobileNumber.mobileNumber}
              </strong>{' '}
              for the following Batches?
            </Typography>
            <div className={s.confirmBatchList}>
              {batches
                .filter(b => selectedBatches.includes(b.orderId))
                .map(batch => (
                  <div key={batch.orderId} className={s.confirmBatchItem}>
                    <div className={s.confirmBatchDot} />
                    <Typography variant="regular" color="text-body-1">
                      {batch.itemName}
                    </Typography>
                  </div>
                ))}
            </div>
            <div className={s.confirmWarning}>
              <Typography variant="regular" color="warning-700" weight="medium">
                Selected batches content won&apos;t be accessible on the old
                number.
              </Typography>
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
        <ModalFooter>
          <div className={s.confirmFooterButtons}>
            <Button
              type="button"
              fullWidth
              size="medium"
              variant="lowFocus"
              onClick={() => {
                setShowConfirmModal(false);
                setError('');
                if (hasOtpError) {
                  setIsModalOpen(true);
                  setHasOtpError(false);
                } else {
                  setShowBatchesModal(true);
                }
              }}
            >
              Back
            </Button>
            <Button
              type="button"
              fullWidth
              size="medium"
              variant="dark"
              onClick={() => handleFinalVerify(selectedBatches)}
            >
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default OTPVerificationModal;
