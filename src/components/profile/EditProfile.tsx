import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Typography,
} from '@pw-tech/omni-ui';
import s from "./index.module.css";
const EditProfileModal = ({
  modalHeader,
  onCancel,
  isOpen,
  onClose,
}: {
  modalHeader: string;
  modalBody: string;
  onCancel: () => void;
  isOpen: boolean;
  onClose: (data: any) => void;
}) => {
  return (
    <Modal
      closeOnOutsideClick
      onClose={onCancel}
      showCloseIcon
      size="extra-small"
      isOpen={isOpen}
    >
      <ModalHeader>
        <Typography color="static-black" variant="heading4" weight="semi-bold">
          {modalHeader}
        </Typography>
      </ModalHeader>
      {/* <ModalSeparator /> */}
      <ModalBody>
        <form>
          <div>First Name</div>
        </form>
      </ModalBody>
      <ModalFooter>
        <div className={s.modalFooter}>
          <Button
            className="h-auto"
            size="small"
            variant="secondary"
            onClick={onCancel}
          >
            Close
          </Button>
          <Button
            className="h-auto"
            size="small"
            variant="primary"
          >
            Update & Save
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default EditProfileModal;
