import React, {useState} from 'react';
import {
  Button,
  Typography,
  RadioButton,
  InputField,
  ModalHeader,
  ModalFooter,
  Modal,
  ModalBody,
  Separator,
  Loader,
} from '@pw-tech/omni-ui';
import GenericModal from './ModalComponent';
import s from '../styles/index.module.css';
import {fetchOtp} from '../api';
import LoaderModal from './components/loader/LoaderModalComponent';
import OTPVerificationModal from './OtpVerification';
import getErrorMessage from '../services/showErrorService';
import { useLoader } from '@/hooks/showLoader';

const NewNumberVerification = ({
  isOpen,
  handleEditModalOpen,
  setActiveModal,
  numberChangeRequestId,
  setNewCountryCode,
  setNewInputMobileNumber,
  newInputMobileNumber,
  newCountryCode,
  isNewNumber,
}: {
  isOpen: boolean;
  handleEditModalOpen: () => void;
  numberChangeRequestId: string;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  setNewCountryCode:React.Dispatch<React.SetStateAction<string>>;
  setNewInputMobileNumber:React.Dispatch<React.SetStateAction<string>>;
  newInputMobileNumber:string;
  newCountryCode:string;
  isNewNumber:boolean;
}) => {
  const {showLoader , hideLoader} = useLoader()
  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [inputErrorMessageShown, setInputErrorMessageShown] =
    useState<boolean>(false);
  const [isModalOpen , setIsModalOpen] = useState<boolean>(isOpen);
  
  const handleClose = () => {
    setIsModalOpen(false);
    setActiveModal('');
    handleEditModalOpen()
  
  } 
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // Reset the error message and visibility
    if (inputErrorMessageShown) {
      setInputErrorMessage('');
      setInputErrorMessageShown(false);
    }

    setNewInputMobileNumber(value);
  };
  console.log('numberChangeRequestId', numberChangeRequestId);

  const onContinueClick = async () => {
    const errorMessage = checkMobileNumber(newInputMobileNumber);
    if (errorMessage) {
      setInputErrorMessage(errorMessage);
      setInputErrorMessageShown(true);
      return;
    }
    const apiData = {
      phone: newInputMobileNumber,
      countryCode: newCountryCode,
      isNewNumber: isNewNumber,
      organizationId: process.env.PUBLIC_ORGANISATION_ID,
      requestId: numberChangeRequestId,
    };
    try {
      showLoader("Sending OTP...")
      const res: any = await fetchOtp(apiData);
       
      if (res?.success) {
        setActiveModal('newNumberOtpVerification');
      } else {
        if (res?.message) {
          setInputErrorMessage(res.message);
          setInputErrorMessageShown(true);
        } else {
          throw new Error('');
        }
      }
      hideLoader();
    } catch (err) {
      const errorObj = getErrorMessage(err);

      setInputErrorMessage(errorObj.message);
      setInputErrorMessageShown(true);

     hideLoader();
    } finally {
      hideLoader();
    }
  };

  const checkMobileNumber = (mobileNumber: string): string => {
    if (!mobileNumber) {
      return 'Please enter a vaild mobile number';
    }
    if (newCountryCode === '+91' && mobileNumber.length !== 10) {
      return 'Please enter a valid 10 digits number';
    }
    if (newCountryCode !== '+91' && mobileNumber.length < 4) {
      return 'Please enter a number with minimum 4 digits';
    }
    return '';
  };
  const mobileNumberInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      onContinueClick();
    }
  };

  return (
    <>
      <Modal isOpen={isModalOpen} size="small" onClose={handleClose}>
        <ModalHeader>
          <Typography color="static-black" variant="heading3" weight="bold">
            Enter New Number
          </Typography>
        </ModalHeader>
        <Separator />
        <ModalBody>
          <div className="flex flex-col gap-24">
            <Typography
              weight="semi-bold"
              color="static-black"
              variant="regular"
            >
              OTP will be sent on this number for verification.
            </Typography>
            <InputField
              label="Mobile Number"
              placeholder="Enter your phone number"
              type="number"
              fullWidth
              message={
                inputErrorMessageShown
                  ? inputErrorMessage
                  : "Your contents won't be accessible on the old number."
              }
              onChange={handleInputChange}
              onKeyDown={mobileNumberInputKeyPress}
              error={inputErrorMessageShown}
            />
          </div>

        
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            className="h-auto w-full"
            size="large"
            variant="primary"
            onClick={onContinueClick}
          >
            Continue
          </Button>

          {errorMessage && <Typography> {errorMessage}</Typography>}
        </ModalFooter>
      </Modal>
    </>
  );
};

export default NewNumberVerification;
