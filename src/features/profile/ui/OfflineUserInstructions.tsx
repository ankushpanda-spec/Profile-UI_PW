import {
  Typography,
  ModalHeader,
  ModalBody,
  Modal,
  Separator,
} from '@pw-tech/omni-ui';
import {OfflineUserInstructionsProps} from '../types';

const OfflineUserInstructionsModal: React.FC<OfflineUserInstructionsProps> = ({
  isOpen,
  onClose,
  body,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="small">
      <ModalHeader>
        <Typography weight="semi-bold" variant="heading4">
          Instructions
        </Typography>
      </ModalHeader>
      <Separator />
      <ModalBody>
        <Typography
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      </ModalBody>
    </Modal>
  );
};

export default OfflineUserInstructionsModal;
