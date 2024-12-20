import {
  Typography,
  ModalHeader,
  ModalBody,
  Modal,
  Separator,
} from '@pw-tech/omni-ui';

const OfflineUserInstructionsModal = ({
  isOpen,
  onClose,
  body,
}: {
  isOpen: boolean;
  onClose: () => void;
  body: string;
}) => {
    console.log("body" , body);
  return (
    <Modal onClose={onClose} isOpen={isOpen} size="small">
      <ModalHeader>
        <Typography weight="semi-bold" variant="heading4">Instructions</Typography>
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
