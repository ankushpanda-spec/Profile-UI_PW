import React, {useEffect, useState} from 'react';
import {
  Button,
  Typography,
  OTP,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Modal,
  Separator,
} from '@pw-tech/omni-ui';
import GenericModal from './ModalComponent';
import s from '../styles/index.module.css';
import TimerComponent from './TimerComponent';
import EditIcon from '@/assets/icons/EditIcon';
import {useUser} from '@pw-tech/omni-context';
import {fetchOtp, verifyOtp} from '../api';
import LoaderModal from './components/loader/LoaderModalComponent';
import { count } from 'console';

const OTPVerificationModal = ({
  isOpen,
  setActiveModal,
  selectedMobileNumber,
  numberChangeRequestId,
  handleEditModalOpen,
  nextActiveModal,
  isNewNumber,
  countryCode,
}: {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  selectedMobileNumber: string;
  numberChangeRequestId: string;
  handleEditModalOpen: () => void;
  nextActiveModal: string;
  isNewNumber:boolean;
  countryCode: string;
}) => {
  const {user , setUser} = useUser();
  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [showResendMessage, setShowResendMessage] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
 
  useEffect(() => {
    if (timeLeft <= 0) return; // If the timer is already done, no need to set up another interval

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
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

  const updateNumberInGlobalState =()=> {
    if (selectedMobileNumber &&  user) {
      setUser({
        ...user,
        primaryNumber: selectedMobileNumber,
      });
    
    }
  }

  const onResendOtp = async () => {
    
    setLoading(true);
    setLoadingMessage('Sending OTP...');
    try {
      const apiData = {
        phone: selectedMobileNumber,
        countryCode: countryCode,
        isNewNumber: isNewNumber,
        organizationId: process.env.PUBLIC_ORGANISATION_ID,
        requestId: numberChangeRequestId,
      };
      const res: any = await fetchOtp(apiData);
      if (res.success) {
        setLoading(false);
        setShowResendMessage(true);
        setTimeLeft(30);
      } else {
        setError(res.error);
      }
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
      setShowResendMessage(true);
      setTimeLeft(30);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    setLoadingMessage('Verifying OTP...');
    try {
      const apiData = {
        phone: selectedMobileNumber,
        countryCode: countryCode,
        isNewNumber: isNewNumber,
        organizationId: process.env.PUBLIC_ORGANISATION_ID,
        otp: otp,
        requestId: numberChangeRequestId,
      };
      const res: any = await verifyOtp(apiData);
      if (res.success) {
        if(isNewNumber){
         
          updateNumberInGlobalState();
        }
        setActiveModal( nextActiveModal);
       
      } else {
        setError(res?.message || '');
      
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal size="small" isOpen={isOpen} onClose={handleEditModalOpen}>
      <ModalHeader>
        <Typography color="text-heading" variant="heading4" weight="semi-bold">
          OTP Verification
        </Typography>
      </ModalHeader>
      <Separator />
      <ModalBody>
        <div className="flex w-full flex-col items-center justify-center gap-20 pb-8">
          <div className="flex w-full flex-col items-center gap-16">
            <div className="h-[56px] w-[260px]">
              <div className="inline-flex flex-col items-center gap-8">
                <Typography
                  variant="regular"
                  weight="medium"
                  color="text-body-1"
                >
                  Please enter the 6 digit code sent on
                </Typography>
                <div className="flex items-start justify-center gap-4">
                  <Typography
                    color="text-heading"
                    variant="regular"
                    weight="semi-bold"
                  >
                    {countryCode} {selectedMobileNumber}
                  </Typography>
                  <EditIcon />
                </div>
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
      <Typography color="static-black" variant="regular" weight="medium">
        {timeLeft} seconds
      </Typography>
    )}
           

            {/* Resend OTP and Error Message */}
            <div className="flex items-center justify-center gap-4">
              <Typography color="text-body-1" variant="regular" weight="medium">
                Didn't get an OTP?{' '}
              </Typography>
              <Button
                onClick={onResendOtp}
                size="medium"
                variant="link"
                className="text-[#0592CB] underline"
              >
                Resend
              </Button>
            </div>
          </div>
          <Button fullWidth disabled={!otp} onClick={handleVerifyOtp}>
            Verify OTP
          </Button>
          <div className="flex items-center gap-6">
            <Typography variant="tiny" weight="semi-bold" color="error">
              The OTP you have entered is incorrect
            </Typography>
          </div>
        </div>
        {loading && <LoaderModal isOpen={loading} message={loadingMessage} />}
      </ModalBody>
    </Modal>
  );
};

export default OTPVerificationModal;
