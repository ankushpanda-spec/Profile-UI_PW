import {Typography, ModalBody, Modal} from '@pw-tech/omni-ui';
import s from '../styles/index.module.css';
import Success from '@/shared/assets/images';
import {UpdateSuccessProps} from '../types';

const UpdateSuccessModal: React.FC<UpdateSuccessProps> = ({
  isOpen,
  onClose,
  primaryMessage = 'Your number has been successfully changed!',
  secondaryMessage = 'Your all batches and other content will be transferred to your new number within 2 hour',
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="small">
      <ModalBody>
        <div className={s.usContainer}>
          <div
            className={s.usImageContainer}
            style={{
              background: `url(${Success})  50% / cover no-repeat`,
            }}
          >
            {/* <img src={Success} alt="success-gif" className="h-full w-full" /> */}
          </div>
          <div className={s.usMsgContainer}>
            <Typography
              variant="regular"
              weight="semi-bold"
              color="text-heading"
            >
              {primaryMessage}
            </Typography>
            <Typography color="text-body-1" variant="small" weight="medium">
              {secondaryMessage}
            </Typography>
          </div>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default UpdateSuccessModal;
