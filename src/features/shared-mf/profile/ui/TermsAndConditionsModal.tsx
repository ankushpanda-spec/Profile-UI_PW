
import { Button, Typography } from '@pw-tech/omni-ui';
import s from "../styles/index.module.css";
import GenericModal from './ModalComponent';
import BorderDivider from './BorderDivider';
import { fetchStates } from '../api';
import { useEffect } from 'react';

const TermsAndConditionsModal = ({
  isOpen,
  onCancel,
  onUpdate,
}: {
  isOpen: boolean;
  onCancel: () => void; // Function to handle cancel action
  onUpdate: () => void; // Function to handle update action
}) => {


  return (
    <GenericModal
      header={
        <Typography color="static-black" variant="heading3" weight="bold">
          Terms and Conditions
        </Typography>
      }
      body={
        
        <div>
          <Typography variant='regular'>
            <div className='mb-[24px] text-base leading-6 font-semibold text-[#3d3d3d]'>
            Before continuing to change the mobile number, please agree to the terms and conditions:
            </div>
          </Typography>
          <ul className={`${s.termsList} list-disc pl-5`}>
            <li>
              <Typography variant="regular" className='mb-[8px] text-[#3d3d3d] font-semibold'>
                You can only change your number once in 365 days.
              </Typography>
            </li>
            <li>
              <Typography variant="regular" className='mb-[8px] text-[#3d3d3d] font-semibold'>
                You won't be able to access your batches and content on the old number.
              </Typography>
            </li>
          </ul>
        </div>
      }
      footer={
        <div className={`${s.modalFooter} ${s.fullWidthFooter}`}>
          <Button
            className="h-auto w-full"
            size="large"
            variant="lowFocus"
            onClick={onCancel}
          >
            Decline
          </Button>
          <Button
            className="h-auto w-full"
            size="large"
            variant="primary"
            onClick={onUpdate}
          >
            Accept
          </Button>
        </div>
      }
      onCancel={onCancel}
      isOpen={isOpen}
      size="small"
    />
  );
};

export default TermsAndConditionsModal;
