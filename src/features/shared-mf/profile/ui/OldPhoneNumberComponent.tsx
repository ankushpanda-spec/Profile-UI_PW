import React, { useState } from 'react';
import { Button, Typography, RadioButton } from '@pw-tech/omni-ui'; 
import GenericModal from './ModalComponent';
import s from '../styles/index.module.css';

const OldPhoneNumberModal = ({
  isOpen,
  onClose,
  userInfo,
  onRequestOtp,
}: {
  isOpen: boolean;
  onClose: () => void;
  userInfo?: { countryCode: string; primaryNumber: string };
  onRequestOtp: (selectedNumber: string) => void;
}) => {
  const [selectedMobileNumber, setSelectedMobileNumber] = useState<string | null>(null);

  const handleRequestOtp = () => {
    if (selectedMobileNumber) {
      onRequestOtp(selectedMobileNumber);
    }
  };

  const handleRadioChange = (phoneNumber: string) => {

  }

  return (
    <GenericModal
      header={
        <Typography color="static-black" variant="heading3" weight="bold">
          Select Mobile Number
        </Typography>
      }
      body={
        <div className="px-4">
          <Typography className="text-base leading-6 font-semibold text-[#3d3d3d]" color="static-black" variant="regular">
            <div className='mb-[24px]'>
            Please note that you will not be able to change your mobile number after this for a year. Please select a previously used mobile number to continue.
            </div>
          </Typography>

          {/* Radio Button with number beside it */}
          {userInfo && (
            <div className="flex items-center ">
              <RadioButton
                onChange={() => handleRadioChange(userInfo.primaryNumber)}
                variant="primary"
                size='sm'
              />
              <Typography variant="regular" className="ml-2 text-base leading-6 text-[#3d3d3d]">
                {userInfo.countryCode} {userInfo.primaryNumber}
              </Typography>
            </div>
          )}
        </div>
      }
      footer={
        <div className={`${s.modalFooter} ${s.fullWidthFooter}`}>
          <Button
            className="h-auto w-full"
            size="large"
            variant="primary"
            onClick={handleRequestOtp}
            disabled={!selectedMobileNumber}
          >
            Request OTP
          </Button>
        </div>
      }
      onCancel={onClose}
      isOpen={isOpen}
      size="small"
    />
  );
};

export default OldPhoneNumberModal;
