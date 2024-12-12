import React, { useState } from 'react';
import { Button, Typography, InputField } from '@pw-tech/omni-ui';
import GenericModal from './ModalComponent';
import s from '../styles/index.module.css';
import TimerComponent from './TimerComponent';
import OtpComponent from './OtpComponent';

const OTPVerificationModal = ({
  isOpen,
  onClose,
  otpInputConfig,
  data,
  onVerifyOtp,
  onResendOtp,
  isLoading,
  showResendTimer,
  editNumberIcon,
  onResendTimerEnd,
  handleFillEvent,
  handleOtpChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  otpInputConfig: any;
  data?: { countryCode: string; mobileNumber: string; isNewNumber: boolean };
  onVerifyOtp?: () => void;
  onResendOtp?: () => void;
  isLoading: () => boolean;
  showResendTimer: boolean;
  editNumberIcon?: string;
  onResendTimerEnd: () => void;
  handleFillEvent: (event: any) => void;
  handleOtpChange: (event: any) => void;
}) => {
  const [otp, setOtp] = useState<string>('');

  const onChange = () => {
    console.log("checking here")
  }

  return (
    <GenericModal
      header={
        <Typography color="static-black" variant="heading3" weight="bold">
          OTP Verification
        </Typography>
      }
      body={
        <div className="text-center justify-center">
          <div className="mb-4">
            <div className='mb-[8px]'>
            <Typography variant="regular" className='text-[#3d3d3d]'>
              Please enter the {otpInputConfig?.otpLength} digit code sent to
            </Typography>
            </div>
            <div className="mb-[24px]">
              <Typography variant="regular" className='text-[#3d3d3d]' weight='bold'>
                {data?.countryCode} {data?.mobileNumber}
              </Typography>
              {data?.isNewNumber && (
                <img
                  className="edit-number-icon inline ml-1 cursor-pointer"
                  src={editNumberIcon}
                  alt="Edit Number"
                  onClick={() => console.log('Edit Number')}
                />
              )}
            </div>
          </div>

          {/* OTP Input */}
          
            <OtpComponent onChange={onChange}/>
         

          {/* Resend OTP Timer */}
          {showResendTimer && (
            <div className="mt-[24px] mb-[16px]">
              <TimerComponent seconds={30} onTimerEnd={onResendTimerEnd} />
            </div>
          )}

          {/* Resend OTP and Error Message */}
          <div className="font-medium text-base content-color">
            <Typography
              className={`${showResendTimer ? 'pointer-events-none' : ''} text-[#3d3d3d]`}
            >
              Didn't get an OTP?{' '}
              <span
                className="resend-btn text-sm ml-1 cursor-pointer"
                onClick={onResendOtp}
              >
                Resend
              </span>
            </Typography>
          </div>
        </div>
      }
      footer={
        <div className={`${s.modalFooter} ${s.fullWidthFooter}`}>
          <Button
            className="h-auto w-full"
            size="large"
            variant="primary"
            onClick={onVerifyOtp}
            disabled={!otp || isLoading()}
          >
            Verify OTP
          </Button>
        </div>
      }
      onCancel={onClose}
      isOpen={isOpen}
      size="small"
    />
  );
};

export default OTPVerificationModal;
