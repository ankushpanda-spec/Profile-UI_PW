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
import {fetchOtp} from '../api';
import getErrorMessage from '../services/showErrorService';
import {useLoader} from '@/shared/hooks/showLoader';
import { OldPhoneNumberProps } from '../types';

const OldPhoneNumberModal: React.FC<OldPhoneNumberProps> = ({
  isOpen,
  setActiveModal,
  numberChangeRequestId,
  selectedMobileNumber,
  setSelectedMobileNumber,
  handleEditModalOpen,
  userInfo,
}) => {
  const {showLoader, hideLoader} = useLoader();
  const [error, setError] = useState<string>('');

  const [isModalOpen, setIsModalOpen] = useState<boolean>(isOpen);

  const handleClose = () => {
    setIsModalOpen(false);
    setActiveModal('');
    handleEditModalOpen();
  };

  const handleRequestOtp = async () => {
    showLoader('Sending OTP...');
    try {
      const apiData = {
        phone: selectedMobileNumber,
        countryCode: userInfo?.countryCode,
        isNewNumber: false,
        organizationId: process.env.PUBLIC_ORGANISATION_ID || '',
        requestId: numberChangeRequestId || '',
      };
      const res: any = await fetchOtp(apiData);
      if (res.success) {
        setActiveModal('otpVerification');
      } else {
        setError(res.error);
      }
    } catch (error) {
      const errorObj = getErrorMessage(error);
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
                onClick={() => setSelectedMobileNumber(userInfo?.primaryNumber)}
              />
              <Typography variant="regular" weight="medium" color="text-body-1">
                {userInfo?.primaryNumber}
              </Typography>
            </div>
            <Button
              fullWidth
              size="large"
              disabled={!selectedMobileNumber}
              onClick={handleRequestOtp}
            >
              Request OTP
            </Button>
          </div>
          {error && (
            <div className={s.errorMsg}>
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
