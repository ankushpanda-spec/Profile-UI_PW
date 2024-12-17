import React, { useState } from 'react';
import { Button, Typography, RadioButton, ModalHeader, ModalBody, ModalFooter, Modal, Separator} from '@pw-tech/omni-ui'; 
import s from '../styles/index.module.css';
import { useUser } from '@pw-tech/omni-context';
import { fetchOtp } from '../api';
import LoaderModal from './components/loader/LoaderModalComponent';

const OldPhoneNumberModal = ({
  isOpen,
  setActiveModal,
  numberChangeRequestId,
  selectedMobileNumber,
  setSelectedMobileNumber,
  handleEditModalOpen
}: {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;
  numberChangeRequestId: string;
  selectedMobileNumber:string;
  setSelectedMobileNumber: React.Dispatch<React.SetStateAction<string>>
  handleEditModalOpen: () => void;

}) => {
  const {user} = useUser()
  
  const [error , setError] = useState();
  const [loading , setLoading] = useState<boolean>(false);
  
  const handleRequestOtp = async () => {
     setLoading(true)
      try{
        const apiData = {
          phone: selectedMobileNumber,
          countryCode: user?.countryCode,
          isNewNumber: false,
          organizationId: process.env.PUBLIC_ORGANISATION_ID,
          requestId:numberChangeRequestId,
        };
        const res: any = await fetchOtp(apiData)
        if(res.success){
           setActiveModal('otpVerification')
        }
        else{
         setError(res.error);
        }
      }
      catch(error){
        setError(error);
        setLoading(false);
      }
      finally{
       setLoading(false);
      }
  }


  return (
    <Modal isOpen={isOpen} size="small" onClose={handleEditModalOpen}>
     <ModalHeader>
        <Typography color="text-heading" variant="heading4" weight="semi-bold">
        Select Mobile Number
        </Typography>
        </ModalHeader>
        <Separator/>
      <ModalBody>
         <div className='flex flex-start gap-24 pb-8 flex-col'>
            <Typography variant="regular" weight="medium" color="text-body-1">
            Please note that you will not be able to change your mobile number after this for a year. Please select a previously used mobile number to continue
            </Typography>
            <div className='flex flex-col gap-24 self-stretch items-start justify-end'>
             <div className='flex items-center gap-8 py-8 px-8'>
              <RadioButton size="sm" onClick= {()=> setSelectedMobileNumber(user?.primaryNumber)}/>
              <Typography variant="regular" weight="medium" color="text-body-1">
              {user?.primaryNumber}
              </Typography>
             </div>
            <Button fullWidth size="large"
            disabled={!selectedMobileNumber} onClick = {handleRequestOtp} >Request OTP</Button>
            </div>
         </div>

          {loading && <LoaderModal isOpen={loading} message='Sending OTP...' />}
        </ModalBody>
     
    </Modal>
  );
};

export default OldPhoneNumberModal;
