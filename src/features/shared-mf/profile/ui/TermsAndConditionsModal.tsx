import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Typography,
  Modal,
} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';
import {useState} from 'react';

const TermsAndConditionsModal = ({
  isOpen,
  setActiveModal,
  
  handleEditModalOpen,
}: {
  isOpen: boolean;
  setActiveModal: React.Dispatch<React.SetStateAction<string>>;

  handleEditModalOpen: () => void;
}) => {

  const [isModalOpen , setIsModalOpen] = useState<boolean>(isOpen);
  
  const handleClose = () => {
    setIsModalOpen(false);
    setActiveModal('');
    handleEditModalOpen()
  } 
  
  return (
    <Modal isOpen={isModalOpen} size="small" onClose={handleClose}>
      <ModalHeader>
        <Typography color="static-black" variant="heading4" weight="semi-bold">
          Terms and Conditions
        </Typography>
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col items-start gap-24">
          <Typography variant="regular" weight="semi-bold" color="text-body-1">
            Before continuing to change the mobile number, please agree to the
            terms and conditions:
          </Typography>
          <ul className={`${s.termsList} list-disc pl-5`}>
            <li>
              <Typography variant="regular" color="text-body-1" weight="medium">
                You can only change your number once in 365 days.
              </Typography>
            </li>
            <li>
              <Typography variant="regular" color="text-body-1">
                You won't be able to access your batches and content on the old
                number.
              </Typography>
            </li>
          </ul>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="flex items-start gap-16 self-stretch">
          <Button fullWidth size="large" variant="lowFocus" onClick={handleClose}>
            Decline
          </Button>
          <Button fullWidth size="large" variant="primary" onClick={() => setActiveModal('oldPhoneNumber')}>
            Accept
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default TermsAndConditionsModal;
