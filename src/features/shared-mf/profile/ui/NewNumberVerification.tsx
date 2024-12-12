import React, { useState } from 'react';
import { Button, Typography, RadioButton, InputField } from '@pw-tech/omni-ui'; 
import GenericModal from './ModalComponent';
import s from '../styles/index.module.css';

const NewNumberVerification = ({
  isOpen,
  onClose,
  userInfo,
 
}: {
  isOpen: boolean;
  onClose: () => void;
  userInfo?: { countryCode: string; primaryNumber: string };
//   onRequestOtp: (selectedNumber: string) => void;
}) => {
  const [selectedMobileNumber, setSelectedMobileNumber] = useState<string | null>(null);

  const handleRequestOtp = () => {
    if (selectedMobileNumber) {
    //   onRequestOtp(selectedMobileNumber);
    }
  };


  return (
    <GenericModal
      header={
        <Typography color="static-black" variant="heading3" weight="bold">
          Enter New Number
        </Typography>
      }
      body={
        <div className="px-4">
          <Typography className="text-base leading-6 font-semibold text-[#3d3d3d]" color="static-black" variant="regular">
            <div className='mb-[24px]'>
            OTP will be sent on this number for verification.
            </div>
          </Typography>
          <InputField
            label="Mobile Number"
            onBlur={function noRefCheck(){}}
            onChange={function noRefCheck(){}}
            onClick={function noRefCheck(){}}
            onFocus={function noRefCheck(){}}
            placeholder="Enter your phone number"
            required
            type="number"
            fullWidth
            message="Your contents won't be accessible on the old number."
            />
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
            Continue
          </Button>
        </div>
      }
      onCancel={onClose}
      isOpen={isOpen}
      size="small"
    />
  );
};

export default NewNumberVerification;
