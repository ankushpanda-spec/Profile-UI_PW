import { Typography,ModalHeader, ModalBody, Modal} from '@pw-tech/omni-ui'; 
import s from '../styles/index.module.css';
import {Success} from "@/assets/images"

const UpdateSuccessModal = ({
  isOpen,
  onClose,
  primaryMessage = "Your number has been successfully changed!",
  secondaryMessage="Your all batches and other content will be transferred to your new number within 2 hour",
 
}: {
  isOpen: boolean;
  onClose: () => void;
  primaryMessage?: string;
  secondaryMessage?:string;
}) => {
  
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="small">
    
      <ModalBody>
       <div className='flex gap-20 p-20 flex-col items-center'>
        <div className='w-[104px] h-[102px] flex items-center justify-center'>
         <img src={Success} alt="success-gif" className='w-full h-full'/>
         
        </div>
        <div className='flex flex-col gap-8 items-center'>
            <Typography variant="regular" weight="semi-bold" color="text-heading">
            {primaryMessage}
            </Typography>
            <Typography color="text-body-1" variant="small" weight='medium'>
            {secondaryMessage}
            </Typography>
         </div>
       </div>
      </ModalBody>
     
    </Modal>
  );
};

export default UpdateSuccessModal;
