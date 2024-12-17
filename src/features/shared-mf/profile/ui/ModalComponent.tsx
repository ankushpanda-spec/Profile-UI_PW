import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Separator,
} from '@pw-tech/omni-ui';


const GenericModal = ({
  header,
  body,
  footer,
  onCancel,
  isOpen,
  size = "medium",
  closeOnOutsideClick = true,
  showCloseIcon = true,
  showBorder = true, // New prop to enable/disable the border below ModalHeader
}: {
  header: React.ReactNode; // Accepts JSX for the header
  body: React.ReactNode;   // Accepts JSX for the body
  footer?: React.ReactNode; // Accepts JSX for the footer (optional)
  onCancel: () => void;    // Function to call on cancel/close
  isOpen: boolean;         // Determines if the modal is open
  size?: "small" | "medium" | "large" | "extra-small"; // Modal size
  closeOnOutsideClick?: boolean; // Enable/disable closing modal on outside click
  showCloseIcon?: boolean; // Enable/disable close icon
  showBorder?: boolean; // Enable/disable border below ModalHeader
}) => {
  return (
    <Modal
      closeOnOutsideClick={closeOnOutsideClick}
      onClose={onCancel}
      showCloseIcon={showCloseIcon}
      size={size}
      isOpen={isOpen}
    >
      {header && (
        <ModalHeader>
          {header}    
        </ModalHeader>
      )}
      {showBorder && <Separator/>}
      <ModalBody>{body}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
};

export default GenericModal;
