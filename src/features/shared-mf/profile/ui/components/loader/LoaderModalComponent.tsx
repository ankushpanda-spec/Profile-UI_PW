import { Loader } from '@pw-tech/omni-ui';
import GenericModal from '../../ModalComponent';

const LoaderModal = ({
  isOpen,
  onCancel,
  message = 'Loading, please wait...',
}: {
  isOpen: boolean; // Determines if the modal is open
  onCancel: () => void; // Function to call when closing the modal
  message?: string; // Custom loading message (optional)
}) => {
  return (
    <GenericModal
      header={<div></div>} // No header
      body={
        <Loader
            message={message}
            size="medium"
            />
      }
      footer={<></>} // No footer
      isOpen={isOpen}
      onCancel={onCancel}
      size="medium"
      closeOnOutsideClick={false} // Prevent closing on outside click
      showCloseIcon={false} // No close icon
      showBorder={false} // No border below header (since there is no header)
    />
  );
};

export default LoaderModal;
